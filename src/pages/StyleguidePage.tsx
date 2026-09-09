import { useState } from "react";
import { Sun, Moon, Check, ChevronRight, Info, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { TextField } from "@/components/ui/text-field";
import { Fab } from "@/components/ui/fab";
import { LinearProgress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { LevelChip } from "@/components/ui/level-chip";
import { ListItem } from "@/components/ui/list-item";
import { IconButton } from "@/components/ui/top-app-bar";
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogCloseButton, DialogClose,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const THEMES = [
  { key: "theme-teal",     label: "Teal" },
  { key: "theme-blue",     label: "Blue" },
  { key: "theme-indigo",   label: "Indigo" },
  { key: "theme-crimson",  label: "Crimson" },
  { key: "theme-orange",   label: "Orange" },
  { key: "theme-graphite", label: "Graphite" },
];

const COLOR_ROLES = [
  ["primary",              "on-primary"],
  ["primary-container",    "on-primary-container"],
  ["secondary",            "on-secondary"],
  ["secondary-container",  "on-secondary-container"],
  ["tertiary",             "on-tertiary"],
  ["tertiary-container",   "on-tertiary-container"],
  ["error",                "on-error"],
  ["error-container",      "on-error-container"],
  ["surface",              "on-surface"],
  ["surface-variant",      "on-surface-variant"],
  ["surface-container-lowest", "on-surface"],
  ["surface-container-low",    "on-surface"],
  ["surface-container",        "on-surface"],
  ["surface-container-high",   "on-surface"],
  ["surface-container-highest","on-surface"],
];

const TYPE_SCALE = [
  "display-large", "display-medium", "display-small",
  "headline-large", "headline-medium", "headline-small",
  "title-large", "title-medium", "title-small",
  "body-large", "body-medium", "body-small",
  "label-large", "label-medium", "label-small",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-6 px-4">
      <p className="label-large text-on-surface-variant mb-4 uppercase tracking-widest">{title}</p>
      {children}
    </section>
  );
}

export function StyleguidePage() {
  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState("theme-teal");
  const [filterSelected, setFilterSelected] = useState(false);
  const [textVal, setTextVal] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const rootClasses = `${dark ? "dark" : ""} ${theme}`;

  return (
    <div className={rootClasses} style={{ minHeight: "100%", background: "var(--md-surface)" }}>
      {/* Sticky controls */}
      <div className="sticky top-0 z-50 bg-surface-container border-b border-outline-variant px-4 py-3 flex flex-wrap gap-3 items-center">
        {/* Dark toggle */}
        <button
          onClick={() => setDark((d) => !d)}
          className="flex items-center gap-2 h-10 px-4 rounded-full bg-surface-container-high text-on-surface label-large transition-colors hover:bg-surface-container-highest"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
          {dark ? "Светлая" : "Тёмная"}
        </button>

        {/* Palette buttons */}
        <div className="flex gap-2 flex-wrap">
          {THEMES.map((t) => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              className={`h-8 px-3 rounded-full label-small border transition-all ${
                theme === t.key
                  ? "bg-primary text-on-primary border-transparent"
                  : "bg-transparent border-outline-variant text-on-surface-variant hover:bg-on-surface/8"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[480px] mx-auto">
        {/* ─── COLORS ─── */}
        <Section title="Цвета MD3">
          <div className="grid grid-cols-2 gap-2">
            {COLOR_ROLES.map(([bg, fg]) => (
              <div
                key={bg}
                className={`rounded-xl p-3 bg-${bg} text-${fg}`}
              >
                <p className="label-small opacity-80">{bg}</p>
              </div>
            ))}
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── TYPOGRAPHY ─── */}
        <Section title="Типографика">
          <div className="space-y-2">
            {TYPE_SCALE.map((cls) => (
              <div key={cls} className="flex items-baseline justify-between gap-4">
                <p className={`${cls} text-on-surface`}>Пример текста</p>
                <span className="label-small text-on-surface-variant shrink-0">{cls}</span>
              </div>
            ))}
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── BUTTONS ─── */}
        <Section title="Кнопки">
          <div className="flex flex-wrap gap-3 mb-3">
            <Button variant="filled">Filled</Button>
            <Button variant="tonal">Tonal</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="filled" disabled>Disabled</Button>
            <Button variant="tonal" disabled>Disabled</Button>
            <Button variant="outlined" disabled>Disabled</Button>
            <Button size="icon"><Plus size={20} /></Button>
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── TEXT FIELDS ─── */}
        <Section title="Поля ввода">
          <div className="space-y-4">
            <TextField label="Обычное поле" supportingText="Подсказка под полем" />
            <TextField label="С значением" value={textVal} onChange={(e) => setTextVal(e.target.value)} supportingText="Введите текст" />
            <TextField label="С ошибкой" defaultValue="wrong@" error errorText="Некорректный email" />
            <TextField label="Отключённое" disabled defaultValue="Нельзя редактировать" />
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── CARDS ─── */}
        <Section title="Карточки">
          <div className="space-y-3">
            <Card variant="elevated">
              <CardContent>
                <p className="title-medium text-on-surface">Elevated card</p>
                <p className="body-medium text-on-surface-variant mt-1">Лёгкая тень, bg-surface-container-low</p>
              </CardContent>
            </Card>
            <Card variant="filled">
              <CardContent>
                <p className="title-medium text-on-surface">Filled card</p>
                <p className="body-medium text-on-surface-variant mt-1">bg-surface-container-highest</p>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <p className="title-medium text-on-surface">Outlined card</p>
                <p className="body-medium text-on-surface-variant mt-1">Граница outline-variant</p>
              </CardContent>
            </Card>
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── CHIPS ─── */}
        <Section title="Чипы">
          <div className="flex flex-wrap gap-3">
            <Chip variant="assist" icon={<Info size={16} />}>Assist</Chip>
            <Chip variant="assist">Без иконки</Chip>
            <Chip variant="filter" selected={filterSelected} onClick={() => setFilterSelected((s) => !s)} icon={filterSelected ? <Check size={16} /> : undefined}>
              Filter
            </Chip>
            <Chip variant="filter">L1</Chip>
            <Chip variant="filter" selected icon={<Check size={16} />}>L2</Chip>
          </div>
          <div className="mt-3 flex gap-2">
            <LevelChip level="L1" />
            <LevelChip level="L2" />
            <LevelChip level="L3" />
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── FAB ─── */}
        <Section title="FAB">
          <div className="flex gap-4 items-center flex-wrap">
            <Fab icon={<Plus size={24} />} />
            <Fab variant="surface" icon={<Star size={24} />} />
            <Fab icon={<Plus size={24} />} extended label="Создать" />
            <Fab variant="surface" icon={<Tag size={24} />} extended label="Добавить тег" />
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── LIST ─── */}
        <Section title="Список">
          <div className="bg-surface-container rounded-xl overflow-hidden">
            <ListItem
              leading={<Avatar name="Алексей Соколов" size="sm" />}
              headline="Алексей Соколов"
              supportingText="Рейтинг: 680 · L3"
              trailing={<ChevronRight size={20} />}
              divider
            />
            <ListItem
              leading={<Avatar name="Мария Кузнецова" size="sm" />}
              headline="Мария Кузнецова"
              supportingText="Рейтинг: 615 · L3"
              trailing={<ChevronRight size={20} />}
              divider
            />
            <ListItem
              leading={<Avatar name="Дмитрий Новиков" size="sm" />}
              headline="Дмитрий Новиков"
              supportingText="Рейтинг: 540 · L2"
              trailing={<ChevronRight size={20} />}
            />
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── TOP APP BAR ─── */}
        <Section title="Верхняя панель">
          <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant space-y-2">
            <div className="bg-surface-container border-b border-outline-variant flex items-center h-16 px-2 gap-1">
              <IconButton label="Назад"><ChevronRight size={22} className="rotate-180" /></IconButton>
              <span className="title-large text-on-surface flex-1 px-2">Small (small)</span>
              <IconButton label="Действие"><Info size={22} /></IconButton>
            </div>
            <div className="bg-surface-container pb-3 pt-2 flex flex-col items-center">
              <div className="flex items-center w-full h-12 px-2">
                <IconButton label="Назад"><ChevronRight size={22} className="rotate-180" /></IconButton>
              </div>
              <p className="headline-small text-on-surface">Center-aligned</p>
              <p className="body-small text-on-surface-variant mt-0.5">Подзаголовок</p>
            </div>
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── BOTTOM NAV ─── */}
        <Section title="Нижняя навигация">
          <div className="rounded-xl overflow-hidden border border-outline-variant">
            <div className="flex bg-surface-container min-h-[80px]">
              {[
                { label: "Лента", active: true },
                { label: "Рейтинг", active: false },
                { label: "Профиль", active: false },
                { label: "Правила", active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex-1 flex flex-col items-center justify-center gap-1 pt-3 pb-4 ${item.active ? "text-on-secondary-container" : "text-on-surface-variant"}`}
                >
                  <span className={`w-16 h-8 flex items-center justify-center rounded-full ${item.active ? "bg-secondary-container" : ""}`}>
                    <Star size={22} fill={item.active ? "currentColor" : "none"} />
                  </span>
                  <span className="label-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── DIALOG ─── */}
        <Section title="Диалог">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="tonal">Открыть диалог</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Подтверждение действия</DialogTitle>
                <DialogCloseButton />
              </DialogHeader>
              <p className="body-medium text-on-surface-variant mb-6">
                Это пример модального диалога в стиле Material Design 3. Скругления 1.75rem, фон surface-container-high.
              </p>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button variant="text">Отмена</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="filled">Подтвердить</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </Section>

        <div className="h-px bg-outline-variant mx-4" />

        {/* ─── PROGRESS ─── */}
        <Section title="Linear Progress">
          <div className="space-y-6">
            <div>
              <p className="label-medium text-on-surface-variant mb-2">Determinate (75%)</p>
              <LinearProgress value={75} />
            </div>
            <div>
              <p className="label-medium text-on-surface-variant mb-2">Indeterminate</p>
              <LinearProgress indeterminate />
            </div>
          </div>
        </Section>

        <div className="h-16" />
      </div>

      <style>{`
        @keyframes indeterminate {
          0%   { transform: translateX(-100%) scaleX(0.5); }
          50%  { transform: translateX(0%) scaleX(0.5); }
          100% { transform: translateX(100%) scaleX(0.5); }
        }
      `}</style>
    </div>
  );
}
