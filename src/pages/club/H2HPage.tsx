import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { h2hMock } from "@/mocks/h2h";
import { cn } from "@/lib/utils";

export function H2HPage() {
  const { id1, id2 } = useParams();
  const navigate = useNavigate();
  const data = h2hMock;
  const { player1, player2, score, matches } = data;

  return (
    <div className="flex flex-col min-h-full bg-surface max-w-[480px] mx-auto">
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2">Личные встречи</span>
      </header>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Players vs */}
        <div className="mx-4 mt-4 p-5 rounded-[1.25rem] bg-primary-container flex items-center gap-3">
          <div className="flex-1 flex flex-col items-center gap-2">
            <Avatar name={player1.name} size="lg" />
            <p className="label-large text-on-primary-container text-center">{player1.name}</p>
            <p className="label-small text-on-primary-container/70">{player1.rating}</p>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0">
            <span className="display-medium text-on-primary-container">{score.p1}</span>
            <span className="body-small text-on-primary-container/70">:</span>
            <span className="display-medium text-on-primary-container">{score.p2}</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <Avatar name={player2.name} size="lg" />
            <p className="label-large text-on-primary-container text-center">{player2.name}</p>
            <p className="label-small text-on-primary-container/70">{player2.rating}</p>
          </div>
        </div>

        {/* Matches list */}
        <div className="mx-4 mt-3 rounded-[1.25rem] bg-surface-container-low overflow-hidden">
          <div className="px-4 py-3 border-b border-outline-variant">
            <p className="title-small text-on-surface">Все встречи</p>
          </div>
          {matches.map((m, i) => {
            const p1sets = m.sets.filter(([a, b]) => a > b).length;
            const p2sets = m.sets.filter(([a, b]) => b > a).length;
            const p1Won = m.winnerId === player1.id;
            const setsStr = m.sets.map(([a, b]) => `${a}:${b}`).join(", ");
            return (
              <div key={m.id}>
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn("title-medium", p1Won ? "text-primary" : "text-on-surface-variant")}>{p1sets}</span>
                      <span className="body-small text-on-surface-variant">:</span>
                      <span className={cn("title-medium", !p1Won ? "text-primary" : "text-on-surface-variant")}>{p2sets}</span>
                    </div>
                    <p className="label-small text-on-surface-variant mt-0.5">{setsStr}</p>
                  </div>
                  <span className="label-small text-on-surface-variant">{m.date}</span>
                </div>
                {i < matches.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
