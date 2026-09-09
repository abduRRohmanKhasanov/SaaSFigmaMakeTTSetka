import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { LevelChip } from "@/components/ui/level-chip";
import { playersMock, type Player } from "@/mocks/players";
import { tournamentsMock } from "@/mocks/tournaments";
import { cn } from "@/lib/utils";

interface PlayerCardContentProps { player: Player }

export function PlayerCardContent({ player }: PlayerCardContentProps) {
  const navigate = useNavigate();
  const winRate = Math.round((player.wins / (player.wins + player.losses)) * 100);
  const place = [...playersMock].sort((a, b) => b.rating - a.rating).findIndex((p) => p.id === player.id) + 1;

  const allMatches = tournamentsMock
    .flatMap((t) => t.matches)
    .filter((m) => m.player1Id === player.id || m.player2Id === player.id)
    .slice(0, 5);

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="mx-4 mt-4 p-5 rounded-[1.25rem] bg-primary-container flex items-center gap-4">
        <Avatar name={player.name} size="xl" />
        <div className="flex-1 min-w-0">
          <p className="title-large text-on-primary-container">{player.name}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <LevelChip level={player.level} />
            <span className="body-small text-on-primary-container/70">Место {place}</span>
            <span className="body-small text-on-primary-container/70">{player.birthDate}</span>
          </div>
          <span className="display-small text-on-primary-container mt-1 block">{player.rating}</span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mx-4 mt-3 grid grid-cols-4 rounded-[1.25rem] bg-surface-container-low overflow-hidden">
        {[
          { label: "Встреч",    value: player.wins + player.losses },
          { label: "Побед",     value: player.wins },
          { label: "Поражений", value: player.losses },
          { label: "% побед",   value: `${winRate}%` },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center py-3">
            <span className="headline-small text-on-surface">{s.value}</span>
            <span className="label-small text-on-surface-variant mt-0.5 text-center">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Recent matches */}
      <div className="mx-4 mt-3">
        <p className="label-large text-on-surface-variant mb-2 uppercase tracking-widest px-1">Последние встречи</p>
        <div className="rounded-[1.25rem] bg-surface-container-low overflow-hidden">
          {allMatches.length === 0 && (
            <p className="py-6 text-center body-medium text-on-surface-variant">Встреч ещё не было</p>
          )}
          {allMatches.map((m, i) => {
            const isP1 = m.player1Id === player.id;
            const opponentName = isP1 ? m.player2Name : m.player1Name;
            const won = m.winnerId === player.id;
            const p1sets = m.sets.filter(([a, b]) => a > b).length;
            const p2sets = m.sets.filter(([a, b]) => b > a).length;
            const scoreStr = isP1 ? `${p1sets}:${p2sets}` : `${p2sets}:${p1sets}`;
            const setsStr = m.sets.map(([a, b]) => isP1 ? `${a}:${b}` : `${b}:${a}`).join(", ");
            return (
              <div key={m.id}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 min-h-[64px] hover:bg-on-surface/4 text-left"
                  onClick={() => navigate(`/club/h2h/${Math.min(player.id, isP1 ? m.player2Id : m.player1Id)}/${Math.max(player.id, isP1 ? m.player2Id : m.player1Id)}`)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="body-large text-on-surface truncate">{opponentName}</p>
                    <p className="label-small text-on-surface-variant mt-0.5">{setsStr} · {m.date}</p>
                  </div>
                  <span className={cn("title-medium", won ? "text-primary" : "text-error")}>{scoreStr}</span>
                </button>
                {i < allMatches.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      {player.achievements.length > 0 && (
        <div className="mx-4 mt-3">
          <p className="label-large text-on-surface-variant mb-2 uppercase tracking-widest px-1">Достижения</p>
          <div className="flex flex-wrap gap-2">
            {player.achievements.map((a) => (
              <span key={a} className="inline-flex items-center h-8 px-3 rounded-full bg-tertiary-container text-on-tertiary-container label-medium">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PlayerCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = playersMock.find((p) => p.id === Number(id));

  if (!player) return <div className="p-8 text-center body-large text-on-surface-variant">Игрок не найден</div>;

  return (
    <div className="flex flex-col min-h-full bg-surface max-w-[480px] mx-auto">
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2">{player.name}</span>
      </header>
      <div className="flex-1 overflow-y-auto">
        <PlayerCardContent player={player} />
      </div>
    </div>
  );
}
