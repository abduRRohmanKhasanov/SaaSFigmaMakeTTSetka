import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Megaphone, Swords, Crown, Star, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { LevelChip } from "@/components/ui/level-chip";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { feedMock, currentTournamentMock, championMock, type EventType } from "@/mocks/feed";
import { playersMock } from "@/mocks/players";
import { cn } from "@/lib/utils";

const EVENT_ICONS: Record<EventType, React.ReactNode> = {
  "Анонс":      <Megaphone size={16} />,
  "Встреча":    <Swords size={16} />,
  "Чемпион":   <Crown size={16} />,
  "Достижение": <Star size={16} />,
};

const EVENT_COLORS: Record<EventType, string> = {
  "Анонс":      "bg-tertiary-container text-on-tertiary-container",
  "Встреча":    "bg-secondary-container text-on-secondary-container",
  "Чемпион":   "bg-primary-container text-on-primary-container",
  "Достижение": "bg-tertiary-container text-on-tertiary-container",
};

const STATUS_COLORS: Record<string, string> = {
  "Идёт":     "bg-primary-container text-on-primary-container",
  "Завершён": "bg-surface-container-highest text-on-surface-variant",
  "Объявлен": "bg-tertiary-container text-on-tertiary-container",
};

export function FeedPage() {
  const navigate = useNavigate();
  const [showPast, setShowPast] = useState(false);
  const champion = playersMock.find((p) => p.id === championMock.playerId)!;

  return (
    <div className="pb-4">
      {/* Champion block */}
      <div
        className="mx-4 mt-4 p-5 rounded-[1.25rem] bg-primary-container flex items-center gap-4 cursor-pointer"
        onClick={() => navigate(`/club/player/${champion.id}`)}
      >
        <Avatar name={champion.name} size="xl" />
        <div className="flex-1 min-w-0">
          <p className="label-medium text-on-primary-container/70 mb-0.5">Чемпион клуба</p>
          <p className="title-large text-on-primary-container">{champion.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <LevelChip level={champion.level} />
            <span className="headline-small text-on-primary-container">{champion.rating}</span>
          </div>
        </div>
      </div>

      {/* Current tournament card */}
      <div className="mx-4 mt-3 p-4 rounded-[1.25rem] bg-surface-container-low flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="title-medium text-on-surface truncate">{currentTournamentMock.name}</p>
          <p className="body-small text-on-surface-variant mt-0.5">{currentTournamentMock.date}</p>
          <span className={cn("inline-flex items-center px-2 h-6 rounded-xs label-small mt-2", STATUS_COLORS[currentTournamentMock.status])}>
            {currentTournamentMock.status}
          </span>
        </div>
        <button
          onClick={() => navigate("/club/tournaments")}
          className="label-medium text-primary shrink-0 min-h-[48px] flex items-center px-2"
        >
          Все турниры
        </button>
      </div>

      {/* Events window */}
      <div className="mx-4 mt-3 rounded-[1.25rem] bg-surface-container-low overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-outline-variant">
          <p className="title-small text-on-surface">{feedMock.tournamentName}</p>
          <p className="label-medium text-on-surface-variant">{feedMock.tournamentDate}</p>
        </div>

        {/* Events list */}
        {feedMock.events.map((ev, i) => (
          <div key={ev.id}>
            <div className="flex items-center gap-3 px-4 py-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", EVENT_COLORS[ev.type])}>
                {EVENT_ICONS[ev.type]}
              </div>
              <div className="flex-1 min-w-0 flex items-start gap-2">
                <Chip variant="assist" className="shrink-0 h-6 px-2 min-h-0 label-small">
                  {ev.type}
                </Chip>
                <p className="body-small text-on-surface flex-1">{ev.title}</p>
              </div>
              <span className="label-small text-on-surface-variant shrink-0">{ev.time}</span>
            </div>
            {i < feedMock.events.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
          </div>
        ))}

        {/* Past events */}
        {showPast && (
          <>
            {feedMock.pastEvents.map((ev, i) => (
              <div key={ev.id}>
                <div className="h-px bg-outline-variant mx-4" />
                <div className="flex items-center gap-3 px-4 py-3 opacity-70">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", EVENT_COLORS[ev.type])}>
                    {EVENT_ICONS[ev.type]}
                  </div>
                  <div className="flex-1 min-w-0 flex items-start gap-2">
                    <Chip variant="assist" className="shrink-0 h-6 px-2 min-h-0 label-small">{ev.type}</Chip>
                    <p className="body-small text-on-surface flex-1">{ev.title}</p>
                  </div>
                  <span className="label-small text-on-surface-variant shrink-0">{ev.time}</span>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Раньше button */}
        <div className="px-4 pb-4 pt-2">
          <Button
            variant="text"
            size="sm"
            onClick={() => setShowPast((s) => !s)}
            className="gap-1"
          >
            <ChevronDown size={16} className={cn("transition-transform", showPast && "rotate-180")} />
            {showPast ? "Скрыть" : "Раньше"}
          </Button>
        </div>
      </div>
    </div>
  );
}
