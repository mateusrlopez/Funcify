import { Title, Subtitle } from "@/app/(external)/admin/styles";
import { ReactNode } from "react";

import { Form } from "./form";
import { Root } from "./styles";

const ForgotPassword = (): ReactNode => {
    return (
        <Root>
            <Title>Reset your password</Title>
            <Subtitle>We will send you an email with password change instructions</Subtitle>
            <Form />
        </Root>
    );
};

export { ForgotPassword };
