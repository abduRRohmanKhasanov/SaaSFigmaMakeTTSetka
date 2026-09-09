import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TopAppBar } from "@/components/ui/top-app-bar";
import { Plus } from "lucide-react";

export default function EmptyClubsPage() {
  const navigate = useNavigate();
  return (
    <div className="app-shell flex flex-col min-h-screen bg-surface">
      <TopAppBar title="Мои клубы" />
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center">
          <span className="display-small text-on-surface-variant">T</span>
        </div>
        <div>
          <p className="title-large text-on-surface mb-2">Нет клубов</p>
          <p className="body-medium text-on-surface-variant max-w-xs">
            Создайте первый клуб и начните проводить турниры уже сегодня
          </p>
        </div>
        <Button variant="filled" onClick={() => navigate("/platform/new")}>
          <Plus size={18} />
          Создать клуб
        </Button>
      </main>
    </div>
  );
}
