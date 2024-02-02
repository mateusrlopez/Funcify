import { ButtonHTMLAttributes, ReactNode } from "react";

import { StyledButton, PolymorphicComponent } from "./styles";

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    asChild?: boolean;
    full?: boolean;
};

const Button = ({ children, asChild = false, ...props }: Props): ReactNode => {
    const Comp = asChild ? PolymorphicComponent : StyledButton;

    // @ts-ignore
    return <Comp {...props}>{children}</Comp>;
};

export { Button };
