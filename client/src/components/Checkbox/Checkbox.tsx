import type { Root as FieldPropTypes } from "@radix-ui/react-checkbox";
import React, { ComponentProps, ReactNode } from "react";
import { MdCheck } from "react-icons/md";

import { CheckboxField, CheckboxIndicator, Label, Container } from "./Checkbox.styles";

export type Props = {
    id: string;
    label?: string;
};

const Checkbox = ({
    id,
    label,
    ...props
}: ComponentProps<typeof FieldPropTypes> & Props): ReactNode => (
    <Container>
        <CheckboxField id={id} {...props}>
            <CheckboxIndicator>
                <MdCheck size={13} />
            </CheckboxIndicator>
        </CheckboxField>

        {Boolean(label) && <Label htmlFor={id}>{label}</Label>}
    </Container>
);

export { Checkbox };
