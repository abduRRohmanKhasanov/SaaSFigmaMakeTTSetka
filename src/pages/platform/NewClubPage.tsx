import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { cn } from "@/lib/utils";

const PALETTES = [
  { key: "teal",     label: "Бирюзовый", color: "oklch(40% 0.12 188)" },
  { key: "blue",     label: "Синий",     color: "oklch(40% 0.18 260)" },
  { key: "indigo",   label: "Индиго",    color: "oklch(38% 0.20 290)" },
  { key: "crimson",  label: "Бордовый",  color: "oklch(38% 0.18 10)" },
  { key: "orange",   label: "Оранжевый", color: "oklch(50% 0.18 55)" },
  { key: "graphite", label: "Графит",    color: "oklch(35% 0.03 240)" },
];

export function NewClubPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [palette, setPalette] = useState("teal");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address) { setError(true); return; }
    navigate("/club");
  };

  return (
    <div className="min-h-full flex flex-col max-w-[480px] mx-auto bg-surface">
      <header className="flex items-center h-16 px-2 border-b border-outline-variant bg-surface-container">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2">Новый клуб</span>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 p-4">
        <TextField
          label="Название клуба"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error && !name}
          errorText="Введите название"
        />
        <TextField
          label="Адрес"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          supportingText="Только латиница, например: Moscow, Sportivnaya st. 14"
          error={error && !address}
          errorText="Введите адрес"
        />

        <div>
          <p className="label-large text-on-surface-variant mb-3">Палитра клуба</p>
          <div className="flex gap-3 flex-wrap">
            {PALETTES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setPalette(p.key)}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                  palette === p.key && "ring-2 ring-offset-2 ring-on-surface",
                )}
                style={{ backgroundColor: p.color }}
                aria-label={p.label}
              >
                {palette === p.key && <Check size={20} className="text-white" />}
              </button>
            ))}
          </div>
          <p className="label-medium text-on-surface-variant mt-2">
            {PALETTES.find((p) => p.key === palette)?.label}
          </p>
        </div>

        <Button variant="filled" type="submit" className="mt-auto">Создать клуб</Button>
      </form>
    </div>
  );
}
