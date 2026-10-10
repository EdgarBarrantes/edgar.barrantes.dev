import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { Base, BaseProps } from "./base"

export interface CardProps extends BaseProps {
  hover?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, ...props }, ref) => {
    return (
      <Base
        ref={ref}
        className={twMerge(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          hover && "transition-shadow duration-200 hover:shadow-md",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export interface CardHeaderProps extends BaseProps {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <Base
        ref={ref}
        className={twMerge("flex flex-col space-y-1.5 p-6", className)}
        {...props}
      />
    )
  }
)
CardHeader.displayName = "CardHeader"

export interface CardTitleProps extends BaseProps {}

export const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <Base
        ref={ref}
        as="h3"
        className={twMerge(
          "font-display text-2xl font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      />
    )
  }
)
CardTitle.displayName = "CardTitle"

export interface CardDescriptionProps extends BaseProps {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <Base
        ref={ref}
        className={twMerge("text-sm text-muted-foreground", className)}
        {...props}
      />
    )
  }
)
CardDescription.displayName = "CardDescription"

export interface CardContentProps extends BaseProps {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <Base
        ref={ref}
        className={twMerge("p-6 pt-0", className)}
        {...props}
      />
    )
  }
)
CardContent.displayName = "CardContent"

export interface CardFooterProps extends BaseProps {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <Base
        ref={ref}
        className={twMerge("flex items-center p-6 pt-0", className)}
        {...props}
      />
    )
  }
)
CardFooter.displayName = "CardFooter" 