import { cn } from "@/lib/utils";

interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  headline: string;
  supportingText?: string;
  divider?: boolean;
}

export function ListItem({ leading, trailing, headline, supportingText, divider, className, ...props }: ListItemProps) {
  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-4 px-4 min-h-[72px] py-3",
          "hover:bg-on-surface/4 active:bg-on-surface/8 transition-colors cursor-pointer",
          className,
        )}
        {...props}
      >
        {leading && (
          <div className="shrink-0 text-on-surface-variant">{leading}</div>
        )}
        <div className="flex-1 min-w-0">
          <p className="body-large text-on-surface truncate">{headline}</p>
          {supportingText && (
            <p className="body-medium text-on-surface-variant truncate">{supportingText}</p>
          )}
        </div>
        {trailing && (
          <div className="shrink-0 text-on-surface-variant label-small">{trailing}</div>
        )}
      </div>
      {divider && <div className="h-px bg-outline-variant mx-4" />}
    </div>
  );
}
