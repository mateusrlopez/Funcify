import { Input } from "@/components/Input";
import { ReactNode } from "react";
import { BiError } from "react-icons/bi";
import { z } from "zod";

import { ErrorMessage, InputContainer } from "./CreateDataSourceModal.styles";

type Props = {
    register: any;
};

const createRedisDataSourceSchema = z.object({
    address: z.string().min(1, { message: "Address is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    database: z.string().min(1, { message: "Database is required" }),
});

const RedisDataSourceTemplate = ({ register }: Props): ReactNode => {
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
                <ErrorMessage>
                    <BiError size={13} />
                    Address is required
                </ErrorMessage>
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
                <ErrorMessage>
                    <BiError size={13} />
                    Username is required
                </ErrorMessage>
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
                <ErrorMessage>
                    <BiError size={13} />
                    Password is required
                </ErrorMessage>
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
                <ErrorMessage>
                    <BiError size={13} />
                    Database is required
                </ErrorMessage>
            </InputContainer>
        </>
    );
};

export { RedisDataSourceTemplate, createRedisDataSourceSchema };
