"use client";

import {
    MqttDataSourceTemplate,
    createMQTTDataSourceSchema,
} from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/MqttDataSourceTemplate";
import {
    RedisDataSourceTemplate,
    createRedisDataSourceSchema,
} from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/RedisDataSourceTemplate";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { Toast } from "@/components/Toast";
import { getAllDataSources } from "@/repository/dataSourcesRepository";
import { createFunction } from "@/repository/functionRepository";
import { DataSourceSchema } from "@/types/dataSource";
import { FunctionSchema } from "@/types/function";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, PropsWithChildren, ReactNode, useRef, useState } from "react";
import { MdClose, MdSend } from "react-icons/md";
import shortID from "shortid";
import { z } from "zod";

import { Group, GroupTitle, Footer, Form, InputContainer } from "./CreateFunctionModal.styles";

const FROM_SCRATCH_DEFAULT_CODE = "function main() {\n\t// Your code here\n}";

const createFunctionSchema = z.object({
    name: z.string().min(5, { message: "Name needs to have at least 5 characters" }),
    inputConnectorConfiguration: z.discriminatedUnion("type", [
        z.object({ type: z.literal("Redis"), ...createRedisDataSourceSchema.shape }),
        z.object({ type: z.literal("MQTT"), ...createMQTTDataSourceSchema.shape }),
    ]),
    outputConnectorConfiguration: z.discriminatedUnion("type", [
        z.object({ type: z.literal("Redis"), ...createRedisDataSourceSchema.shape }),
        z.object({ type: z.literal("MQTT"), ...createMQTTDataSourceSchema.shape }),
    ]),
});

export type CreateFunctionSchema = z.infer<typeof createFunctionSchema>;

const CreateFunctionModal = ({ children }: PropsWithChildren): ReactNode => {
    const toastErrorRef = useRef<ToastRefType>();
    const toastSuccessRef = useRef<ToastRefType>();
    const queryClient = useQueryClient();

    const [inputDataSourceType, setInputDataSourceType] = useState<"MQTT" | "REDIS" | null>(null);
    const [outputDataSourceType, setOutputDataSourceType] = useState<"MQTT" | "REDIS" | null>(null);
    const [inputDataSource, setInputDataSource] = useState<DataSourceSchema | null>(null);
    const [outputDataSource, setOutputDataSource] = useState<DataSourceSchema | null>(null);
    const [errorMessages, setErrorMessages] = useState<Array<{
        code: string;
        message: string;
    }> | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        inputConnectorConfiguration: {},
        outputConnectorConfiguration: {},
    });
    const [closeButton, setCloseButton] = useState<boolean>(false);

    const { data: dataSources, isPending } = useQuery({
        queryKey: ["getAllDataSources"],
        queryFn: async () => getAllDataSources(),
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const { mutateAsync: createFunctionFn } = useMutation({
        mutationFn: createFunction,
        onSuccess(_, variables) {
            queryClient.setQueryData(
                ["functions"],
                (data: { functions: Array<FunctionSchema> }) => {
                    const currentFunctions = data.functions ?? [];

                    const newFunctions = [
                        ...currentFunctions,
                        {
                            id: shortID.generate(),
                            status: "ERROR",
                            ...variables,
                        },
                    ];

                    return { functions: newFunctions };
                }
            );
        },
    });

    const onHandleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();

        try {
            const parsedData: CreateFunctionSchema = createFunctionSchema.parse(formData);
            // @ts-ignore
            delete parsedData.inputConnectorConfiguration.type;
            // @ts-ignore
            delete parsedData.outputConnectorConfiguration.type;

            const payload = {
                ...parsedData,
                sourceCode: FROM_SCRATCH_DEFAULT_CODE,
                methodToExecute: "main",
                inputConnectorDataSourceId: inputDataSource?.id,
                outputConnectorDataSourceId: outputDataSource?.id,
            };

            await createFunctionFn({ ...payload });

            toastSuccessRef.current?.publish();
            setCloseButton(true);
        } catch (err: any) {
            setErrorMessages(err.errors);
            toastErrorRef.current?.publish();
        }
    };

    const resetStates = (): void => {
        setErrorMessages(null);
        setFormData({
            name: "",
            inputConnectorConfiguration: {},
            outputConnectorConfiguration: {},
        });
        setInputDataSourceType(null);
        setOutputDataSourceType(null);
    };

    return (
        <Modal>
            <Modal.Trigger>{children}</Modal.Trigger>
            <Modal.Content width="500px">
                <Modal.Content.Header closeButton>Create function</Modal.Content.Header>
                <Modal.Content.Body>
                    {/* @ts-ignore */}
                    <Form onSubmit={onHandleSubmit}>
                        <InputContainer>
                            <Input>
                                <Input.Label fieldId="create-function-name">Name</Input.Label>
                                <Input.Field
                                    $tag="input"
                                    id="create-function-name"
                                    name="name"
                                    onChange={handleInputChange}
                                />
                            </Input>
                            {/* {errors.name && errors.name.message && ( */}
                            {/*    <ErrorMessage> */}
                            {/*        <BiError size={13} /> */}
                            {/*        {errors.name.message} */}
                            {/*    </ErrorMessage> */}
                            {/* )} */}
                        </InputContainer>

                        <Group>
                            <GroupTitle>Data Sources</GroupTitle>

                            <Input>
                                <Input.Label fieldId="input-connector-id">
                                    Input Connector
                                </Input.Label>

                                {!isPending && (
                                    <Select
                                        onValueChange={value => {
                                            const dataSource: DataSourceSchema = JSON.parse(value);
                                            const dataSourceType = dataSource.type;

                                            setInputDataSource(dataSource);
                                            setInputDataSourceType(dataSourceType);
                                        }}
                                    >
                                        {dataSources?.dataSources?.map((ds: DataSourceSchema) => (
                                            <Select.Item value={JSON.stringify(ds)}>
                                                {ds.name}
                                            </Select.Item>
                                        ))}
                                    </Select>
                                )}
                            </Input>

                            {inputDataSourceType === "REDIS" && (
                                <RedisDataSourceTemplate type="input" setFormData={setFormData} />
                            )}

                            {inputDataSourceType === "MQTT" && (
                                <MqttDataSourceTemplate type="input" setFormData={setFormData} />
                            )}

                            <hr style={{ width: "20%" }} />

                            <Input>
                                <Input.Label fieldId="output-connector-id">
                                    Output Connector
                                </Input.Label>

                                {!isPending && (
                                    <Select
                                        onValueChange={value => {
                                            const dataSource: DataSourceSchema = JSON.parse(value);
                                            const dataSourceType = dataSource.type;

                                            setOutputDataSource(dataSource);
                                            setOutputDataSourceType(dataSourceType);
                                        }}
                                    >
                                        {dataSources?.dataSources?.map((ds: DataSourceSchema) => (
                                            <Select.Item value={JSON.stringify(ds)}>
                                                {ds.name}
                                            </Select.Item>
                                        ))}
                                    </Select>
                                )}
                            </Input>

                            {outputDataSourceType === "REDIS" && (
                                <RedisDataSourceTemplate type="output" setFormData={setFormData} />
                            )}

                            {outputDataSourceType === "MQTT" && (
                                <MqttDataSourceTemplate type="output" setFormData={setFormData} />
                            )}
                        </Group>

                        <Footer>
                            {!closeButton ? (
                                <>
                                    <Button type="submit">
                                        <MdSend size={16} />
                                        Create
                                    </Button>
                                    <Modal.Content.Body.Cancel>
                                        <Button $variant="secondary" onClick={resetStates}>
                                            Cancel
                                        </Button>
                                    </Modal.Content.Body.Cancel>
                                </>
                            ) : (
                                <Modal.Content.Body.Action>
                                    <Button onClick={resetStates}>
                                        <MdClose size={16} />
                                        Close modal
                                    </Button>
                                </Modal.Content.Body.Action>
                            )}
                        </Footer>
                    </Form>

                    <Toast>
                        <Toast.Content ref={toastErrorRef} variant="error">
                            <Toast.Title>An unexpected error occurred</Toast.Title>
                            <Toast.Description>
                                {errorMessages?.map(
                                    // eslint-disable-next-line array-callback-return,consistent-return
                                    (item: { code: string; message: string }, index) => {
                                        if (item.code !== "invalid_union_discriminator") {
                                            return (
                                                <span key={index} style={{ display: "block" }}>
                                                    - {item.message}
                                                </span>
                                            );
                                        }
                                    }
                                )}
                            </Toast.Description>
                        </Toast.Content>
                    </Toast>

                    <Toast>
                        <Toast.Content ref={toastSuccessRef} variant="success">
                            <Toast.Title>Function created successfully</Toast.Title>
                        </Toast.Content>
                    </Toast>
                </Modal.Content.Body>
            </Modal.Content>
        </Modal>
    );
};

export { CreateFunctionModal };
