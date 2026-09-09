import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

interface BottomNavProps {
  items: NavItem[];
  className?: string;
}

export function BottomNav({ items, className }: BottomNavProps) {
  return (
    <nav
      className={cn(
        "sticky bottom-0 z-30 flex w-full bg-surface-container",
        "border-t border-outline-variant",
        "min-h-[80px] pb-safe",
        className,
      )}
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to.split("/").length <= 2}
          className={({ isActive }) =>
            cn(
              "flex-1 flex flex-col items-center justify-center gap-1 pt-3 pb-4 relative",
              "transition-colors min-w-[48px]",
              isActive ? "text-on-secondary-container" : "text-on-surface-variant",
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative flex flex-col items-center">
                <span
                  className={cn(
                    "relative z-10 w-16 h-8 flex items-center justify-center rounded-full transition-all",
                    isActive && "bg-secondary-container",
                  )}
                >
                  {isActive ? item.activeIcon : item.icon}
                </span>
              </div>
              <span className="label-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
