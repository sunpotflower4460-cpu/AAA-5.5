import { useEffect, useMemo, useRef, useState } from 'react'
import { AppShell } from './components/AppShell'
import { BottomTabBar, type AppView } from './components/BottomTabBar'
import { NoteEditor } from './components/NoteEditor'
import { NotesList } from './components/NotesList'
import { SearchView } from './components/SearchView'
import { SettingsView } from './components/SettingsView'
import { formatUpdatedAt } from './lib/date'
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
const undoTimeoutMs = 6000

const getSaveStatusMessage = (
  state: 'saving' | 'saved' | 'error',
  savedAt: string | null,
) => {
  if (state === 'saving') return copy.saving
  if (state === 'error') return copy.saveError
  if (!savedAt) return copy.saved
  return `${copy.saved} ・ ${formatUpdatedAt(savedAt, 'ja')}`
}

function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes())
  const [activeView, setActiveView] = useState<AppView>('notes')
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [searchFilter, setSearchFilter] = useState<'all' | 'favorites' | 'text' | 'images' | 'date' | 'tags'>('all')
  const [saveState, setSaveState] = useState<'saving' | 'saved' | 'error'>('saved')
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)
  const [deletedNote, setDeletedNote] = useState<Note | null>(null)
  const hasHydrated = useRef(false)
  const undoTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!hasHydrated.current) {
      hasHydrated.current = true
      return
    }

    const saveTimer = window.setTimeout(() => {
      const saved = saveNotes(notes)
      if (saved) {
        setSaveState('saved')
        setLastSavedAt(new Date().toISOString())
      } else {
        setSaveState('error')
      }
    }, 260)

    return () => window.clearTimeout(saveTimer)
  }, [notes])

  useEffect(() => {
    return () => window.clearTimeout(undoTimer.current)
  }, [])

  useEffect(() => {
    if (!deletedNote) window.clearTimeout(undoTimer.current)
  }, [deletedNote])

  const activeNote = notes.find((note) => note.id === activeNoteId) ?? null

  const sortedNotes = useMemo(() => sortNotes(notes), [notes])

  const filteredSearchNotes = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()
    return sortedNotes.filter((note) => {
      const matchesFavorite = searchFilter !== 'favorites' || note.isFavorite
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${note.title} ${note.body}`.toLocaleLowerCase().includes(normalizedSearch)

      return matchesFavorite && matchesSearch
    })
  }, [search, searchFilter, sortedNotes])
  const filteredFavoriteNotes = useMemo(
    () => filteredSearchNotes.filter((note) => note.isFavorite),
    [filteredSearchNotes],
  )

  const favoriteNotes = useMemo(() => sortedNotes.filter((note) => note.isFavorite), [sortedNotes])
  const archiveNotes = useMemo(() => sortedNotes.filter((note) => !note.isFavorite), [sortedNotes])

  const markSaving = () => setSaveState('saving')

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

    const target = notes.find((note) => note.id === activeNoteId) ?? null
    if (target) {
      setDeletedNote(target)
      window.clearTimeout(undoTimer.current)
      undoTimer.current = window.setTimeout(() => setDeletedNote(null), undoTimeoutMs)
    }
    setNotes((current) => current.filter((note) => note.id !== activeNoteId))
    setActiveNoteId(null)
    markSaving()
  }

  const handleUndoDelete = () => {
    if (!deletedNote) return
    setNotes((current) => [deletedNote, ...current])
    setDeletedNote(null)
    window.clearTimeout(undoTimer.current)
    markSaving()
  }

  const saveStatus = getSaveStatusMessage(saveState, lastSavedAt)

  return (
    <AppShell>
      {activeNote ? (
        <NoteEditor
          note={activeNote}
          saveStatus={saveStatus}
          saveState={saveState}
          onBack={() => setActiveNoteId(null)}
          onChange={handleUpdate}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
        />
      ) : (
        <>
          {activeView === 'notes' && (
            <NotesList
              favorites={favoriteNotes}
              archive={archiveNotes}
              onCreate={handleCreate}
              onOpen={setActiveNoteId}
              onOpenSearch={() => setActiveView('search')}
            />
          )}
          {activeView === 'search' && (
            <SearchView
              search={search}
              filter={searchFilter}
              notes={filteredSearchNotes}
              favorites={filteredFavoriteNotes}
              onSearchChange={setSearch}
              onFilterChange={setSearchFilter}
              onOpen={setActiveNoteId}
            />
          )}
          {activeView === 'settings' && <SettingsView />}
          <BottomTabBar activeView={activeView} onChange={setActiveView} />
        </>
      )}

      {deletedNote && (
        <aside className="undo-toast" role="status" aria-live="polite">
          <span>{copy.deletedNote}</span>
          <button type="button" className="quiet-button" onClick={handleUndoDelete}>
            {copy.undoDelete}
          </button>
        </aside>
      )}
    </AppShell>
  )
}

export default App
