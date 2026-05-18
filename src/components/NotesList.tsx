import type { Note } from '../types/note'
import { copy } from '../lib/i18n'
import { EmptyState } from './EmptyState'
import { NoteCard } from './NoteCard'
import { SearchBar } from './SearchBar'
import { ZanshinMark } from './ZanshinMark'

type NotesListProps = {
  notes: Note[]
  totalNotes: number
  search: string
  showFavoritesOnly: boolean
  onSearchChange: (value: string) => void
  onToggleFavoritesOnly: () => void
  onCreate: () => void
  onOpen: (id: string) => void
}

export function NotesList({
  notes,
  totalNotes,
  search,
  showFavoritesOnly,
  onSearchChange,
  onToggleFavoritesOnly,
  onCreate,
  onOpen,
}: NotesListProps) {
  const isSearchEmpty = totalNotes > 0 && notes.length === 0

  return (
    <main className="notes-list" aria-label="メモ一覧">
      <header className="hero-panel">
        <ZanshinMark />
        <div className="hero-panel__body">
          <p className="eyebrow">{copy.appSubtitle}</p>
          <h1>{copy.appName}</h1>
          <p>{copy.tagline}</p>
          <small>{copy.taglineEn}</small>
        </div>
      </header>

      <section className="list-tools" aria-label="検索と表示切り替え">
        <SearchBar value={search} onChange={onSearchChange} />
        <button
          type="button"
          className={showFavoritesOnly ? 'filter-pill filter-pill--active' : 'filter-pill'}
          aria-pressed={showFavoritesOnly}
          onClick={onToggleFavoritesOnly}
        >
          {showFavoritesOnly ? copy.favoriteOnly : copy.allNotes}
        </button>
      </section>

      {notes.length === 0 ? (
        <EmptyState isSearch={isSearchEmpty} onCreate={onCreate} />
      ) : (
        <section className="cards" aria-label="保存されたメモ">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onOpen={onOpen} />
          ))}
        </section>
      )}

      <button type="button" className="fab" aria-label={copy.newNote} onClick={onCreate}>
        <span aria-hidden="true">＋</span>
      </button>
    </main>
  )
}
