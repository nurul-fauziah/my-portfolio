'use client'

import React, { useState } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import { parseGithubUrl } from '@/src/lib/github'

type GithubRepoData = {
  name: string
  description: string | null
  topics: string[]
  homepage: string | null
  language: string | null
}

export const GithubImporter: React.FC = () => {
  const { value, setValue } = useField<string>({ path: 'githubUrl' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // FormFieldsContext is [FormState, Dispatch<FieldAction>]
  const [fields, dispatchFields] = useFormFields(([f, dispatch]) => [f, dispatch] as const)

  const handleImport = async () => {
    if (!value) return

    const parsed = parseGithubUrl(value)
    if (!parsed) {
      setError('Invalid GitHub URL')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch(`/api/github-proxy?repo=${encodeURIComponent(value)}`)
      if (!res.ok) {
        throw new Error('Repo not found')
      }

      const data: GithubRepoData = await res.json()

      // Get current field values
      const currentTitle = fields?.title?.value as string | undefined
      const currentDescription = fields?.description?.value as string | undefined
      const currentTech = fields?.tech?.value as Array<{ name: string }> | undefined

      // Dispatch updates for empty fields only
      if (!currentTitle && data.name) {
        dispatchFields({ type: 'UPDATE', path: 'title', value: data.name })
      }
      if (!currentDescription && data.description) {
        dispatchFields({ type: 'UPDATE', path: 'description', value: data.description })
      }
      if (!currentTech?.length && data.topics.length) {
        dispatchFields({
          type: 'UPDATE',
          path: 'tech',
          value: data.topics.map((t) => ({ name: t })),
        })
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', color: '#666' }}>
            GitHub Repository URL
          </label>
          <input
            type="text"
            value={(value as string) || ''}
            onChange={(e) => {
              setValue(e.target.value)
              setError(null)
              setSuccess(false)
            }}
            placeholder="https://github.com/owner/repo"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleImport}
          disabled={loading || !value}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#999' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? 'Importing...' : 'Import from GitHub'}
        </button>
      </div>
      {error && <p style={{ color: 'red', fontSize: '12px', margin: 0 }}>{error}</p>}
      {success && (
        <p style={{ color: 'green', fontSize: '12px', margin: 0 }}>
          ✓ Imported! Title, description, and tech stack filled automatically.
        </p>
      )}
      <p style={{ fontSize: '11px', color: '#999', margin: 0 }}>
        Paste a GitHub repo URL and click Import to auto-fill title, description, and tech stack.
        Fields that already have values will not be overwritten.
      </p>
    </div>
  )
}
