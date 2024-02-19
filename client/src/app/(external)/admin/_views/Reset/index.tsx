import { Title, Subtitle } from "@/app/(external)/admin/styles";
import { ReactNode } from "react";

import { Form } from "./form";
import { Root } from "./styles";

const ResetPassword = (): ReactNode => {
    return (
        <Root>
            <Title>Reset your password</Title>
            <Subtitle>Set your new password below</Subtitle>
            <Form />
        </Root>
    );
};

export { ResetPassword };
