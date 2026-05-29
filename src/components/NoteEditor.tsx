import { formatUpdatedAt } from '../lib/date'
import type { Note } from '../types/note'
import { copy } from '../lib/i18n'

type NoteEditorProps = {
  note: Note
  saveStatus: string
  saveState: 'saving' | 'saved' | 'error'
  onBack: () => void
  onChange: (patch: Pick<Note, 'title' | 'body'>) => void
  onToggleFavorite: () => void
  onDelete: () => void
}

export function NoteEditor({
  note,
  saveStatus,
  saveState,
  onBack,
  onChange,
  onToggleFavorite,
  onDelete,
}: NoteEditorProps) {
  const isSaving = saveState === 'saving'
  const isError = saveState === 'error'
  const characterCount = note.title.trim().length + note.body.trim().length

  const handleDelete = () => {
    if (window.confirm(copy.releaseConfirm)) {
      onDelete()
    }
  }

  return (
    <main className="editor" aria-label="メモ編集">
      <header className="editor__bar">
        <button type="button" className="text-button" onClick={onBack} aria-label={copy.back}>
          ← {copy.done}
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
          <button type="button" className="icon-button" aria-label="history">
            ↺
          </button>
          <button type="button" className="icon-button" aria-label="menu">
            …
          </button>
          <button type="button" className="danger-button" aria-label={copy.delete} onClick={handleDelete}>
            {copy.delete}
          </button>
        </div>
      </header>

      <section
        className={isSaving ? 'save-status save-status--saving' : isError ? 'save-status save-status--error' : 'save-status'}
        aria-live="polite"
      >
        <span>{saveStatus}</span>
        <small>{copy.savedEn}</small>
      </section>

      <section className="editor__meta">
        <span>{formatUpdatedAt(note.updatedAt, 'ja')}</span>
        <span>{characterCount} chars</span>
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

      <footer className="editor-toolbar" aria-label="Editor tools">
        <button type="button" className="icon-button" aria-label="text style">
          Aa
        </button>
        <button type="button" className="icon-button" aria-label="list">
          ≣
        </button>
        <button type="button" className="icon-button" aria-label="image">
          ◇
        </button>
        <button type="button" className="icon-button" aria-label="pen">
          ✎
        </button>
      </footer>
    </main>
  )
}
