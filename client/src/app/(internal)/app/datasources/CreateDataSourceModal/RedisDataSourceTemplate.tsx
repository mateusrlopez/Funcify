import { Input } from "@/components/Input";
import { ReactNode } from "react";
import { BiError } from "react-icons/bi";
import { z } from "zod";

import { ErrorMessage, InputContainer } from "./CreateDataSourceModal.styles";

type Props = {
    register: any;
    errors: any;
};

const createRedisDataSourceSchema = z.object({
    address: z.string().min(1, { message: "Address is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    database: z.string().min(1, { message: "Database is required" }),
});

const RedisDataSourceTemplate = ({ register, errors }: Props): ReactNode => {
    return (
        <>
            <InputContainer>
                <Input>
                    <Input.Label fieldId="create-data-source-address">Address</Input.Label>
                    <Input.Field
                        $tag="input"
                        id="create-data-source-address"
                        {...register("address", { required: true })}
                    />
                </Input>
                {errors.address && errors.address.message && (
                    <ErrorMessage>
                        <BiError size={13} />
                        {errors.address.message}
                    </ErrorMessage>
                )}
            </InputContainer>
            <InputContainer>
                <Input>
                    <Input.Label fieldId="create-data-source-username">Username</Input.Label>
                    <Input.Field
                        $tag="input"
                        id="create-data-source-username"
                        placeholder="e.g. admin"
                        {...register("username", { required: true })}
                    />
                </Input>
                {errors.username && errors.username.message && (
                    <ErrorMessage>
                        <BiError size={13} />
                        {errors.username.message}
                    </ErrorMessage>
                )}
            </InputContainer>
            <InputContainer>
                <Input>
                    <Input.Label fieldId="create-data-source-password">Password</Input.Label>
                    <Input.Field
                        $tag="input"
                        id="create-data-source-password"
                        {...register("password", { required: true })}
                    />
                </Input>
                {errors.password && errors.password.message && (
                    <ErrorMessage>
                        <BiError size={13} />
                        {errors.password.message}
                    </ErrorMessage>
                )}
            </InputContainer>
            <InputContainer>
                <Input>
                    <Input.Label fieldId="create-data-source-database">Database</Input.Label>
                    <Input.Field
                        $tag="input"
                        id="create-data-source-database"
                        {...register("database", { required: true })}
                    />
                </Input>
                {errors.database && errors.database.message && (
                    <ErrorMessage>
                        <BiError size={13} />
                        {errors.database.message}
                    </ErrorMessage>
                )}
            </InputContainer>
        </>
    );
};

export { RedisDataSourceTemplate, createRedisDataSourceSchema };
