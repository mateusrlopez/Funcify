import { InputContainer } from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/CreateFunctionModal.styles";
import { Input } from "@/components/Input";
import { ChangeEvent, ReactNode } from "react";
import { z } from "zod";

type Props = {
    type: "input" | "output";
    setFormData: (value: any) => void;
};

const createMQTTDataSourceSchema = z.object({
    topic: z.string().min(1, { message: "Topic is required" }),
});

const MqttDataSourceTemplate = ({ type, setFormData }: Props): ReactNode => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        if (type === "input") {
            setFormData((prevData: any) => ({
                ...prevData,
                inputConnectorConfiguration: {
                    ...prevData.inputConnectorConfiguration,
                    type: "MQTT",
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData: any) => ({
                ...prevData,
                outputConnectorConfiguration: {
                    ...prevData.outputConnectorConfiguration,
                    type: "MQTT",
                    [name]: value,
                },
            }));
        }
    };

    return (
        <InputContainer>
            <Input>
                <Input.Label fieldId="create-function-ds-topic">Topic</Input.Label>
                <Input.Field
                    $tag="input"
                    id="create-function-ds-topic"
                    name="topic"
                    placeholder="e.g. TOPIC/NAME"
                    onChange={handleInputChange}
                />
            </Input>
            {/* {errors.topic && errors.topic.message && ( */}
            {/*    <ErrorMessage> */}
            {/*        <BiError size={13} /> */}
            {/*        {errors.topic.message} */}
            {/*    </ErrorMessage> */}
            {/* )} */}
        </InputContainer>
    );
};

export { MqttDataSourceTemplate, createMQTTDataSourceSchema };
