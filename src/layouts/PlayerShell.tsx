import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Rss, BarChart2, User, BookOpen, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { clubMock } from "@/mocks/club";

const navItems = [
  { to: "/club", label: "Лента",   icon: <Rss size={22} />,       activeIcon: <Rss size={22} fill="currentColor" /> },
  { to: "/club/rating",  label: "Рейтинг",  icon: <BarChart2 size={22} />,  activeIcon: <BarChart2 size={22} fill="currentColor" /> },
  { to: "/club/profile", label: "Профиль",  icon: <User size={22} />,       activeIcon: <User size={22} fill="currentColor" /> },
  { to: "/club/rules",   label: "Правила",  icon: <BookOpen size={22} />,   activeIcon: <BookOpen size={22} fill="currentColor" /> },
];

export function PlayerShell() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full max-w-[480px] mx-auto">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <div className="flex items-center gap-3 flex-1 px-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary title-small shrink-0">
            {clubMock.name[0]}
          </div>
          <span className="title-large text-primary truncate">{clubMock.name}</span>
        </div>
        <button
          onClick={() => navigate("/admin")}
          aria-label="Войти в кабинет"
          className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8 transition-colors"
        >
          <LogIn size={22} />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-surface">
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <nav className="sticky bottom-0 z-30 flex w-full bg-surface-container border-t border-outline-variant min-h-[80px]">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/club"}
            className={({ isActive }) =>
              cn(
                "flex-1 flex flex-col items-center justify-center gap-1 pt-3 pb-4 transition-colors",
                isActive ? "text-on-secondary-container" : "text-on-surface-variant",
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className={cn("w-16 h-8 flex items-center justify-center rounded-full transition-all", isActive && "bg-secondary-container")}>
                  {isActive ? item.activeIcon : item.icon}
                </span>
                <span className="label-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
