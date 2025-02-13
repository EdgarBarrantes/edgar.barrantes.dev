import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { Base, BaseProps } from "./base"

export interface ContainerProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      full: 'max-w-none'
    }

    return (
      <Base
        ref={ref}
        className={twMerge(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          sizeStyles[size],
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = "Container" 