import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { tournamentsMock } from "@/mocks/tournaments";
import { playersMock } from "@/mocks/players";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  "Идёт":     "bg-primary-container text-on-primary-container",
  "Завершён": "bg-surface-container-highest text-on-surface-variant",
  "Объявлен": "bg-tertiary-container text-on-tertiary-container",
  "Черновик": "bg-surface-container-high text-on-surface-variant",
};

export function AdminTournamentCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = tournamentsMock.find((t) => t.id === Number(id));
  if (!t) return null;

  const participants = t.participantIds.map((pid) => playersMock.find((p) => p.id === pid)!).filter(Boolean);

  return (
    <div className="flex flex-col min-h-full bg-surface max-w-[480px] mx-auto">
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2 flex-1 truncate">{t.name}</span>
        <span className={cn("inline-flex items-center px-2 h-6 rounded-xs label-small mr-2", STATUS_COLORS[t.status])}>
          {t.status}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-6">
        {/* Actions */}
        <div className="flex gap-3">
          {t.status === "Объявлен" && (
            <Button variant="filled" className="flex-1" onClick={() => navigate(`/admin/tournaments/${t.id}/console`)}>
              Запустить
            </Button>
          )}
          {t.status === "Идёт" && (
            <Button variant="filled" className="flex-1" onClick={() => navigate(`/admin/tournaments/${t.id}/console`)}>
              Открыть пульт
            </Button>
          )}
          <Button variant="tonal" className="flex-1" onClick={() => {}}>
            Редактировать
          </Button>
        </div>

        {/* Participants */}
        <div>
          <p className="label-large text-on-surface-variant mb-2 uppercase tracking-widest">Состав</p>
          <div className="rounded-[1.25rem] bg-surface-container-low overflow-hidden">
            {participants.map((p, i) => (
              <div key={p.id}>
                <div className="flex items-center gap-3 px-4 py-3 min-h-[56px]">
                  <Avatar name={p.name} size="sm" />
                  <span className="body-large text-on-surface flex-1">{p.name}</span>
                  <span className="label-large text-on-surface">{p.rating}</span>
                </div>
                {i < participants.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Matches */}
        {t.matches.length > 0 && (
          <div>
            <p className="label-large text-on-surface-variant mb-2 uppercase tracking-widest">Встречи</p>
            <div className="rounded-[1.25rem] bg-surface-container-low overflow-hidden">
              {t.matches.map((m, i) => {
                const p1sets = m.sets.filter(([a, b]) => a > b).length;
                const p2sets = m.sets.filter(([a, b]) => b > a).length;
                const setsStr = m.sets.map(([a, b]) => `${a}:${b}`).join(", ");
                return (
                  <div key={m.id}>
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={cn("body-medium flex-1 truncate", m.winnerId === m.player1Id ? "text-primary font-medium" : "text-on-surface")}>
                          {m.player1Name}
                        </span>
                        <span className="title-medium text-on-surface">{p1sets}:{p2sets}</span>
                        <span className={cn("body-medium flex-1 truncate text-right", m.winnerId === m.player2Id ? "text-primary font-medium" : "text-on-surface")}>
                          {m.player2Name}
                        </span>
                      </div>
                      <p className="label-small text-on-surface-variant mt-0.5">{setsStr}</p>
                    </div>
                    {i < t.matches.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
