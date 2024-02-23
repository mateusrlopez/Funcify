import { Input } from "@/components/Input";
import { ReactNode } from "react";

const Redis = (): ReactNode => (
    <>
        <Input>
            <Input.Label fieldId="">Address</Input.Label>
            <Input.Field $tag="input" type="text" id="redis-address-field" name="address" />
        </Input>
        <Input>
            <Input.Label fieldId="">Username</Input.Label>
            <Input.Field $tag="input" type="text" id="redis-username-field" name="username" />
        </Input>
        <Input>
            <Input.Label fieldId="">Password</Input.Label>
            <Input.Field $tag="input" type="text" id="redis-password-field" name="password" />
        </Input>
        <Input>
            <Input.Label fieldId="">Database</Input.Label>
            <Input.Field $tag="input" type="text" id="redis-database-field" name="database" />
        </Input>
    </>
);

export { Redis };
