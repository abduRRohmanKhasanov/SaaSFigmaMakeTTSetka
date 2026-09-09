import { useNavigate } from "react-router-dom";
import { tournamentsMock } from "@/mocks/tournaments";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  "Идёт":     "bg-primary-container text-on-primary-container",
  "Завершён": "bg-surface-container-highest text-on-surface-variant",
  "Объявлен": "bg-tertiary-container text-on-tertiary-container",
  "Черновик": "bg-surface-container-high text-on-surface-variant",
};

export function TournamentsPage() {
  const navigate = useNavigate();
  return (
    <div className="pb-4">
      <div className="space-y-3 p-4">
        {tournamentsMock.map((t) => (
          <button
            key={t.id}
            onClick={() => navigate(`/club/tournaments/${t.id}`)}
            className="w-full p-4 rounded-[1.25rem] bg-surface-container-low hover:bg-surface-container-high transition-colors text-left"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="title-medium text-on-surface">{t.name}</p>
                <p className="body-small text-on-surface-variant mt-1">{t.date}</p>
                <p className="label-small text-on-surface-variant mt-1">{t.participantIds.length} участников</p>
              </div>
              <span className={cn("inline-flex items-center px-2 h-6 rounded-xs label-small shrink-0 mt-0.5", STATUS_COLORS[t.status])}>
                {t.status}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
