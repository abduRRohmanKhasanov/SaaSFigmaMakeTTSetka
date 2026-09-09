import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Users, Trophy } from "lucide-react";

const HOW_IT_WORKS = [
  { icon: <Users size={28} />, title: "Создайте клуб", desc: "Укажите название, адрес и выберите цвет. Готово за минуту." },
  { icon: <Trophy size={28} />, title: "Добавьте состав", desc: "Внесите участников, укажите уровень. Рейтинг начнёт считаться сразу." },
  { icon: <Zap size={28} />, title: "Проводите турниры", desc: "Система сама сформирует сетку, судья введёт счёт — результат появится мгновенно." },
];

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-full flex flex-col max-w-[480px] mx-auto bg-surface">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-10 text-center">
        <div className="w-16 h-16 rounded-[1.25rem] bg-primary-container flex items-center justify-center mb-6">
          <span className="headline-medium text-on-primary-container">ПТ</span>
        </div>
        <h1 className="headline-large text-on-surface mb-3">PingTable</h1>
        <p className="body-large text-on-surface-variant mb-8 max-w-xs">
          Платформа для управления клубами настольного тенниса. Состав, турниры, рейтинг — всё в одном месте.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button variant="filled" className="w-full" onClick={() => navigate("/register")}>
            Создать клуб
          </Button>
          <Button variant="text" onClick={() => navigate("/login")}>
            Войти
          </Button>
        </div>
      </div>

      {/* How it works */}
      <div className="px-4 pb-8">
        <p className="label-large text-on-surface-variant text-center mb-4 uppercase tracking-widest">Как это работает</p>
        <div className="space-y-3">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-[1.25rem] bg-surface-container-low">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="title-medium text-on-surface">{item.title}</p>
                <p className="body-medium text-on-surface-variant mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-outline-variant px-6 py-4 text-center">
        <p className="label-small text-on-surface-variant">© 2025 PingTable</p>
      </footer>
    </div>
  );
}
