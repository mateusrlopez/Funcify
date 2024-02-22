import {
    ErrorMessage,
    InputContainer,
} from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/CreateFunctionModal.styles";
import { Input } from "@/components/Input";
import { ReactNode } from "react";

// TODO - Complete the type definition
type Props = {
    register: any;
};

const MqttDataSourceTemplate = ({ register }: Props): ReactNode => (
    <InputContainer>
        <Input>
            <Input.Label fieldId="create-function-ds-topic">Topic</Input.Label>
            <Input.Field
                $tag="input"
                id="create-function-ds-topic"
                placeholder="e.g. TOPIC/NAME"
                {...register("topic", { required: true })}
            />
        </Input>
        <ErrorMessage>Topic is required</ErrorMessage>
    </InputContainer>
);

export { MqttDataSourceTemplate };
