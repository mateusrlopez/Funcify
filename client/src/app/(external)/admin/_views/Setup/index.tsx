import { Title } from "@/app/(external)/admin/styles";
import { ReactNode } from "react";

import { Form } from "./form";
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
