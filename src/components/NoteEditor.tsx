import type { Note } from '../types/note'
import { copy } from '../lib/i18n'

type NoteEditorProps = {
  note: Note
  saveStatus: string
  onBack: () => void
  onChange: (patch: Pick<Note, 'title' | 'body'>) => void
  onToggleFavorite: () => void
  onDelete: () => void
}

export function NoteEditor({
  note,
  saveStatus,
  onBack,
  onChange,
  onToggleFavorite,
  onDelete,
}: NoteEditorProps) {
  const isSaving = saveStatus === copy.saving

  const handleDelete = () => {
    if (window.confirm(copy.releaseConfirm)) {
      onDelete()
    }
  }

  return (
    <main className="editor" aria-label="メモ編集">
      <header className="editor__bar">
        <button type="button" className="text-button" onClick={onBack} aria-label={copy.back}>
          ← {copy.back}
        </button>
        <div className="editor__actions">
          <button
            type="button"
            className={note.isFavorite ? 'icon-button icon-button--gold' : 'icon-button'}
            aria-label={copy.favorite}
            aria-pressed={note.isFavorite}
            onClick={onToggleFavorite}
          >
            <span aria-hidden="true">◆</span>
          </button>
          <button type="button" className="danger-button" aria-label={copy.delete} onClick={handleDelete}>
            {copy.delete}
          </button>
        </div>
      </header>

      <section className={isSaving ? 'save-status save-status--saving' : 'save-status'} aria-live="polite">
        <span>{saveStatus}</span>
        <small>{copy.savedEn}</small>
      </section>

      <label className="field-label" htmlFor="note-title">
        題
      </label>
      <input
        id="note-title"
        className="title-input"
        value={note.title}
        placeholder={copy.titlePlaceholder}
        aria-label="メモの題"
        onChange={(event) => onChange({ title: event.target.value, body: note.body })}
      />

      <label className="field-label" htmlFor="note-body">
        言葉
      </label>
      <textarea
        id="note-body"
        className="body-input"
        value={note.body}
        placeholder={copy.bodyPlaceholder}
        aria-label="メモ本文"
        onChange={(event) => onChange({ title: note.title, body: event.target.value })}
      />
    </main>
  )
}
