import { useState } from 'react'

const API_BASE = '/api'

interface StrategyResponse {
  response?: string
  message?: string
  error?: string
}

export function useStrategyAgent() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (message: string, signature: string): Promise<string | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/strategy/message`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signature,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: StrategyResponse = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Get the response text and clean it up
      let text = data.response || data.message || JSON.stringify(data)
      
      // Parse if it's a JSON string with nested reply field
      if (typeof text === 'string' && text.startsWith('{')) {
        try {
          const parsed = JSON.parse(text)
          text = parsed.reply || parsed.response || parsed.message || text
        } catch {
          // Keep original text
        }
      }
      
      // Convert literal \n to actual newlines
      text = text.replace(/\\n/g, '\n')
      
      return text
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response'
      setError(errorMessage)
      return `Error: ${errorMessage}`
    } finally {
      setIsLoading(false)
    }
  }

  return { sendMessage, isLoading, error }
}
