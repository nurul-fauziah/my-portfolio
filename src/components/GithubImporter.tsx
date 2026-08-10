'use client'

import React, { useState, useCallback } from 'react'
import { useField, useForm } from '@payloadcms/ui'
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
  const tagField = useField<string>({ path: 'tag' })
  const techField = useField<Array<{ name: string }>>({ path: 'tech' })
  const { dispatchFields } = useForm()

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

      // Fill title if empty
      if (!titleField.value && data.name) {
        titleField.setValue(data.name)
      }

      // Fill description if empty
      if (!descriptionField.value && data.description) {
        descriptionField.setValue(data.description)
      }

      // Fill tag if empty - derive from language or topics
      if (!tagField.value) {
        const tag = data.language || (data.topics.length > 0 ? data.topics[0] : 'Project')
        tagField.setValue(tag)
      }

      // Fill tech array if empty - use dispatch for array field
      if (!techField.value || techField.value.length === 0) {
        const techItems = data.topics.length > 0
          ? data.topics
          : data.language
            ? [data.language]
            : []

        if (techItems.length > 0) {
          // Remove existing rows first
          const currentRows = techField.value || []
          for (let i = currentRows.length - 1; i >= 0; i--) {
            dispatchFields({ type: 'REMOVE_ROW', path: 'tech', rowIndex: i })
          }
          // Add new rows
          techItems.forEach((tech) => {
            dispatchFields({
              type: 'ADD_ROW',
              path: 'tech',
              subFieldState: {
                name: {
                  value: tech,
                  isValid: true,
                  showError: false,
                  errorMessage: '',
                },
              },
            })
          })
        }
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repo')
    } finally {
      setLoading(false)
    }
  }, [value, titleField, descriptionField, tagField, techField, dispatchFields])

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
          ✓ Imported! Title, description, tag, and tech stack filled automatically.
        </p>
      )}
      <p style={{ fontSize: '11px', color: '#999', margin: 0 }}>
        Paste a GitHub repo URL and click Import to auto-fill all fields from the repo.
        Fields that already have values will not be overwritten.
      </p>
    </div>
  )
}
