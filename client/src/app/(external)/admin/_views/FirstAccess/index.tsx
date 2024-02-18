import { Title, Subtitle } from "@/app/(external)/admin/styles";
import { ReactNode } from "react";

import { Form } from "./form";
import { Root } from "./styles";

const FirstAccess = (): ReactNode => {
    return (
        <Root>
            <Title>Set your password</Title>
            <Subtitle>
                Hi, <strong>john.doe@example.com</strong>
            </Subtitle>
            <Form />
        </Root>
    );
};

export { FirstAccess };
