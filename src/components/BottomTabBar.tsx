import { copy } from '../lib/i18n'

export type AppView = 'notes' | 'search' | 'settings'

type BottomTabBarProps = {
  activeView: AppView
  onChange: (view: AppView) => void
}

const tabs: Array<{ id: AppView; label: string }> = [
  { id: 'notes', label: copy.notesTab },
  { id: 'search', label: copy.searchTab },
  { id: 'settings', label: copy.settingsTab },
]

export function BottomTabBar({ activeView, onChange }: BottomTabBarProps) {
  return (
    <nav className="bottom-tabbar" aria-label="Main">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={activeView === tab.id ? 'tab-button tab-button--active' : 'tab-button'}
          aria-current={activeView === tab.id ? 'page' : undefined}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
