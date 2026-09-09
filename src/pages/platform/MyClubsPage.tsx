import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { platformClubsMock } from "@/mocks/platform";

const PALETTE_COLORS: Record<string, string> = {
  teal:     "bg-[oklch(40%_0.12_188)]",
  blue:     "bg-[oklch(40%_0.18_260)]",
  indigo:   "bg-[oklch(38%_0.20_290)]",
  crimson:  "bg-[oklch(38%_0.18_10)]",
  orange:   "bg-[oklch(50%_0.18_55)]",
  graphite: "bg-[oklch(35%_0.03_240)]",
};

interface MyClubsPageProps { empty?: boolean }

export function MyClubsPage({ empty }: MyClubsPageProps) {
  const navigate = useNavigate();
  const clubs = empty ? [] : platformClubsMock;

  return (
    <div className="min-h-full flex flex-col max-w-[480px] mx-auto bg-surface">
      <header className="flex items-center justify-between h-16 px-4 border-b border-outline-variant bg-surface-container">
        <span className="title-large text-on-surface">Мои клубы</span>
        <button
          onClick={() => navigate("/platform/new")}
          className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8"
        >
          <Plus size={22} />
        </button>
      </header>

      {clubs.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
          <p className="body-large text-on-surface-variant">У вас ещё нет клубов</p>
          <Button variant="filled" onClick={() => navigate("/platform/new")}>
            Создать клуб
          </Button>
        </div>
      ) : (
        <div className="flex-1 p-4 space-y-3">
          {clubs.map((club) => (
            <button
              key={club.id}
              onClick={() => navigate("/club")}
              className="w-full flex items-center gap-4 p-4 rounded-[1.25rem] bg-surface-container-low hover:bg-surface-container-high transition-colors text-left"
            >
              <div className={`w-12 h-12 rounded-full ${PALETTE_COLORS[club.palette] ?? "bg-primary-container"} flex items-center justify-center text-white headline-small shrink-0`}>
                {club.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="title-medium text-on-surface">{club.name}</p>
                <p className="body-small text-on-surface-variant truncate">{club.address}</p>
                <p className="label-small text-on-surface-variant mt-0.5">{club.members} участников</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
