import { Form } from "@/app/(external)/admin/_views/login/form";
import { Title } from "@/app/(external)/admin/styles";
import { ReactNode } from "react";

import { Root, ForgotPassword } from "./styles";

const Login = (): ReactNode => {
    return (
        <Root>
            <Title>Log into your account</Title>
            <Form />
            <ForgotPassword href="/admin/forgot">Forgot password?</ForgotPassword>
        </Root>
    );
};

export { Login };
