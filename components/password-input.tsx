import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const PasswordInput = ({
  label,
  placeholder,
  defaultValue,
  name,
  field,
  max,
  min,
}: {
  label?: string;
  placeholder: string;
  name: string;
  defaultValue?: string;
  field:
    | ControllerRenderProps<FieldValues, "password">
    | ControllerRenderProps<FieldValues, "confirmPassword">;
  min: number;
  max: number;
}) => {
  const [type, setType] = useState<"password" | "text">("password");

  return (
    <div className="flex items-center pr-1 h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      <Input
        {...field}
        autoComplete={name === "confirmPassword" ? undefined : "new-password"}
        id={`input-${name}`}
        type={type}
        min={min}
        max={max}
        placeholder={placeholder}
        className="h-full py-2 px-3 focus-visible:ring-0 border-none border-transparent"
      />

      <div className="p-1.5">
        <Button
          role="button"
          type="button"
          className="p-0"
          size="sm"
          variant="ghost"
          onClick={() => {
            setType((prev) => (prev === "password" ? "text" : "password"));
          }}
        >
          <Eye size={20} className={cn(type === "password" && "hidden")} />
          <EyeOff size={20} className={cn(type === "text" && "hidden")} />
        </Button>
      </div>
    </div>
  );
};
