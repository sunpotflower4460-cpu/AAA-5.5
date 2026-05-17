import { copy } from '../lib/i18n'
import { ZanshinMark } from './ZanshinMark'

type EmptyStateProps = {
  isSearch?: boolean
  onCreate: () => void
}

export function EmptyState({ isSearch = false, onCreate }: EmptyStateProps) {
  return (
    <section className="empty-state" aria-live="polite">
      <ZanshinMark quiet />
      <h2>{isSearch ? copy.noResults : copy.emptyTitle}</h2>
      <p>{isSearch ? copy.noResultsEn : copy.emptySubtitle}</p>
      {!isSearch && (
        <button type="button" className="quiet-button" onClick={onCreate}>
          {copy.openNewNote}
        </button>
      )}
    </section>
  )
}
