import { forwardRef, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

export interface BaseProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Base = forwardRef<HTMLElement, BaseProps>(
  ({ as: Component = 'div', className, disabled, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={twMerge('', className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Base.displayName = 'Base'

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p'

export interface TextProps extends BaseProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'subtle'
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as, variant, className, ...props }, ref) => {
    const Component = (as || {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      p: 'p',
      small: 'p',
      subtle: 'p',
    }[variant || 'p']) as ElementType

    const styles = {
      h1: 'font-display text-4xl font-semibold tracking-tight',
      h2: 'font-display text-3xl font-semibold tracking-tight',
      h3: 'font-display text-2xl font-semibold tracking-tight',
      h4: 'font-display text-xl font-semibold tracking-tight',
      p: 'text-base leading-relaxed',
      small: 'text-sm leading-relaxed',
      subtle: 'text-sm text-muted-foreground leading-relaxed',
    }[variant || 'p']

    return (
      <Base
        ref={ref}
        as={Component}
        className={twMerge(styles, className)}
        {...props}
      />
    )
  }
)
Text.displayName = 'Text' 