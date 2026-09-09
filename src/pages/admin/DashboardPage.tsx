import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinearProgress } from "@/components/ui/progress";
import { dashboardMock } from "@/mocks/dashboard";
import { cn } from "@/lib/utils";

const ACTION_LABELS: Record<string, string> = {
  "no-tournament": "Объявить турнир",
  "announced":     "Запустить турнир",
  "running":       "Управление турниром",
};

const ACTION_ROUTES: Record<string, string> = {
  "no-tournament": "/admin/tournaments/new",
  "announced":     "/admin/tournaments/1",
  "running":       "/admin/tournaments/1/console",
};

export function DashboardPage() {
  const navigate = useNavigate();
  const [checklistVisible, setChecklistVisible] = useState(dashboardMock.checklist.visible);
  const { clubState, playersCount, nextTournament, recentMatches, checklist } = dashboardMock;

  const doneCount = checklist.items.filter((i) => i.done).length;
  const progress = Math.round((doneCount / checklist.items.length) * 100);

  return (
    <div className="pb-6 space-y-3 p-4">
      {/* Primary action card */}
      <div className="p-5 rounded-[1.25rem] bg-surface-container-low">
        <p className="title-medium text-on-surface mb-1">Следующий шаг</p>
        <p className="body-medium text-on-surface-variant mb-4">
          {clubState === "no-tournament" && "Создайте первый турнир для вашего клуба."}
          {clubState === "announced" && "Турнир объявлен — запустите, когда участники будут готовы."}
          {clubState === "running" && "Турнир идёт — откройте пульт для управления."}
        </p>
        <Button variant="filled" onClick={() => navigate(ACTION_ROUTES[clubState])}>
          {ACTION_LABELS[clubState]}
        </Button>
      </div>

      {/* Checklist card */}
      {checklistVisible && (
        <div className="p-5 rounded-[1.25rem] bg-surface-container-low">
          <div className="flex items-center justify-between mb-3">
            <p className="title-medium text-on-surface">Запуск клуба</p>
            <button
              onClick={() => setChecklistVisible(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-on-surface/8 text-on-surface-variant"
            >
              <X size={18} />
            </button>
          </div>
          <LinearProgress value={progress} className="mb-3" />
          <p className="label-medium text-on-surface-variant mb-3">{doneCount} из {checklist.items.length} выполнено</p>
          <ul className="space-y-2">
            {checklist.items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                  item.done ? "bg-primary text-on-primary" : "border-2 border-outline-variant",
                )}>
                  {item.done && <Check size={12} />}
                </div>
                <span className={cn("body-medium", item.done ? "text-on-surface-variant line-through" : "text-on-surface")}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      <div className="p-5 rounded-[1.25rem] bg-surface-container-low space-y-4">
        <div className="flex items-center justify-between">
          <p className="body-medium text-on-surface-variant">Участников</p>
          <p className="title-medium text-on-surface">{playersCount}</p>
        </div>
        <div className="h-px bg-outline-variant" />
        <div>
          <p className="body-medium text-on-surface-variant mb-1">Ближайший турнир</p>
          <p className="title-medium text-on-surface">{nextTournament.name}</p>
          <p className="label-medium text-on-surface-variant">{nextTournament.date}</p>
        </div>
        {recentMatches.length > 0 && (
          <>
            <div className="h-px bg-outline-variant" />
            <div>
              <p className="body-medium text-on-surface-variant mb-2">Последние встречи</p>
              <ul className="space-y-2">
                {recentMatches.map((m) => (
                  <li key={m.id} className="flex items-center justify-between">
                    <span className="body-medium text-on-surface">{m.player1} — {m.player2}</span>
                    <span className="label-large text-on-surface">{m.score}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
