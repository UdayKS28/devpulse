import { useState, useCallback } from 'react'

const STORAGE_KEY = 'devpulse_saved_profiles'

function getSaved() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

export function useSavedProfiles() {
  const [saved, setSaved] = useState(getSaved)

  const toggleSave = useCallback((username) => {
    setSaved(prev => {
      const updated = prev.includes(username)
        ? prev.filter(u => u !== username)
        : [username, ...prev]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const isSaved = useCallback((username) => {
    return saved.includes(username)
  }, [saved])

  return { saved, toggleSave, isSaved }
}