import { Form } from "@/app/(external)/admin/_views/setup/form";
import { Title } from "@/app/(external)/admin/styles";
import { ReactNode } from "react";

import { Root } from "./styles";

const Setup = (): ReactNode => {
    return (
        <Root>
            <Title>Configure the root user</Title>
            <Form />
        </Root>
    );
};

export { Setup };
