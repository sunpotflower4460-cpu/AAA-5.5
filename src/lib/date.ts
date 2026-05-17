type Locale = 'ja' | 'en'

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const formatUpdatedAt = (updatedAt: string, locale: Locale = 'ja'): string => {
  const date = new Date(updatedAt)
  if (Number.isNaN(date.getTime())) return locale === 'ja' ? '日付なし' : 'No date'

  const today = startOfDay(new Date())
  const target = startOfDay(date)
  const diffDays = Math.round((today.getTime() - target.getTime()) / 86_400_000)

  if (diffDays === 0) return locale === 'ja' ? '今日' : 'Today'
  if (diffDays === 1) return locale === 'ja' ? '昨日' : 'Yesterday'

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return locale === 'ja' ? `${year}/${month}/${day}` : `${month}/${day}/${year}`
}
