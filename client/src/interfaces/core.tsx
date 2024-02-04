import { CoreTheme } from "@/theme/core";
import { ReactNode } from "react";

export interface IReactChildren {
    children: ReactNode;
}

export interface ISVGProps {
    width?: number;
    height?: number;
    fillColor?: keyof typeof CoreTheme.colors;
}
