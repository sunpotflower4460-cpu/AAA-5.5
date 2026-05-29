import { copy } from '../lib/i18n'

const rows = [
  'Appearance',
  'Font',
  'Text Size',
  'Japanese Typography',
  'Save & Backup',
  'Passcode Lock',
  'Help Center',
  'Contact',
  'About',
]

export function SettingsView() {
  return (
    <main className="settings-view" aria-label={copy.settingsTitle}>
      <header className="settings-view__header">
        <h1>{copy.settingsTitle}</h1>
        <p>{copy.settingsSubtitle}</p>
      </header>

      <section className="pro-card" aria-label={copy.proTitle}>
        <h2>{copy.proTitle}</h2>
        <p>{copy.proDescription}</p>
      </section>

      <section className="settings-list" aria-label="Settings items">
        {rows.map((row) => (
          <button key={row} type="button" className="settings-row">
            <span>{row}</span>
            <span aria-hidden="true">›</span>
          </button>
        ))}
      </section>
    </main>
  )
}
