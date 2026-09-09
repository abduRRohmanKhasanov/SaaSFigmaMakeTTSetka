import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "filled" | "tonal" | "outlined" | "text";
type Size = "default" | "sm" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  filled:
    "bg-primary text-on-primary hover:opacity-90 active:opacity-80",
  tonal:
    "bg-secondary-container text-on-secondary-container hover:opacity-90 active:opacity-80",
  outlined:
    "border border-outline text-primary bg-transparent hover:bg-primary/8 active:bg-primary/12",
  text:
    "text-primary bg-transparent hover:bg-primary/8 active:bg-primary/12",
};

const sizeClasses: Record<Size, string> = {
  default: "h-10 px-6 label-large rounded-full min-w-[64px]",
  sm:      "h-8 px-4 label-medium rounded-full",
  icon:    "h-12 w-12 rounded-full flex items-center justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "filled", size = "default", asChild, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-all duration-150 select-none cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          "disabled:opacity-38 disabled:pointer-events-none",
          "min-h-[48px]",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
