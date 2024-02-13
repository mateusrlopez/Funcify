import React, { ReactNode, PropsWithChildren, ComponentPropsWithoutRef } from "react";

import { InputContainer, LabelContainer, Container } from "./Input.styles";

const Input = ({ children }: PropsWithChildren): ReactNode => <Container>{children}</Container>;

type LabelProps = {
    children: ReactNode;
    fieldId: string;
};

const Label = ({ children, fieldId }: LabelProps): ReactNode => (
    <LabelContainer htmlFor={fieldId}>{children}</LabelContainer>
);
Label.displayName = "Label";
Input.Label = Label;

type InputProps = ComponentPropsWithoutRef<"input">;

export type FieldProps = InputProps & {
    tag: "input" | "textarea";
};

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
    ({ tag, ...props }, ref): ReactNode => {
        return (
            <div style={{ position: "relative", height: "100%" }}>
                <InputContainer ref={ref} tag={tag} {...props} />
            </div>
        );
    }
);
Field.displayName = "Field";
Input.Field = Field;

export { Input };
