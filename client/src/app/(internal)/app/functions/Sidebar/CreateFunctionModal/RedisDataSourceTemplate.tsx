import { Input } from "@/components/Input";
import { ReactElement } from "react";

import { ErrorMessage, InputContainer } from "./CreateFunctionModal.styles";

// TODO: Complete the type definition
type Props = {
    register: any;
};

const RedisDataSourceTemplate = ({ register }: Props): ReactElement => (
    <InputContainer>
        <Input>
            <Input.Label fieldId="create-function-ds-channel">Channel</Input.Label>
            <Input.Field
                $tag="input"
                id="create-function-ds-channel"
                placeholder="e.g. input"
                {...register("channel", { required: true })}
            />
        </Input>
        <ErrorMessage>Channel is required</ErrorMessage>
    </InputContainer>
);

export { RedisDataSourceTemplate };
