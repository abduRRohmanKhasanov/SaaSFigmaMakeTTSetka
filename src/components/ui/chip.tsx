import { cn } from "@/lib/utils";

type ChipVariant = "assist" | "filter";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  selected?: boolean;
  icon?: React.ReactNode;
}

export function Chip({ variant = "assist", selected, icon, children, className, ...props }: ChipProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 h-8 px-4 rounded-full border label-large transition-all",
        "min-w-[48px] min-h-[48px] items-center justify-center",
        !selected && "border-outline-variant text-on-surface-variant bg-transparent hover:bg-on-surface/8",
        selected && variant === "filter" && "border-transparent bg-secondary-container text-on-secondary-container",
        selected && variant === "assist" && "border-transparent bg-primary-container text-on-primary-container",
        className,
      )}
      {...props}
    >
      {icon && <span className="w-[18px] h-[18px] flex items-center justify-center">{icon}</span>}
      <span className="label-large">{children}</span>
    </button>
  );
}
