import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { playersMock, type Level } from "@/mocks/players";
import { cn } from "@/lib/utils";

const LEVELS: Level[] = ["L1", "L2", "L3"];

export function PlayerEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = playersMock.find((p) => p.id === Number(id));

  const [name, setName] = useState(player?.name ?? "");
  const [birthDate, setBirthDate] = useState(player?.birthDate ?? "");
  const [level, setLevel] = useState<Level>(player?.level ?? "L1");

  if (!player && id !== "new") return null;

  return (
    <div className="flex flex-col min-h-full bg-surface max-w-[480px] mx-auto">
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2">{id === "new" ? "Новый участник" : "Редактировать"}</span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <TextField label="Имя" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Дата рождения" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} supportingText="дд.мм.гггг" />

        <div>
          <p className="label-large text-on-surface-variant mb-3">Уровень</p>
          <div className="flex gap-3">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={cn(
                  "flex-1 h-12 rounded-full label-large border transition-all",
                  level === l
                    ? "bg-primary text-on-primary border-transparent"
                    : "border-outline-variant text-on-surface-variant hover:bg-on-surface/8",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button variant="filled" className="w-full" onClick={() => navigate(-1)}>
            Сохранить
          </Button>
          {player && (
            <Button variant="text" className="w-full text-error" onClick={() => navigate("/admin/players")}>
              В архив
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
