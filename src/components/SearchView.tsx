import type { Note } from '../types/note'
import { copy } from '../lib/i18n'
import { NoteCard } from './NoteCard'
import { SearchBar } from './SearchBar'

type SearchFilter = 'all' | 'favorites' | 'text' | 'images' | 'date' | 'tags'

type SearchViewProps = {
  search: string
  filter: SearchFilter
  notes: Note[]
  favorites: Note[]
  onSearchChange: (value: string) => void
  onFilterChange: (filter: SearchFilter) => void
  onOpen: (id: string) => void
}

const filters: Array<{ id: SearchFilter; label: string }> = [
  { id: 'all', label: copy.filterAll },
  { id: 'favorites', label: copy.filterFavorites },
  { id: 'text', label: copy.filterText },
  { id: 'images', label: copy.filterImages },
  { id: 'date', label: copy.filterDate },
  { id: 'tags', label: copy.filterTags },
]

export function SearchView({
  search,
  filter,
  notes,
  favorites,
  onSearchChange,
  onFilterChange,
  onOpen,
}: SearchViewProps) {
  return (
    <main className="search-view" aria-label={copy.searchTitle}>
      <header className="search-view__header">
        <h1>{copy.searchTitle}</h1>
        <p>{copy.searchSubtitle}</p>
      </header>

      <SearchBar value={search} onChange={onSearchChange} />

      <div className="filter-chips" role="group" aria-label="Search filters">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={filter === item.id}
            className={filter === item.id ? 'chip chip--active' : 'chip'}
            onClick={() => onFilterChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <section className="search-section" aria-label={copy.favorites}>
        <h2>{copy.favorites}</h2>
        {favorites.length === 0 ? (
          <p className="search-view__empty">{copy.emptyFavorites}</p>
        ) : (
          <div className="cards">
            {favorites.map((note) => (
              <NoteCard key={note.id} note={note} onOpen={onOpen} />
            ))}
          </div>
        )}
      </section>

      <section className="search-section" aria-label={copy.archive}>
        <h2>{copy.archive}</h2>
        {notes.length === 0 ? (
          <p className="search-view__empty">{copy.noResults}</p>
        ) : (
          <div className="cards">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onOpen={onOpen} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
