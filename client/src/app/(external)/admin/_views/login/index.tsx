import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { ReactNode } from "react";

import { Root, Title, ForgotPassword } from "./styles";

const Login = (): ReactNode => {
    return (
        <Root>
            <Title>Log into your account</Title>

            <Input>
                <Input.Label fieldId="email">E-mail</Input.Label>
                <Input.Field tag="input" id="email" type="text" max={64} />
            </Input>
            <>
                <Input>
                    <Input.Label fieldId="password">Password</Input.Label>
                    <Input.Field tag="input" id="password" type="password" max={64} />
                </Input>
                <Checkbox id="remember-me" label="Remember me" />
            </>

            <div style={{ marginTop: "5px" }} />
            <Button full>Sign In</Button>

            <ForgotPassword href="/admin/forgot">Forgot password?</ForgotPassword>
        </Root>
    );
};

export { Login };
