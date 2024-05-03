import { Input } from "@/components/Input";
import { ReactNode } from "react";
import { BiError } from "react-icons/bi";
import { z } from "zod";

import { ErrorMessage, InputContainer } from "./CreateDataSourceModal.styles";

type Props = {
    register: any;
    errors: any;
};

const createMQTTDataSourceSchema = z.object({
    broker: z.string().min(1, { message: "Broker is required" }),
    qos: z
        .string()
        .transform(value => Number(value))
        .refine(value => value >= 0 && value <= 2, {
            message: "QoS must be a number between 0 and 2",
        }),
});

const MqttDataSourceTemplate = ({ register, errors }: Props): ReactNode => (
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
            {errors.broker && errors.broker.message && (
                <ErrorMessage>
                    <BiError size={13} />
                    {errors.broker.message}
                </ErrorMessage>
            )}
        </InputContainer>
        <InputContainer>
            <Input>
                <Input.Label fieldId="create-data-source-qos">QoS</Input.Label>
                <Input.Field
                    $tag="input"
                    type="number"
                    defaultValue={0}
                    min={0}
                    max={2}
                    id="create-data-source-qos"
                    {...register("qos", { required: true })}
                />
            </Input>
            {errors.qos && errors.qos.message && (
                <ErrorMessage>
                    <BiError size={13} />
                    {errors.qos.message}
                </ErrorMessage>
            )}
        </InputContainer>
    </>
);

export { MqttDataSourceTemplate, createMQTTDataSourceSchema };
