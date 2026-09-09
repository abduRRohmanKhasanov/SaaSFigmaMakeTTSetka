import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  supportingText?: string;
  error?: boolean;
  errorText?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, supportingText, error, errorText, className, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    const hasValue = Boolean(props.value || props.defaultValue);
    const floated = focused || hasValue || Boolean(props.placeholder);

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              "peer w-full h-14 px-4 pt-4 bg-surface-container-highest rounded-md border",
              "body-large text-on-surface outline-none transition-all",
              !error && "border-outline-variant focus:border-primary focus:border-2",
              error && "border-error border-2",
              "disabled:opacity-38",
            )}
            placeholder=" "
            {...props}
          />
          <label
            htmlFor={fieldId}
            className={cn(
              "absolute left-4 transition-all duration-150 pointer-events-none",
              floated || focused
                ? cn("top-1.5 label-small", error ? "text-error" : focused ? "text-primary" : "text-on-surface-variant")
                : "top-4 body-large text-on-surface-variant",
            )}
          >
            {label}
          </label>
        </div>
        {(supportingText || (error && errorText)) && (
          <p className={cn("label-medium px-4", error ? "text-error" : "text-on-surface-variant")}>
            {error && errorText ? errorText : supportingText}
          </p>
        )}
      </div>
    );
  },
);
TextField.displayName = "TextField";
