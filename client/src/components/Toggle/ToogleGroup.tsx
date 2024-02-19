import type { Root as RootPropTypes } from "@radix-ui/react-toggle-group";
import React, { ComponentProps, ReactElement, ReactNode } from "react";

import { StyledRoot, StyledItem } from "./ToogleGroup.styles";

export type Props = ComponentProps<typeof RootPropTypes> & {
    onValueChange: (value: string) => void;
    toggles: Array<{
        value: ReactNode;
        key: string;
    }>;
};

const ToggleGroup = ({ toggles, ...props }: Props): ReactElement => {
    return (
        <StyledRoot {...props}>
            {toggles?.map(({ key, value }) => (
                <StyledItem key={key} value={key}>
                    {value}
                </StyledItem>
            ))}
        </StyledRoot>
    );
};

export { ToggleGroup };
