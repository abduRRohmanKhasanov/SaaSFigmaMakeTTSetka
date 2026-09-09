import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clubMock } from "@/mocks/club";

const TABLES = Array.from({ length: clubMock.tablesCount }, (_, i) => i + 1);

export function TablesPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-full bg-surface max-w-[480px] mx-auto">
      <header className="sticky top-0 z-30 flex items-center h-16 px-2 bg-surface-container border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8">
          <ArrowLeft size={24} />
        </button>
        <span className="title-large text-on-surface px-2">Столы и QR-коды</span>
        <button className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-on-surface/8 ml-auto">
          <Printer size={22} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-8">
        <p className="body-medium text-on-surface-variant mb-4">
          QR-коды позволяют судье мгновенно открыть судейский экран для нужного стола.
        </p>
        <div className="space-y-3">
          {TABLES.map((t) => (
            <div key={t} className="p-4 rounded-[1.25rem] bg-surface-container-low flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                <QrCode size={32} className="text-on-surface-variant" />
              </div>
              <div className="flex-1">
                <p className="title-medium text-on-surface">Стол {t}</p>
                <p className="label-small text-on-surface-variant mt-0.5">/referee?table={t}</p>
              </div>
              <Button variant="text" size="sm">Печать</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
