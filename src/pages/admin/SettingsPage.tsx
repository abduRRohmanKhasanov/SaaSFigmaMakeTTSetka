import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { clubMock } from "@/mocks/club";
import { cn } from "@/lib/utils";

const PALETTES = [
  { key: "teal",     label: "Бирюзовый", color: "oklch(40% 0.12 188)" },
  { key: "blue",     label: "Синий",     color: "oklch(40% 0.18 260)" },
  { key: "indigo",   label: "Индиго",    color: "oklch(38% 0.20 290)" },
  { key: "crimson",  label: "Бордовый",  color: "oklch(38% 0.18 10)" },
  { key: "orange",   label: "Оранжевый", color: "oklch(50% 0.18 55)" },
  { key: "graphite", label: "Графит",    color: "oklch(35% 0.03 240)" },
];

export function SettingsPage() {
  const navigate = useNavigate();
  const [clubName, setClubName] = useState(clubMock.name);
  const [palette, setPalette] = useState(clubMock.palette);
  const [setsCount, setSetsCount] = useState("5");
  const [pointsCount, setPointsCount] = useState("11");
  const [ratingEnabled, setRatingEnabled] = useState(true);
  const [startRating, setStartRating] = useState("300");

  return (
    <div className="pb-8">
      {/* Club name */}
      <div className="px-4 pt-4 space-y-4">
        <p className="label-large text-on-surface-variant uppercase tracking-widest">Клуб</p>
        <TextField label="Название клуба" value={clubName} onChange={(e) => setClubName(e.target.value)} />

        {/* Palette */}
        <div>
          <p className="label-large text-on-surface-variant mb-3">Палитра</p>
          <div className="flex gap-3 flex-wrap">
            {PALETTES.map((p) => (
              <button
                key={p.key}
                onClick={() => setPalette(p.key as typeof palette)}
                className={cn("w-12 h-12 rounded-full flex items-center justify-center transition-all", palette === p.key && "ring-2 ring-offset-2 ring-on-surface")}
                style={{ backgroundColor: p.color }}
                aria-label={p.label}
              >
                {palette === p.key && <Check size={20} className="text-white" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-outline-variant mx-4 my-5" />

      {/* Rules */}
      <div className="px-4 space-y-4">
        <p className="label-large text-on-surface-variant uppercase tracking-widest">Правила встречи</p>
        <TextField label="Партий в встрече (Best of)" value={setsCount} onChange={(e) => setSetsCount(e.target.value)} supportingText="Обычно 5 (до 3 побед)" />
        <TextField label="Очков в партии" value={pointsCount} onChange={(e) => setPointsCount(e.target.value)} supportingText="Обычно 11" />
      </div>

      <div className="h-px bg-outline-variant mx-4 my-5" />

      {/* Rating */}
      <div className="px-4 space-y-4">
        <p className="label-large text-on-surface-variant uppercase tracking-widest">Рейтинг</p>
        <div className="flex items-center justify-between py-3">
          <span className="body-large text-on-surface">Рейтинговая система</span>
          <button
            onClick={() => setRatingEnabled((v) => !v)}
            className={cn("w-12 h-6 rounded-full transition-all relative", ratingEnabled ? "bg-primary" : "bg-surface-container-highest border-2 border-outline")}
          >
            <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all", ratingEnabled ? "left-6" : "left-0.5")} />
          </button>
        </div>
        {ratingEnabled && (
          <TextField label="Стартовый рейтинг" value={startRating} onChange={(e) => setStartRating(e.target.value)} supportingText="Очки при регистрации участника" />
        )}
      </div>

      <div className="h-px bg-outline-variant mx-4 my-5" />

      {/* Nav rows */}
      <div className="mx-4 rounded-[1.25rem] bg-surface-container-low overflow-hidden">
        {[
          { label: "Столы и QR-коды", to: "/admin/tables" },
          { label: "Журнал действий", to: "/admin/audit" },
        ].map((item, i) => (
          <div key={item.label}>
            <button
              onClick={() => navigate(item.to)}
              className="w-full flex items-center justify-between px-4 min-h-[56px] hover:bg-on-surface/4 transition-colors"
            >
              <span className="body-large text-on-surface">{item.label}</span>
              <ChevronRight size={20} className="text-on-surface-variant" />
            </button>
            {i === 0 && <div className="h-px bg-outline-variant mx-4" />}
          </div>
        ))}
      </div>

      <div className="px-4 mt-6">
        <Button variant="filled" className="w-full">Сохранить</Button>
      </div>
    </div>
  );
}
