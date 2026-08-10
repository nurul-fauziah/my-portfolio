'use client'

import React, { useState, useCallback } from 'react'
import { useField } from '@payloadcms/ui'
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
  const titleField = useField<string>({ path: 'title' })
  const descriptionField = useField<string>({ path: 'description' })
  const techField = useField<Array<{ name: string }>>({ path: 'tech' })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleImport = useCallback(async () => {
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

      // Only fill empty fields
      if (!titleField.value && data.name) {
        titleField.setValue(data.name)
      }
      if (!descriptionField.value && data.description) {
        descriptionField.setValue(data.description)
      }
      if ((!techField.value || techField.value.length === 0) && data.topics.length > 0) {
        techField.setValue(data.topics.map((t) => ({ name: t })))
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repo')
    } finally {
      setLoading(false)
    }
  }, [value, titleField, descriptionField, techField])

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
