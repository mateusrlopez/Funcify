import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ReactElement } from "react";
import { BiError } from "react-icons/bi";
import { BsRocketTakeoff } from "react-icons/bs";

import { Root, Title, ErrorMessagePassword } from "./styles";

const Setup = (): ReactElement => {
    return (
        <Root>
            <Title>Configure the root user</Title>

            <Input>
                <Input.Label fieldId="name">Name</Input.Label>
                <Input.Field tag="input" id="name" type="text" max={64} />
            </Input>
            <Input>
                <Input.Label fieldId="email">E-mail</Input.Label>
                <Input.Field
                    tag="input"
                    id="email"
                    type="text"
                    max={64}
                    placeholder="Ex.: john.doe@example.com"
                />
            </Input>
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
                    Let's go!
                    <BsRocketTakeoff />
                </span>
            </Button>
        </Root>
    );
};

export { Setup };
