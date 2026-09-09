import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { LevelChip } from "@/components/ui/level-chip";
import { Chip } from "@/components/ui/chip";
import { playersMock, type Level } from "@/mocks/players";
import { cn } from "@/lib/utils";

type Filter = "Все" | Level;
const FILTERS: Filter[] = ["Все", "L1", "L2", "L3"];

export function RatingPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("Все");
  const [search, setSearch] = useState("");

  const sorted = useMemo(
    () => [...playersMock].sort((a, b) => b.rating - a.rating),
    [],
  );

  const filtered = useMemo(() => {
    return sorted.filter((p) => {
      const matchLevel = filter === "Все" || p.level === filter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [sorted, filter, search]);

  return (
    <div className="pb-4">
      {/* Search */}
      <div className="px-4 pt-4 relative">
        <Search size={18} className="absolute left-8 top-1/2 mt-2 -translate-y-1/2 text-on-surface-variant" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по имени"
          className="w-full h-12 pl-11 pr-4 rounded-full bg-surface-container-highest body-large text-on-surface placeholder-on-surface-variant outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 mt-3 overflow-x-auto pb-1 scrollbar-none">
        {FILTERS.map((f) => (
          <Chip
            key={f}
            variant="filter"
            selected={filter === f}
            onClick={() => setFilter(f)}
            className="shrink-0"
          >
            {f}
          </Chip>
        ))}
      </div>

      {/* Table */}
      <div className="mt-3 mx-4 rounded-[1.25rem] bg-surface-container-low overflow-hidden">
        {filtered.map((player, i) => {
          const place = sorted.findIndex((p) => p.id === player.id) + 1;
          const isFirst = place === 1;
          return (
            <div key={player.id}>
              <button
                onClick={() => navigate(`/club/player/${player.id}`)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 min-h-[64px] hover:bg-on-surface/4 transition-colors text-left",
                )}
              >
                {/* Place */}
                <span className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center label-large shrink-0",
                  isFirst ? "bg-primary text-on-primary" : "text-on-surface-variant",
                )}>
                  {place}
                </span>

                <Avatar name={player.name} size="sm" />

                <div className="flex-1 min-w-0">
                  <p className="body-large text-on-surface truncate">{player.name}</p>
                  <LevelChip level={player.level} className="mt-0.5" />
                </div>

                {/* Rating — главное */}
                <span className="headline-small text-on-surface shrink-0">{player.rating}</span>
              </button>
              {i < filtered.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="body-large text-on-surface-variant">Нет игроков</p>
          </div>
        )}
      </div>
    </div>
  );
}
