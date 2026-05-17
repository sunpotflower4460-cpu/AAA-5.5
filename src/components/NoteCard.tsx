import { formatUpdatedAt } from '../lib/date'
import { copy } from '../lib/i18n'
import type { Note } from '../types/note'

type NoteCardProps = {
  note: Note
  onOpen: (id: string) => void
}

const excerpt = (body: string) => {
  const trimmed = body.trim()
  if (!trimmed) return copy.taglineEn
  return trimmed.length > 92 ? `${trimmed.slice(0, 92)}…` : trimmed
}

export function NoteCard({ note, onOpen }: NoteCardProps) {
  const title = note.title.trim() || copy.untitled

  return (
    <article className={note.isFavorite ? 'note-card note-card--favorite' : 'note-card'}>
      <button type="button" onClick={() => onOpen(note.id)} aria-label={`${title}を開く`}>
        <span className="note-card__blade" aria-hidden="true" />
        <span className="note-card__meta">
          {formatUpdatedAt(note.updatedAt, 'ja')}
          {note.isFavorite && <span className="note-card__gold">大切</span>}
        </span>
        <strong>{title}</strong>
        <span className="note-card__excerpt">{excerpt(note.body)}</span>
      </button>
    </article>
  )
}
