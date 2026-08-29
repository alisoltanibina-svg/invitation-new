import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-body font-medium select-none transition-[transform,background-color,color,border-color,opacity] duration-[var(--motion-quick)] ease-[var(--ease-out)] active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        gold:
          "bg-gold text-ink hover:bg-gold-bright ring-offset-ivory",
        outline:
          "border-2 border-gold bg-transparent text-ink hover:bg-gold/15 ring-offset-ivory",
        paper:
          "border-2 border-gold bg-ivory text-ink hover:bg-gold/15 ring-offset-ivory",
        ink: "bg-gold text-ink hover:bg-gold-bright ring-offset-ivory",
        ghost: "bg-transparent text-gold hover:bg-gold/10 ring-offset-wine",
      },
      size: {
        sm: "h-10 rounded-[var(--radius-sm)] px-4 text-sm",
        md: "h-12 rounded-[var(--radius-md)] px-5 text-sm",
        lg: "h-14 rounded-[var(--radius-lg)] px-6 text-base",
        icon: "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "gold",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
