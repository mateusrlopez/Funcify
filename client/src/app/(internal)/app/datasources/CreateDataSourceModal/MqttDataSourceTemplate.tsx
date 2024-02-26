import { Input } from "@/components/Input";
import { ReactNode } from "react";
import { BiError } from "react-icons/bi";
import { z } from "zod";

import { ErrorMessage, InputContainer } from "./CreateDataSourceModal.styles";

type Props = {
    register: any;
};

const createMQTTDataSourceSchema = z.object({
    broker: z.string().min(1, { message: "Broker is required" }),
    qos: z
        .string()
        .min(1, { message: "QoS is required" })
        .transform(value => Number(value)),
});

const MqttDataSourceTemplate = ({ register }: Props): ReactNode => (
    <>
        <InputContainer>
            <Input>
                <Input.Label fieldId="create-data-source-broker">Broker</Input.Label>
                <Input.Field
                    $tag="input"
                    id="create-data-source-broker"
                    {...register("broker", { required: true })}
                />
            </Input>
            <ErrorMessage>
                <BiError size={13} />
                Broker is required
            </ErrorMessage>
        </InputContainer>
        <InputContainer>
            <Input>
                <Input.Label fieldId="create-data-source-qos">QoS</Input.Label>
                <Input.Field
                    $tag="input"
                    type="number"
                    min={0}
                    max={2}
                    id="create-data-source-qos"
                    {...register("qos", { required: true })}
                />
            </Input>
            <ErrorMessage>
                <BiError size={13} />
                QoS is required
            </ErrorMessage>
        </InputContainer>
    </>
);

export { MqttDataSourceTemplate, createMQTTDataSourceSchema };
