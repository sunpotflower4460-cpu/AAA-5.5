import { useEffect, useMemo, useRef, useState } from 'react'
import { AppShell } from './components/AppShell'
import { NoteEditor } from './components/NoteEditor'
import { NotesList } from './components/NotesList'
import { copy } from './lib/i18n'
import { loadNotes, saveNotes } from './lib/storage'
import type { Note } from './types/note'

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

const createBlankNote = (): Note => {
  const now = new Date().toISOString()

  return {
    id: createId(),
    title: '',
    body: '',
    createdAt: now,
    updatedAt: now,
    isFavorite: false,
    locale: 'ja',
  }
}

const sortNotes = (notes: Note[]) =>
  [...notes].sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes())
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [saveStatus, setSaveStatus] = useState(copy.saved)
  const hasHydrated = useRef(false)
  const saveStatusTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!hasHydrated.current) {
      hasHydrated.current = true
      return
    }

    const saveTimer = window.setTimeout(() => {
      saveNotes(notes)
      setSaveStatus(copy.saved)
      window.clearTimeout(saveStatusTimer.current)
      saveStatusTimer.current = window.setTimeout(() => setSaveStatus(copy.saved), 1400)
    }, 260)

    return () => window.clearTimeout(saveTimer)
  }, [notes])

  useEffect(() => {
    return () => window.clearTimeout(saveStatusTimer.current)
  }, [])

  const activeNote = notes.find((note) => note.id === activeNoteId) ?? null

  const visibleNotes = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()
    return sortNotes(notes).filter((note) => {
      const matchesFavorite = !showFavoritesOnly || note.isFavorite
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${note.title} ${note.body}`.toLocaleLowerCase().includes(normalizedSearch)

      return matchesFavorite && matchesSearch
    })
  }, [notes, search, showFavoritesOnly])

  const markSaving = () => setSaveStatus(copy.saved)

  const handleCreate = () => {
    const note = createBlankNote()
    setNotes((current) => [note, ...current])
    setActiveNoteId(note.id)
    markSaving()
  }

  const handleUpdate = (patch: Pick<Note, 'title' | 'body'>) => {
    if (!activeNoteId) return

    const now = new Date().toISOString()
    setNotes((current) =>
      current.map((note) => (note.id === activeNoteId ? { ...note, ...patch, updatedAt: now } : note)),
    )
    markSaving()
  }

  const handleToggleFavorite = () => {
    if (!activeNoteId) return

    const now = new Date().toISOString()
    setNotes((current) =>
      current.map((note) =>
        note.id === activeNoteId ? { ...note, isFavorite: !note.isFavorite, updatedAt: now } : note,
      ),
    )
    markSaving()
  }

  const handleDelete = () => {
    if (!activeNoteId) return

    setNotes((current) => current.filter((note) => note.id !== activeNoteId))
    setActiveNoteId(null)
    markSaving()
  }

  return (
    <AppShell>
      {activeNote ? (
        <NoteEditor
          note={activeNote}
          saveStatus={saveStatus}
          onBack={() => setActiveNoteId(null)}
          onChange={handleUpdate}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
        />
      ) : (
        <NotesList
          notes={visibleNotes}
          totalNotes={notes.length}
          search={search}
          showFavoritesOnly={showFavoritesOnly}
          onSearchChange={setSearch}
          onToggleFavoritesOnly={() => setShowFavoritesOnly((value) => !value)}
          onCreate={handleCreate}
          onOpen={setActiveNoteId}
        />
      )}
    </AppShell>
  )
}

export default App
