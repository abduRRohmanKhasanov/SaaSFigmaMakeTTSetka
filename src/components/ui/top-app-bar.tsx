import { cn } from "@/lib/utils";

interface TopAppBarProps {
  variant?: "small" | "center";
  title?: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
}

export function TopAppBar({ variant = "small", title, subtitle, leading, trailing, className }: TopAppBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center w-full bg-surface-container px-2",
        variant === "center" ? "flex-col pt-2 pb-3 gap-0" : "h-16 gap-1",
        className,
      )}
    >
      {variant === "small" ? (
        <>
          {leading && <div className="flex items-center">{leading}</div>}
          <div className="flex-1 px-2">
            <span className="title-large text-on-surface line-clamp-1">{title}</span>
          </div>
          {trailing && <div className="flex items-center">{trailing}</div>}
        </>
      ) : (
        <>
          <div className="flex items-center w-full h-12 px-2">
            {leading && <div className="flex items-center">{leading}</div>}
            <div className="flex-1" />
            {trailing && <div className="flex items-center">{trailing}</div>}
          </div>
          <div className="text-center px-4 w-full">
            <p className="headline-small text-on-surface">{title}</p>
            {subtitle && <p className="body-small text-on-surface-variant mt-0.5">{subtitle}</p>}
          </div>
        </>
      )}
    </header>
  );
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  label: string;
}

export function IconButton({ children, label, className, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={cn(
        "w-12 h-12 flex items-center justify-center rounded-full",
        "text-on-surface-variant hover:bg-on-surface/8 active:bg-on-surface/12 transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
