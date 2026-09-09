import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AUDIT_LOG = [
  { id: 1, action: "Создан турнир «Летний чемпионат — 2025»",   who: "admin",          when: "15.05.2025, 10:32" },
  { id: 2, action: "Добавлен участник: Ольга Смирнова",          who: "admin",          when: "10.05.2025, 18:15" },
  { id: 3, action: "Подтверждён результат: Соколов — Кузнецова", who: "судья (стол 1)", when: "12.04.2025, 19:48" },
  { id: 4, action: "Турнир «Весенний кубок — 2025» завершён",   who: "admin",          when: "12.04.2025, 20:00" },
  { id: 5, action: "Изменены правила клуба",                     who: "admin",          when: "01.04.2025, 09:14" },
  { id: 6, action: "Добавлен участник: Наталья Павлова",         who: "admin",          when: "28.03.2025, 17:22" },
  { id: 7, action: "Создан турнир «Весенний кубок — 2025»",     who: "admin",          when: "01.04.2025, 11:00" },
  { id: 8, action: "Изменена палитра клуба",                    who: "admin",          when: "15.02.2025, 14:05" },
];

export function AuditPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-full bg-surface max-w-[480px] mx-auto">
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2">Журнал действий</span>
      </header>

      <div className="flex-1 overflow-y-auto pb-6">
        <div className="mx-4 mt-4 rounded-[1.25rem] bg-surface-container-low overflow-hidden">
          {AUDIT_LOG.map((entry, i) => (
            <div key={entry.id}>
              <div className="px-4 py-3">
                <p className="body-medium text-on-surface">{entry.action}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="label-small text-on-surface-variant">{entry.who}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant" />
                  <span className="label-small text-on-surface-variant">{entry.when}</span>
                </div>
              </div>
              {i < AUDIT_LOG.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
