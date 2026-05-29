import { copy } from '../lib/i18n'

const rows = [
  copy.settingAppearance,
  copy.settingFont,
  copy.settingTextSize,
  copy.settingTypography,
  copy.settingBackup,
  copy.settingPasscode,
  copy.settingHelp,
  copy.settingContact,
  copy.settingAbout,
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
          <div key={row} className="settings-row" aria-disabled="true">
            <span>{row}</span>
            <span aria-hidden="true">›</span>
          </div>
        ))}
      </section>
    </main>
  )
}
