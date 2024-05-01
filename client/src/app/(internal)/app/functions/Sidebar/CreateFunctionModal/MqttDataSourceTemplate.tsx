import {
    InputContainer,
    ErrorMessage,
} from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/CreateFunctionModal.styles";
import { Input } from "@/components/Input";
import { DataSourceSchema } from "@/types/dataSource";
import { ReactNode } from "react";

type Props = {
    register: any;
    type: "input" | "output";
    dataSource: DataSourceSchema;
};

const MqttDataSourceTemplate = ({ register, type, dataSource }: Props): ReactNode => (
    <InputContainer>
        <Input>
            <Input.Label fieldId="create-function-ds-broker">Broker</Input.Label>
            <Input.Field
                $tag="input"
                id="create-function-ds-broker"
                // @ts-ignore
                defaultValue={dataSource.configuration.broker}
                disabled
            />
        </Input>
        <Input>
            <Input.Label fieldId="create-function-ds-qos">QOS</Input.Label>
            <Input.Field
                $tag="input"
                id="create-function-ds-qos"
                // @ts-ignore
                defaultValue={dataSource.configuration.qos}
                disabled
            />
        </Input>
        <Input>
            <Input.Label fieldId="create-function-ds-topic">Topic</Input.Label>
            <Input.Field
                $tag="input"
                id="create-function-ds-topic"
                placeholder="e.g. TOPIC/NAME"
                defaultValue="a"
                {...register(`${type}_topic`)}
            />
        </Input>
        <ErrorMessage>Topic is required</ErrorMessage>
    </InputContainer>
);

export { MqttDataSourceTemplate };
