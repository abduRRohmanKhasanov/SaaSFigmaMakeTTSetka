import { cn } from "@/lib/utils";

interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "surface";
  extended?: boolean;
  icon: React.ReactNode;
  label?: string;
}

export function Fab({ variant = "primary", extended, icon, label, className, ...props }: FabProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-3 elevation-3 transition-all",
        extended ? "h-14 px-4 rounded-[1rem] label-large" : "w-14 h-14 rounded-[1rem]",
        variant === "primary" && "bg-primary-container text-on-primary-container hover:opacity-90",
        variant === "surface" && "bg-surface-container-high text-primary hover:opacity-90",
        className,
      )}
      {...props}
    >
      {icon}
      {extended && label && <span>{label}</span>}
    </button>
  );
}
