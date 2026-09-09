import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TaskShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  backTo?: string;
}

export function TaskShell({ children, title, subtitle, trailing, backTo }: TaskShellProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full max-w-[480px] mx-auto bg-surface">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button
          onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
          aria-label="Назад"
          className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className={cn("flex-1 px-2", subtitle && "flex flex-col justify-center")}>
          <p className="title-large text-on-surface line-clamp-1">{title}</p>
          {subtitle && <p className="body-small text-on-surface-variant">{subtitle}</p>}
        </div>
        {trailing && <div className="flex items-center">{trailing}</div>}
      </header>

      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
