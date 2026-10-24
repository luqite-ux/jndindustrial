import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const variants = {
  cta: 'bg-cta text-cta-foreground hover:bg-cta-hover font-semibold shadow-sm',
  primary: 'bg-navy-soft text-white hover:bg-navy font-semibold',
  outline: 'border border-navy-soft bg-transparent text-navy-soft hover:bg-navy-soft hover:text-white font-semibold',
  'outline-light':
    'border border-white/60 bg-transparent text-white hover:bg-white hover:text-navy font-semibold',
} as const

interface ActionLinkProps {
  href: string
  children: React.ReactNode
  variant?: keyof typeof variants
  className?: string
  arrow?: boolean
}

export function ActionLink({ href, children, variant = 'cta', className, arrow = true }: ActionLinkProps) {
  return (
    <Button
      asChild
      size="lg"
      className={cn(
        'h-11 rounded-sm px-5 text-sm duration-200 active:translate-y-px',
        variants[variant],
        className,
      )}
    >
      <Link href={href}>
        {children}
        {arrow ? <ArrowRight aria-hidden="true" /> : null}
      </Link>
    </Button>
  )
}
