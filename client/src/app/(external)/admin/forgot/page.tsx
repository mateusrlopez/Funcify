import { Panel } from "@/app/(external)/admin/_components/panel";
import { Form } from "@/app/(external)/admin/forgot/form";
import { Title, Subtitle } from "@/app/(external)/admin/styles";
import { ReactNode } from "react";

import { Root } from "./styles";

const ForgotPassword = (): ReactNode => {
    return (
        <main>
            <Panel>
                <Root>
                    <Title>Reset your password</Title>
                    <Subtitle>We will send you an email with password change instructions</Subtitle>
                    <Form />
                </Root>
            </Panel>
        </main>
    );
};

export default ForgotPassword;
