import { useState, useEffect } from 'react'

export function useRateLimit() {
  const [rateLimit, setRateLimit] = useState(null)

  useEffect(() => {
    async function fetchLimit() {
      try {
        const res = await fetch('https://api.github.com/rate_limit')
        const data = await res.json()
        setRateLimit(data.rate)
      } catch {
        // silently fail — non-critical UI
      }
    }
    fetchLimit()
    // refresh every 60 seconds
    const interval = setInterval(fetchLimit, 60000)
    return () => clearInterval(interval)
  }, [])

  return rateLimit
}