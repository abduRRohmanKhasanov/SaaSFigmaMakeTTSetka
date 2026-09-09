import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Chip } from "@/components/ui/chip";
import { Avatar } from "@/components/ui/avatar";
import { LevelChip } from "@/components/ui/level-chip";
import { playersMock, type Level } from "@/mocks/players";
import { cn } from "@/lib/utils";

type Format = "round-robin" | "olympic" | "group+playoff";
type LevelFilter = "Все" | Level;

const FORMATS: { key: Format; title: string; desc: string }[] = [
  { key: "round-robin",    title: "Круговая система",                    desc: "Каждый играет с каждым. Победитель — по сумме очков." },
  { key: "olympic",        title: "Олимпийская система",                 desc: "Выбывание после первого поражения. Быстрый формат." },
  { key: "group+playoff",  title: "Групповой этап + плей-офф",           desc: "Группы, затем сетка лучших. Для большого состава." },
];

const LEVEL_FILTERS: LevelFilter[] = ["Все", "L1", "L2", "L3"];

export function NewTournamentPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [format, setFormat] = useState<Format | null>(null);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("Все");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = playersMock.filter((p) =>
    levelFilter === "Все" || p.level === levelFilter,
  );

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-surface max-w-[480px] mx-auto">
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2">Новый турнир</span>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-8">
        <TextField label="Название турнира" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Дата и время" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />

        {/* Format */}
        <div>
          <p className="label-large text-on-surface-variant mb-3">Формат</p>
          <div className="space-y-2">
            {FORMATS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFormat(f.key)}
                className={cn(
                  "w-full p-4 rounded-[1.25rem] border text-left transition-all",
                  format === f.key
                    ? "border-primary bg-primary-container"
                    : "border-outline-variant bg-surface-container-low hover:bg-surface-container-high",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className={cn("title-small", format === f.key ? "text-on-primary-container" : "text-on-surface")}>{f.title}</p>
                    <p className={cn("body-small mt-1", format === f.key ? "text-on-primary-container/70" : "text-on-surface-variant")}>{f.desc}</p>
                  </div>
                  {format === f.key && <Check size={20} className="text-on-primary-container shrink-0" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Participants */}
        <div>
          <p className="label-large text-on-surface-variant mb-3">Участники</p>
          <div className="flex gap-2 flex-wrap mb-3">
            {LEVEL_FILTERS.map((f) => (
              <Chip key={f} variant="filter" selected={levelFilter === f} onClick={() => setLevelFilter(f)} className="shrink-0">
                {f}
              </Chip>
            ))}
          </div>
          <div className="rounded-[1.25rem] bg-surface-container-low overflow-hidden">
            {filtered.map((p, i) => (
              <div key={p.id}>
                <button
                  onClick={() => toggle(p.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 min-h-[56px] hover:bg-on-surface/4 text-left"
                >
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all",
                    selected.has(p.id) ? "bg-primary border-primary" : "border-outline",
                  )}>
                    {selected.has(p.id) && <Check size={12} className="text-on-primary" />}
                  </div>
                  <Avatar name={p.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="body-large text-on-surface truncate">{p.name}</p>
                  </div>
                  <LevelChip level={p.level} />
                </button>
                {i < filtered.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
              </div>
            ))}
          </div>
          {selected.size > 0 && (
            <p className="label-medium text-on-surface-variant mt-2 px-1">Выбрано: {selected.size}</p>
          )}
        </div>

        <Button variant="filled" className="w-full" onClick={() => navigate("/admin/tournaments")}>
          Создать турнир
        </Button>
      </div>
    </div>
  );
}
