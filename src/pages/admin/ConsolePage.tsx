import { useParams, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { TaskShell } from "@/layouts/TaskShell";
import { Button } from "@/components/ui/button";
import { tournamentsMock } from "@/mocks/tournaments";
import { playersMock } from "@/mocks/players";

const TABLE_MATCHES = [
  { tableNum: 1, matchId: 1 },
  { tableNum: 2, matchId: 3 },
];

const QUEUE_MATCHES = [2, 4];

export function ConsolePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = tournamentsMock.find((t) => t.id === Number(id));
  if (!t) return null;

  return (
    <TaskShell
      title={t.name}
      trailing={
        <button
          onClick={() => navigate(`/admin/tournaments/${id}`)}
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-on-surface/8 text-on-surface-variant"
          aria-label="Состав"
        >
          <Users size={22} />
        </button>
      }
    >
      <div className="p-4 space-y-3 pb-6">
        <p className="label-large text-on-surface-variant uppercase tracking-widest">Активные столы</p>

        {TABLE_MATCHES.map(({ tableNum, matchId }) => {
          const match = t.matches.find((m) => m.id === matchId);
          if (!match) return null;
          const p1sets = match.sets.filter(([a, b]) => a > b).length;
          const p2sets = match.sets.filter(([a, b]) => b > a).length;
          return (
            <div key={tableNum} className="p-4 rounded-[1.25rem] bg-surface-container-low space-y-3">
              <div className="flex items-center justify-between">
                <p className="title-medium text-on-surface">Стол {tableNum}</p>
                <span className="label-small text-on-surface-variant bg-primary-container text-on-primary-container px-2 h-6 rounded-xs inline-flex items-center">Идёт</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="body-large text-on-surface flex-1 truncate">{match.player1Name}</span>
                <span className="headline-small text-on-surface">{p1sets}:{p2sets}</span>
                <span className="body-large text-on-surface flex-1 truncate text-right">{match.player2Name}</span>
              </div>
              <Button
                variant="tonal"
                size="sm"
                className="w-full"
                onClick={() => navigate("/referee")}
              >
                Открыть судейский экран
              </Button>
            </div>
          );
        })}

        {/* Queue */}
        <p className="label-large text-on-surface-variant uppercase tracking-widest mt-4">Очередь встреч</p>
        <div className="rounded-[1.25rem] bg-surface-container-low overflow-hidden">
          {QUEUE_MATCHES.map((matchId, i) => {
            const match = t.matches.find((m) => m.id === matchId);
            if (!match) return null;
            return (
              <div key={matchId}>
                <div className="flex items-center gap-3 px-4 py-3 min-h-[56px]">
                  <span className="label-medium text-on-surface-variant w-5">{i + 1}</span>
                  <span className="body-large text-on-surface flex-1 truncate">{match.player1Name}</span>
                  <span className="body-small text-on-surface-variant">vs</span>
                  <span className="body-large text-on-surface flex-1 truncate text-right">{match.player2Name}</span>
                </div>
                {i < QUEUE_MATCHES.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
              </div>
            );
          })}
        </div>

        <div className="pt-4">
          <Button variant="outlined" className="w-full">
            Завершить турнир
          </Button>
        </div>
      </div>
    </TaskShell>
  );
}
