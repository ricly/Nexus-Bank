"use client";

import { LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface IProps {
  title?: string;
  subTitle?: string;
  icon?: LucideIcon;

  titleClassName?: string;
  subTitleClassName?: string;
  iconClassName?: string;
}

const CustomDialogHeader = ({
  title,
  subTitle,
  icon: Icon,
  titleClassName,
  subTitleClassName,
  iconClassName,
}: IProps) => {
  return (
    <DialogHeader>
      <DialogTitle>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && (
            <Icon size={30} className={cn("stroke-primary", iconClassName)} />
          )}

          {title && (
            <p className={cn("text-xl text-primary", titleClassName)}>
              {title}
            </p>
          )}

          {subTitle && (
            <p
              className={cn("text-sm text-muted-foreground", subTitleClassName)}
            >
              {subTitle}
            </p>
          )}
        </div>
      </DialogTitle>

      <Separator />
    </DialogHeader>
  );
};

export default CustomDialogHeader;
