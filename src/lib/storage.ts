import type { Note } from '../types/note'

const STORAGE_KEY = 'zanshin.notes.v1'

const isNote = (value: unknown): value is Note => {
  if (!value || typeof value !== 'object') return false

  const note = value as Record<string, unknown>
  return (
    typeof note.id === 'string' &&
    typeof note.title === 'string' &&
    typeof note.body === 'string' &&
    typeof note.createdAt === 'string' &&
    typeof note.updatedAt === 'string' &&
    typeof note.isFavorite === 'boolean' &&
    (note.locale === undefined || note.locale === 'ja' || note.locale === 'en')
  )
}

export const loadNotes = (): Note[] => {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(isNote)
  } catch {
    return []
  }
}

export const saveNotes = (notes: Note[]): boolean => {
  if (typeof window === 'undefined') return false

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    return true
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Failed to save notes to localStorage', error)
    }
    return false
  }
}
