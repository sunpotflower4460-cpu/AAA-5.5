import { copy } from '../lib/i18n'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span className="sr-only">{copy.searchPlaceholder}</span>
      <input
        type="search"
        value={value}
        placeholder={copy.searchPlaceholder}
        aria-label={copy.searchPlaceholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
