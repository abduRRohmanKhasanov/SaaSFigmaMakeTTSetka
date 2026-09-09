import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { LevelChip } from "@/components/ui/level-chip";
import { Chip } from "@/components/ui/chip";
import { Fab } from "@/components/ui/fab";
import { playersMock, type Level } from "@/mocks/players";
import { cn } from "@/lib/utils";

type Filter = "Все" | Level;
const FILTERS: Filter[] = ["Все", "L1", "L2", "L3"];

export function PlayersPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("Все");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return playersMock.filter((p) => {
      const matchLevel = filter === "Все" || p.level === filter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [filter, search]);

  return (
    <div className="relative pb-24">
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
      <div className="flex gap-2 px-4 mt-3 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <Chip key={f} variant="filter" selected={filter === f} onClick={() => setFilter(f)} className="shrink-0">
            {f}
          </Chip>
        ))}
      </div>

      {/* List */}
      <div className="mx-4 mt-3 rounded-[1.25rem] bg-surface-container-low overflow-hidden">
        {filtered.map((p, i) => (
          <div key={p.id}>
            <button
              onClick={() => navigate(`/admin/players/${p.id}`)}
              className="w-full flex items-center gap-3 px-4 py-3 min-h-[64px] hover:bg-on-surface/4 text-left"
            >
              <Avatar name={p.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="body-large text-on-surface truncate">{p.name}</p>
                <LevelChip level={p.level} className="mt-0.5" />
              </div>
              <span className="headline-small text-on-surface">{p.rating}</span>
            </button>
            {i < filtered.length - 1 && <div className="h-px bg-outline-variant mx-4" />}
          </div>
        ))}
      </div>

      {/* FAB */}
      <div className="fixed bottom-24 right-4 z-40">
        <Fab icon={<Plus size={24} />} extended label="Игрок" onClick={() => navigate("/admin/players/new")} />
      </div>
    </div>
  );
}
