type ZanshinMarkProps = {
  quiet?: boolean
}

export function ZanshinMark({ quiet = false }: ZanshinMarkProps) {
  return (
    <div className={quiet ? 'zanshin-mark zanshin-mark--quiet' : 'zanshin-mark'} aria-hidden="true">
      <span />
    </div>
  )
}
