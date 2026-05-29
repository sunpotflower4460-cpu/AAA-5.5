import type { Note } from '../types/note'
import { copy } from '../lib/i18n'
import { EmptyState } from './EmptyState'
import { NoteCard } from './NoteCard'
import { ZanshinMark } from './ZanshinMark'

type NotesListProps = {
  favorites: Note[]
  archive: Note[]
  onCreate: () => void
  onOpen: (id: string) => void
  onOpenSearch: () => void
}

export function NotesList({
  favorites,
  archive,
  onCreate,
  onOpen,
  onOpenSearch,
}: NotesListProps) {
  const hasNotes = favorites.length > 0 || archive.length > 0

  return (
    <main className="notes-list" aria-label="メモ一覧">
      <header className="notes-header">
        <span className="notes-header__menu" aria-hidden="true">
          ☰
        </span>
        <div>
          <p className="eyebrow">{copy.appSectionTitle}</p>
        </div>
        <div className="notes-header__actions">
          <button type="button" className="icon-button" aria-label={copy.searchTitle} onClick={onOpenSearch}>
            ⌕
          </button>
          <button type="button" className="icon-button icon-button--gold" aria-label={copy.newNote} onClick={onCreate}>
            +
          </button>
        </div>
      </header>

      <section className="today-card">
        <ZanshinMark />
        <p className="eyebrow">{copy.todayReflection}</p>
        <h1>{copy.appName}</h1>
        <p>{copy.tagline}</p>
        <small>{copy.todayReflectionEn}</small>
      </section>

      {!hasNotes ? (
        <EmptyState onCreate={onCreate} />
      ) : (
        <>
          <section className="notes-section" aria-label={copy.favorites}>
            <h2>{copy.favorites}</h2>
            {favorites.length === 0 ? (
              <p className="notes-section__empty">{copy.emptyFavorites}</p>
            ) : (
              <div className="cards">
                {favorites.map((note) => (
                  <NoteCard key={note.id} note={note} onOpen={onOpen} />
                ))}
              </div>
            )}
          </section>

          <section className="notes-section" aria-label={copy.allNotes}>
            <h2>{copy.allNotes}</h2>
            <div className="cards">
              {archive.map((note) => (
                <NoteCard key={note.id} note={note} onOpen={onOpen} />
              ))}
            </div>
          </section>
        </>
      )}

      <button type="button" className="fab" aria-label={copy.newNote} onClick={onCreate}>
        <span aria-hidden="true">＋</span>
      </button>
    </main>
  )
}
