import { Input } from "@/components/Input";
import { DataSourceSchema } from "@/types/dataSource";
import { ReactElement } from "react";

import { InputContainer, ErrorMessage } from "./CreateFunctionModal.styles";

type Props = {
    register: any;
    type: "input" | "output";
    dataSource: DataSourceSchema;
};

const RedisDataSourceTemplate = ({ register, type, dataSource }: Props): ReactElement => (
    <InputContainer>
        <Input>
            <Input.Label fieldId="create-function-ds-address">Address</Input.Label>
            <Input.Field
                $tag="input"
                id="create-function-ds-address"
                // @ts-ignore
                defaultValue={dataSource.configuration.address}
                disabled
            />
        </Input>
        <Input>
            <Input.Label fieldId="create-function-ds-username">Username</Input.Label>
            <Input.Field
                $tag="input"
                id="create-function-ds-username"
                // @ts-ignore
                defaultValue={dataSource.configuration.username}
                disabled
            />
        </Input>
        <Input>
            <Input.Label fieldId="create-function-ds-database">Database</Input.Label>
            <Input.Field
                $tag="input"
                id="create-function-ds-database"
                // @ts-ignore
                defaultValue={dataSource.configuration.database}
                disabled
            />
        </Input>
        <Input>
            <Input.Label fieldId="create-function-ds-channel">Channel</Input.Label>
            <Input.Field
                $tag="input"
                id="create-function-ds-channel"
                placeholder="e.g. input"
                defaultValue="a"
                {...register(`${type}_channel`)}
            />
        </Input>
        <ErrorMessage>Channel is required</ErrorMessage>
    </InputContainer>
);

export { RedisDataSourceTemplate };
