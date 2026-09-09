import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { tournamentsMock } from "@/mocks/tournaments";
import { playersMock } from "@/mocks/players";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  "Идёт":     "bg-primary-container text-on-primary-container",
  "Завершён": "bg-surface-container-highest text-on-surface-variant",
  "Объявлен": "bg-tertiary-container text-on-tertiary-container",
};

export function TournamentCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = tournamentsMock.find((t) => t.id === Number(id));
  if (!t) return null;

  const champion = t.championId ? playersMock.find((p) => p.id === t.championId) : null;
  const participants = t.participantIds.map((pid) => playersMock.find((p) => p.id === pid)!).filter(Boolean);

  const FORMAT_LABELS: Record<string, string> = {
    "round-robin": "Круговая система",
    "olympic": "Олимпийская система",
    "group+playoff": "Групповой этап + плей-офф",
  };

  return (
    <div className="flex flex-col min-h-full bg-surface max-w-[480px] mx-auto">
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2 truncate">{t.name}</span>
      </header>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Info */}
        <div className="mx-4 mt-4 p-4 rounded-[1.25rem] bg-surface-container-low space-y-2">
          <div className="flex items-center justify-between">
            <span className="body-medium text-on-surface-variant">{t.date}</span>
            <span className={cn("inline-flex items-center px-2 h-6 rounded-xs label-small", STATUS_COLORS[t.status] ?? "bg-surface-container text-on-surface-variant")}>
              {t.status}
            </span>
          </div>
          <p className="body-medium text-on-surface-variant">{FORMAT_LABELS[t.format]}</p>
        </div>

        {/* Champion */}
        {champion && (
          <div className="mx-4 mt-3 p-4 rounded-[1.25rem] bg-primary-container flex items-center gap-3">
            <Avatar name={champion.name} />
            <div>
              <p className="label-small text-on-primary-container/70">Чемпион</p>
              <p className="title-medium text-on-primary-container">{champion.name}</p>
            </div>
          </div>
        )}

        {/* Participants */}
        <div className="mx-4 mt-3">
          <p className="label-large text-on-surface-variant mb-2 uppercase tracking-widest px-1">Участники</p>
          <div className="rounded-[1.25rem] bg-surface-container-low overflow-hidden">
            {participants.map((p, i) => (
              <div key={p.id}>
                <button
                  onClick={() => navigate(`/club/player/${p.id}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 min-h-[56px] hover:bg-on-surface/4 text-left"
                >
                  <Avatar name={p.name} size="sm" />
                  <span className="body-large text-on-surface flex-1">{p.name}</span>
                  <span className="label-large text-on-surface">{p.rating}</span>
                </button>
                {i < participants.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Matches */}
        {t.matches.length > 0 && (
          <div className="mx-4 mt-3">
            <p className="label-large text-on-surface-variant mb-2 uppercase tracking-widest px-1">Результаты встреч</p>
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
                      <p className="label-small text-on-surface-variant mt-1">{setsStr}</p>
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
