import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { LevelChip } from "@/components/ui/level-chip";
import { playersMock } from "@/mocks/players";
import { PlayerCardContent } from "./PlayerCardPage";
import {
  Dialog, DialogContent, DialogClose,
} from "@/components/ui/dialog";

interface ProfilePageProps { selected?: boolean }

export function ProfilePage({ selected }: ProfilePageProps) {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [chosenId, setChosenId] = useState<number | null>(selected ? 1 : null);

  const filtered = playersMock.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const chosenPlayer = playersMock.find((p) => p.id === chosenId);

  if (!chosenPlayer) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4 min-h-[60vh]">
        <p className="title-medium text-on-surface">Статистика игрока всегда под рукой</p>
        <p className="body-medium text-on-surface-variant max-w-xs">
          Выберите своё имя из состава клуба, и на этом экране всегда будет ваша карточка.
        </p>
        <Button variant="filled" onClick={() => setDialogOpen(true)}>
          Выбрать игрока
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent fullscreen>
            {/* Search header */}
            <div className="flex items-center gap-2 px-2 h-16 border-b border-outline-variant shrink-0">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск по имени"
                  className="w-full h-12 pl-10 pr-4 bg-surface-container-highest rounded-full body-large text-on-surface placeholder-on-surface-variant outline-none"
                  autoFocus
                />
              </div>
              <DialogClose className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-on-surface/8 text-on-surface-variant">
                <X size={22} />
              </DialogClose>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filtered.map((p, i) => (
                <div key={p.id}>
                  <button
                    className="w-full flex items-center gap-3 px-4 min-h-[72px] hover:bg-on-surface/4 text-left"
                    onClick={() => { setChosenId(p.id); setDialogOpen(false); }}
                  >
                    <Avatar name={p.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="body-large text-on-surface">{p.name}</p>
                    </div>
                    <LevelChip level={p.level} />
                    <span className="label-large text-on-surface ml-2">{p.rating}</span>
                  </button>
                  {i < filtered.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
                </div>
              ))}
            </div>

            {/* Detach */}
            <div className="px-4 py-4 border-t border-outline-variant shrink-0">
              <Button variant="text" onClick={() => { setChosenId(null); setDialogOpen(false); }}>
                Открепить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Change button in top area — shown via navigate to header */}
      <div className="flex justify-end px-4 pt-3">
        <Button variant="text" size="sm" onClick={() => { setChosenId(null); setDialogOpen(true); }}>
          Сменить
        </Button>
      </div>
      <PlayerCardContent player={chosenPlayer} />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent fullscreen>
          <div className="flex items-center gap-2 px-2 h-16 border-b border-outline-variant shrink-0">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по имени"
                className="w-full h-12 pl-10 pr-4 bg-surface-container-highest rounded-full body-large text-on-surface placeholder-on-surface-variant outline-none"
                autoFocus
              />
            </div>
            <DialogClose className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-on-surface/8 text-on-surface-variant">
              <X size={22} />
            </DialogClose>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map((p, i) => (
              <div key={p.id}>
                <button
                  className="w-full flex items-center gap-3 px-4 min-h-[72px] hover:bg-on-surface/4 text-left"
                  onClick={() => { setChosenId(p.id); setDialogOpen(false); }}
                >
                  <Avatar name={p.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="body-large text-on-surface">{p.name}</p>
                  </div>
                  <LevelChip level={p.level} />
                  <span className="label-large text-on-surface ml-2">{p.rating}</span>
                </button>
                {i < filtered.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
              </div>
            ))}
          </div>
          <div className="px-4 py-4 border-t border-outline-variant shrink-0">
            <Button variant="text" onClick={() => { setChosenId(null); setDialogOpen(false); }}>
              Открепить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
