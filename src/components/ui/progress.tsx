import * as RadixProgress from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value?: number;
  className?: string;
  indeterminate?: boolean;
}

export function LinearProgress({ value = 0, className, indeterminate }: ProgressProps) {
  return (
    <RadixProgress.Root
      value={indeterminate ? undefined : value}
      className={cn("w-full h-1 bg-surface-container-highest rounded-full overflow-hidden", className)}
    >
      <RadixProgress.Indicator
        className={cn(
          "h-full bg-primary rounded-full transition-all duration-500",
          indeterminate && "animate-[indeterminate_1.5s_ease-in-out_infinite]",
        )}
        style={indeterminate ? undefined : { width: `${value}%` }}
      />
    </RadixProgress.Root>
  );
}
