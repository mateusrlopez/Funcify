import { Input } from "@/components/Input";
import { ChangeEvent, ReactElement } from "react";
import { z } from "zod";

import { InputContainer } from "./CreateFunctionModal.styles";

type Props = {
    type: "input" | "output";
    setFormData: (value: any) => void;
};

const createRedisDataSourceSchema = z.object({
    channel: z.string().min(1, { message: "Channel is required" }),
});

const RedisDataSourceTemplate = ({ type, setFormData }: Props): ReactElement => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        if (type === "input") {
            setFormData((prevData: any) => ({
                ...prevData,
                inputConnectorConfiguration: {
                    ...prevData.inputConnectorConfiguration,
                    type: "Redis",
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData: any) => ({
                ...prevData,
                outputConnectorConfiguration: {
                    ...prevData.outputConnectorConfiguration,
                    type: "Redis",
                    [name]: value,
                },
            }));
        }
    };

    return (
        <InputContainer>
            <Input>
                <Input.Label fieldId="create-function-ds-channel">Channel</Input.Label>
                <Input.Field
                    $tag="input"
                    id="create-function-ds-channel"
                    name="channel"
                    placeholder="e.g. input"
                    onChange={handleInputChange}
                />
            </Input>
            {/* {errors.channel && errors.channel.message && ( */}
            {/*    <ErrorMessage> */}
            {/*        <BiError size={13} /> */}
            {/*        {errors.channel.message} */}
            {/*    </ErrorMessage> */}
            {/* )} */}
        </InputContainer>
    );
};

export { RedisDataSourceTemplate, createRedisDataSourceSchema };
