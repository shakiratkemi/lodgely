import type { ReactNode } from "react";

export interface ICard {
  title: string;
  desc: string;
  icon?: ReactNode;
  className?: string;
}
