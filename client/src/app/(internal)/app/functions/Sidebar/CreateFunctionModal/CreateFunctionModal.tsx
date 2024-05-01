"use client";

import { MqttDataSourceTemplate } from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/MqttDataSourceTemplate";
import { RedisDataSourceTemplate } from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/RedisDataSourceTemplate";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { Toast } from "@/components/Toast";
import { getAllDataSources } from "@/repository/dataSourcesRepository";
import { DataSourceSchema } from "@/types/dataSource";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { z } from "zod";

import {
    Group,
    GroupTitle,
    Footer,
    ErrorMessage,
    Form,
    InputContainer,
} from "./CreateFunctionModal.styles";

const FROM_SCRATCH_DEFAULT_CODE = "function main() {\n\t// Your code here\n}";

const createFunctionSchema = z.object({
    name: z.string().min(5, { message: "Name needs to have at least 5 characters" }),
    sourceCode: z
        .string()
        .min(1, { message: "Source code is required" })
        .default(FROM_SCRATCH_DEFAULT_CODE),
    methodToExecute: z
        .string()
        .min(1, { message: "Method to execute is required" })
        .default("main"),
    input_topic: z.string().nullable(),
    output_topic: z.string().nullable(),
    input_channel: z.string().nullable(),
    output_channel: z.string().nullable(),
});

export type CreateFunctionSchema = z.infer<typeof createFunctionSchema>;

const CreateFunctionModal = ({ children }: PropsWithChildren): ReactNode => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateFunctionSchema>({
        resolver: zodResolver(createFunctionSchema),
    });
    const toastRef = useRef<ToastRefType>();

    const { data: dataSources, isPending } = useQuery({
        queryKey: ["getAllDataSources"],
        queryFn: async () => getAllDataSources(),
    });

    const dataSourceTypes = dataSources?.dataSources?.map((ds: DataSourceSchema) => ds.type);
    const [inputDatasource, setInputDatasource] = useState<DataSourceSchema | null>(null);
    const [outputDatasource, setOutputDatasource] = useState<DataSourceSchema | null>(null);

    const onHandleSubmit: SubmitHandler<CreateFunctionSchema> = async data => {
        try {
            console.log("here", data);
        } catch (err) {
            toastRef.current?.publish();
        }
    };

    return (
        <Modal>
            <Modal.Trigger>{children}</Modal.Trigger>
            <Modal.Content width="500px">
                <Modal.Content.Header closeButton>Create function</Modal.Content.Header>
                <Modal.Content.Body>
                    {/* @ts-ignore */}
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                        <InputContainer>
                            <Input>
                                <Input.Label fieldId="create-function-name">Name</Input.Label>
                                <Input.Field
                                    $tag="input"
                                    id="create-function-name"
                                    {...register("name", { required: true })}
                                />
                            </Input>
                            {errors.name && errors.name.message && (
                                <ErrorMessage>
                                    <BiError size={13} />
                                    {errors.name.message}
                                </ErrorMessage>
                            )}
                        </InputContainer>

                        <Group>
                            <GroupTitle>Data Sources</GroupTitle>

                            <Input>
                                <Input.Label fieldId="input-connector-id">
                                    Input Connector
                                </Input.Label>

                                {!isPending && (
                                    <Select
                                        value={JSON.stringify(inputDatasource)}
                                        onValueChange={value => {
                                            const parsedDatasource = JSON.parse(`${value}`);
                                            setInputDatasource(parsedDatasource);
                                        }}
                                    >
                                        {dataSources?.dataSources ? (
                                            dataSourceTypes?.map(type => (
                                                <Select.Group label={type}>
                                                    {dataSources.dataSources.map(
                                                        // eslint-disable-next-line array-callback-return,consistent-return
                                                        (ds: DataSourceSchema) => {
                                                            if (ds.type === type) {
                                                                return (
                                                                    <Select.Item
                                                                        value={JSON.stringify(ds)}
                                                                    >
                                                                        {ds.name}
                                                                    </Select.Item>
                                                                );
                                                            }
                                                        }
                                                    )}
                                                </Select.Group>
                                            ))
                                        ) : (
                                            <Select.Item value="invalid">
                                                Register a datasource first
                                            </Select.Item>
                                        )}
                                    </Select>
                                )}

                                {/* {errors.inputConnectorID && errors.inputConnectorID.message && ( */}
                                {/*    <ErrorMessage> */}
                                {/*        <BiError size={13} /> */}
                                {/*        {errors.inputConnectorID.message} */}
                                {/*    </ErrorMessage> */}
                                {/* )} */}
                            </Input>

                            {inputDatasource?.type === "REDIS" && (
                                <RedisDataSourceTemplate
                                    register={register}
                                    type="input"
                                    dataSource={inputDatasource}
                                />
                            )}

                            {inputDatasource?.type === "MQTT" && (
                                <MqttDataSourceTemplate
                                    register={register}
                                    type="input"
                                    dataSource={inputDatasource}
                                />
                            )}

                            <hr style={{ width: "20%" }} />

                            <Input>
                                <Input.Label fieldId="output-connector-id">
                                    Output Connector
                                </Input.Label>

                                {!isPending && (
                                    <Select
                                        value={JSON.stringify(outputDatasource)}
                                        onValueChange={value => {
                                            const parsedDatasource = JSON.parse(`${value}`);
                                            setOutputDatasource(parsedDatasource);
                                        }}
                                    >
                                        {dataSources?.dataSources ? (
                                            dataSourceTypes?.map(type => (
                                                <Select.Group label={type}>
                                                    {dataSources.dataSources.map(
                                                        // eslint-disable-next-line array-callback-return,consistent-return
                                                        (ds: DataSourceSchema) => {
                                                            if (ds.type === type) {
                                                                return (
                                                                    <Select.Item
                                                                        value={JSON.stringify(ds)}
                                                                    >
                                                                        {ds.name}
                                                                    </Select.Item>
                                                                );
                                                            }
                                                        }
                                                    )}
                                                </Select.Group>
                                            ))
                                        ) : (
                                            <Select.Item value="invalid">
                                                Register a datasource first
                                            </Select.Item>
                                        )}
                                    </Select>
                                )}

                                {/* {errors.outputConnectorID && errors.outputConnectorID.message && ( */}
                                {/*    <ErrorMessage> */}
                                {/*        <BiError size={13} /> */}
                                {/*        {errors.outputConnectorID.message} */}
                                {/*    </ErrorMessage> */}
                                {/* )} */}
                            </Input>

                            {outputDatasource?.type === "REDIS" && (
                                <RedisDataSourceTemplate
                                    register={register}
                                    type="output"
                                    dataSource={outputDatasource}
                                />
                            )}

                            {outputDatasource?.type === "MQTT" && (
                                <MqttDataSourceTemplate
                                    register={register}
                                    type="output"
                                    dataSource={outputDatasource}
                                />
                            )}
                        </Group>

                        <Footer>
                            <Button type="submit">
                                <MdSend size={16} />
                                Create
                            </Button>
                            <Modal.Content.Body.Cancel>
                                <Button $variant="secondary">Cancel</Button>
                            </Modal.Content.Body.Cancel>
                        </Footer>
                    </Form>

                    <Toast>
                        <Toast.Content ref={toastRef} variant="error">
                            <Toast.Title>An unexpected error occurred</Toast.Title>
                            <Toast.Description>
                                Check your environment logs to understand the problem
                            </Toast.Description>
                        </Toast.Content>
                    </Toast>
                </Modal.Content.Body>
            </Modal.Content>
        </Modal>
    );
};

export { CreateFunctionModal };
