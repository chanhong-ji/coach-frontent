import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";

interface SelectPairProps {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export function SelectPair({
  name,
  label,
  description,
  options,
  placeholder = "Select an option",
  defaultValue,
  required = false,
}: SelectPairProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start w-full">
      <Label htmlFor={name} className="ml-2 mb-2 flex flex-col items-start -space-y-1" onClick={() => setOpen(true)}>
        <span>{label}</span>
        {description && <small className="text-muted-foreground">{description}</small>}
      </Label>
      <Select
        name={name}
        required={required}
        onOpenChange={setOpen}
        open={open}
        {...(defaultValue ? { defaultValue } : {})}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
