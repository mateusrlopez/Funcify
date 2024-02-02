import { Panel } from "@/app/(external)/admin/_components/panel";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ReactElement } from "react";
import { BiError } from "react-icons/bi";

import { Root, Title, Subtitle, ErrorMessagePassword } from "./styles";

const ResetPassword = (): ReactElement => {
    return (
        <main>
            <Panel>
                <Root>
                    <Title>Reset your password</Title>
                    <Subtitle>Set your new password below</Subtitle>

                    <Input>
                        <Input.Label fieldId="password">Password</Input.Label>
                        <Input.Field tag="input" id="password" type="password" max={64} />
                    </Input>
                    <>
                        <Input>
                            <Input.Label fieldId="confirm-password">Confirm Password</Input.Label>
                            <Input.Field
                                tag="input"
                                id="confirm-password"
                                type="password"
                                max={64}
                            />
                        </Input>
                        <ErrorMessagePassword>
                            <BiError size={13} />
                            The passwords are different
                        </ErrorMessagePassword>
                    </>

                    <div style={{ marginTop: "5px" }} />
                    <Button full>Reset</Button>
                </Root>
            </Panel>
        </main>
    );
};

export default ResetPassword;
