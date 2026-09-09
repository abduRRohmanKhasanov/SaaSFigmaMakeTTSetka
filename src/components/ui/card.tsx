import { cn } from "@/lib/utils";

type CardVariant = "elevated" | "filled" | "outlined";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({ variant = "elevated", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] overflow-hidden",
        variant === "elevated" && "bg-surface-container-low elevation-1",
        variant === "filled" && "bg-surface-container-highest",
        variant === "outlined" && "bg-surface border border-outline-variant",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4", className)} {...props} />;
}
