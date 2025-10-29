import type { InputHTMLAttributes } from "react";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { cn } from "~/lib/utils";

interface InputPairProps {
  name: string;
  label: string;
  description?: string;
  textArea?: boolean;
}

export function InputPair({
  name,
  label,
  description,
  textArea = false,
  defaultValue,
  ...props
}: InputPairProps & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col items-start">
      <Label htmlFor={name} className="ml-1 mb-2 flex flex-col items-start -space-y-1">
        <span>{label}</span>
        {description && <small className="text-muted-foreground">{description}</small>}
      </Label>
      {textArea ? (
        <textarea
          id={name}
          name={name}
          {...props}
          rows={4}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/0 border-input flex  w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          )}
          defaultValue={defaultValue}
        />
      ) : (
        <Input id={name} name={name} defaultValue={defaultValue} {...props} />
      )}
    </div>
  );
}
