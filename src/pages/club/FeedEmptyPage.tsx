import { Trophy } from "lucide-react";

export function FeedEmptyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center gap-4">
      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
        <Trophy size={32} />
      </div>
      <p className="title-medium text-on-surface">Турниров пока нет</p>
      <p className="body-medium text-on-surface-variant max-w-xs">
        Как только администратор объявит первый турнир, здесь появятся события и результаты.
      </p>
    </div>
  );
}
