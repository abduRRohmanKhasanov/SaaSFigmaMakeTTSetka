import { cn } from "@/lib/utils";

interface LevelChipProps {
  level: "L1" | "L2" | "L3";
  className?: string;
}

const levelStyles = {
  L1: "bg-tertiary-container text-on-tertiary-container",
  L2: "bg-secondary-container text-on-secondary-container",
  L3: "bg-primary-container text-on-primary-container",
};

export function LevelChip({ level, className }: LevelChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 h-6 rounded-xs label-small",
        levelStyles[level],
        className,
      )}
    >
      {level}
    </span>
  );
}
