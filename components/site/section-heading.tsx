import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <p className={cn('eyebrow mb-3', dark ? 'text-cyan' : 'text-navy-soft')}>{eyebrow}</p>
      <h2
        className={cn(
          'text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]',
          dark ? 'text-white' : 'text-navy',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-4 text-pretty text-base leading-relaxed sm:text-lg', dark ? 'text-white/80' : 'text-muted-foreground')}>
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
