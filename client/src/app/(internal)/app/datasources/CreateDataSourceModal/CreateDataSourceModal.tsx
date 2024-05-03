"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { Toast } from "@/components/Toast";
import { createDataSource } from "@/repository/dataSourcesRepository";
import {
    CreateDataSource,
    DataSourceSchema,
    MqttConfiguration,
    RedisConfiguration,
} from "@/types/dataSource";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { MdClose, MdSend } from "react-icons/md";
import shortID from "shortid";
import { z } from "zod";

import { ErrorMessage, Form, InputContainer, Footer } from "./CreateDataSourceModal.styles";
import { createMQTTDataSourceSchema, MqttDataSourceTemplate } from "./MqttDataSourceTemplate";
import { createRedisDataSourceSchema, RedisDataSourceTemplate } from "./RedisDataSourceTemplate";

const createDataSourceSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
});

const dataSourceSchemas = {
    REDIS: createRedisDataSourceSchema,
    MQTT: createMQTTDataSourceSchema,
};

const CreateDataSourceModal = ({ children }: { children: ReactNode }): ReactNode => {
    const toastErrorRef = useRef<ToastRefType>();
    const toastSuccessRef = useRef<ToastRefType>();

    const [dataSourceType, setDataSourceType] = useState<"REDIS" | "MQTT">("REDIS");
    const [errorMessages, setErrorMessages] = useState<Array<string> | null>(null);
    const [closeButton, setCloseButton] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(dataSourceSchemas[dataSourceType].merge(createDataSourceSchema)),
    });

    useEffect((): void => {
        if (Object.keys(errors).length > 0) {
            if (toastErrorRef.current) toastErrorRef.current.publish();
            setErrorMessages(Object.values(errors).map(error => error?.message) as string[]);
        }
    }, [errors]);

    const { mutateAsync: createDataSourceFn } = useMutation({
        mutationFn: createDataSource,
        onSuccess(_, variables) {
            queryClient.setQueryData(
                ["dataSources"],
                (data: { dataSources: Array<DataSourceSchema> }) => {
                    const currentDataSources = data.dataSources ?? [];

                    const newDataSources = [
                        ...currentDataSources,
                        {
                            id: shortID.generate(),
                            ...variables,
                        },
                    ];

                    return { dataSources: newDataSources };
                }
            );
        },
    });

    const onHandleSubmit: SubmitHandler<CreateDataSource> = async (data: any) => {
        try {
            if (dataSourceType === "MQTT") {
                await createDataSourceFn({
                    name: data.name,
                    type: "MQTT",
                    configuration: { broker: data.broker, qos: data.qos } as Omit<
                        MqttConfiguration,
                        "topic"
                    >,
                });
            }

            if (dataSourceType === "REDIS") {
                await createDataSourceFn({
                    name: data.name,
                    type: "REDIS",
                    configuration: {
                        address: data.address,
                        username: data.username,
                        password: data.password,
                        database: data.database,
                    } as Omit<RedisConfiguration, "channel">,
                });
            }

            toastSuccessRef.current?.publish();
            setCloseButton(true);
        } catch {
            setErrorMessages(["If you see this message, something went wrong"]);
            if (toastErrorRef.current) toastErrorRef.current.publish();
        }
    };

    const resetModal = async (): Promise<void> => {
        setCloseButton(false);
        reset();
    };

    return (
        <Modal>
            <Modal.Trigger>{children}</Modal.Trigger>
            <Modal.Content width="500px">
                <Modal.Content.Header closeButton>Create data source</Modal.Content.Header>
                <Modal.Content.Body>
                    {/* @ts-ignore */}
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                        <InputContainer>
                            <Input>
                                <Input.Label fieldId="data-source-name">Name</Input.Label>
                                <Input.Field
                                    $tag="input"
                                    id="data-source-name"
                                    max={64}
                                    {...register("name", { required: true })}
                                />
                            </Input>
                            {errors.name && errors.name.message && (
                                <ErrorMessage>
                                    <BiError size={13} />
                                    Name is required
                                </ErrorMessage>
                            )}
                        </InputContainer>

                        <Input>
                            <Input.Label fieldId="data-source-type-selector">Type</Input.Label>
                            <Select
                                value={dataSourceType}
                                defaultValue={dataSourceType}
                                onValueChange={value =>
                                    setDataSourceType(value as "REDIS" | "MQTT")
                                }
                            >
                                <Select.Item value="REDIS">Redis</Select.Item>
                                <Select.Item value="MQTT">MQTT</Select.Item>
                            </Select>
                        </Input>

                        {dataSourceType === "MQTT" && (
                            <MqttDataSourceTemplate register={register} errors={errors} />
                        )}

                        {dataSourceType === "REDIS" && (
                            <RedisDataSourceTemplate register={register} errors={errors} />
                        )}

                        <Footer>
                            {!closeButton ? (
                                <>
                                    <Button type="submit">
                                        <MdSend size={16} />
                                        Create
                                    </Button>
                                    <Modal.Content.Body.Cancel>
                                        <Button $variant="secondary">Cancel</Button>
                                    </Modal.Content.Body.Cancel>
                                </>
                            ) : (
                                <Modal.Content.Body.Action>
                                    <Button onClick={resetModal}>
                                        <MdClose size={16} />
                                        Close modal
                                    </Button>
                                </Modal.Content.Body.Action>
                            )}
                        </Footer>
                    </Form>
                </Modal.Content.Body>
            </Modal.Content>

            <Toast>
                <Toast.Content ref={toastSuccessRef} variant="success">
                    <Toast.Title>Data source created</Toast.Title>
                </Toast.Content>
            </Toast>

            <Toast>
                <Toast.Content ref={toastErrorRef} variant="error">
                    <Toast.Title>An unexpected error occurred</Toast.Title>
                    <Toast.Description>
                        {errorMessages?.map((message, index) => (
                            <span key={index} style={{ display: "block" }}>
                                - {message}
                            </span>
                        ))}
                    </Toast.Description>
                </Toast.Content>
            </Toast>
        </Modal>
    );
};

export { CreateDataSourceModal };
