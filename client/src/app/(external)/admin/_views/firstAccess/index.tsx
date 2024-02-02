import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ReactNode } from "react";
import { BiError } from "react-icons/bi";
import { BsRocketTakeoff } from "react-icons/bs";

import { Root, Title, Subtitle, ErrorMessagePassword } from "./styles";

const FirstAccess = (): ReactNode => {
    return (
        <Root>
            <Title>Set your password</Title>
            <Subtitle>
                Hi, <strong>john.doe@example.com</strong>
            </Subtitle>

            <Input>
                <Input.Label fieldId="password">Password</Input.Label>
                <Input.Field tag="input" id="password" type="password" max={64} />
            </Input>
            <>
                <Input>
                    <Input.Label fieldId="confirm-password">Confirm Password</Input.Label>
                    <Input.Field tag="input" id="confirm-password" type="password" max={64} />
                </Input>
                <ErrorMessagePassword>
                    <BiError size={13} />
                    The passwords are different
                </ErrorMessagePassword>
            </>

            <div style={{ marginTop: "5px" }} />
            <Button full>
                <span
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                    }}
                >
                    Access the Platform!
                    <BsRocketTakeoff />
                </span>
            </Button>
        </Root>
    );
};

export { FirstAccess };
