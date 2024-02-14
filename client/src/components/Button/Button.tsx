import { ButtonHTMLAttributes, ReactNode } from "react";

import { StyledButton, PolymorphicComponent } from "./Button.styles";

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    $asChild?: boolean;
    $full?: boolean;
    $variant?: "primary" | "secondary" | "tertiary";
};

const Button = ({
    children,
    $asChild = false,
    $variant = "primary",
    ...props
}: Props): ReactNode => {
    const Comp = $asChild ? PolymorphicComponent : StyledButton;

    return (
        // @ts-ignore
        <Comp $variant={$variant} {...props}>
            {children}
        </Comp>
    );
};

export { Button };
