import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Trophy, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { clubMock } from "@/mocks/club";

const navItems = [
  { to: "/admin",              label: "Дашборд",  icon: <LayoutDashboard size={22} />, activeIcon: <LayoutDashboard size={22} fill="currentColor" /> },
  { to: "/admin/players",      label: "Состав",   icon: <Users size={22} />,           activeIcon: <Users size={22} fill="currentColor" /> },
  { to: "/admin/tournaments",  label: "Турниры",  icon: <Trophy size={22} />,          activeIcon: <Trophy size={22} fill="currentColor" /> },
  { to: "/admin/settings",     label: "Настройки",icon: <Settings size={22} />,        activeIcon: <Settings size={22} fill="currentColor" /> },
];

export function AdminShell() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full max-w-[480px] mx-auto">
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button
          onClick={() => navigate("/club")}
          className="flex-1 flex items-center gap-2 px-2 text-left hover:opacity-80 transition-opacity min-h-[48px]"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary title-small shrink-0">
            {clubMock.name[0]}
          </div>
          <div>
            <p className="title-medium text-on-surface">{clubMock.name}</p>
            <p className="label-small text-on-surface-variant">Кабинет администратора</p>
          </div>
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
            end={item.to === "/admin"}
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
