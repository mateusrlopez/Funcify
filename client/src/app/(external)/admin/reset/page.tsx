import { Panel } from "@/app/(external)/admin/_components/panel";
import { Form } from "@/app/(external)/admin/reset/form";
import { Title, Subtitle } from "@/app/(external)/admin/styles";
import { ReactNode } from "react";

import { Root } from "./styles";

const ResetPassword = (): ReactNode => {
    return (
        <Panel>
            <Root>
                <Title>Reset your password</Title>
                <Subtitle>Set your new password below</Subtitle>
                <Form />
            </Root>
        </Panel>
    );
};

export default ResetPassword;
