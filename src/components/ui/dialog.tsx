import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  fullscreen?: boolean;
}

export function DialogContent({ children, className, fullscreen }: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-scrim z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <RadixDialog.Content
        className={cn(
          "fixed z-50 bg-surface-container-high shadow-xl outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          fullscreen
            ? "inset-0 flex flex-col"
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-48px)] max-w-[480px] rounded-[1.75rem] p-6",
          className,
        )}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center justify-between mb-4", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <RadixDialog.Title className={cn("headline-small text-on-surface", className)}>
      {children}
    </RadixDialog.Title>
  );
}

export function DialogCloseButton() {
  return (
    <RadixDialog.Close className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-on-surface/8 text-on-surface-variant">
      <X size={24} />
    </RadixDialog.Close>
  );
}
