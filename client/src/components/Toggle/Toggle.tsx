import type { Root } from "@radix-ui/react-toggle";
import React, { ComponentProps, ReactElement } from "react";

import { StyledRoot } from "./Toogle.styles";

type PropTypes = {
    size?: "sm" | "md" | "lg";
};

const Toggle = ({
    children,
    size = "sm",
    ...props
}: ComponentProps<typeof Root> & PropTypes): ReactElement => (
    <StyledRoot {...props} size={size}>
        {children}
    </StyledRoot>
);

export { Toggle };
