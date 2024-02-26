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
import { MdSend } from "react-icons/md";
import shortid from "shortid";
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
    const toastRef = useRef<ToastRefType>();
    const [dataSourceType, setDataSourceType] = useState<"REDIS" | "MQTT">("REDIS");
    const [errorMessages, setErrorMessages] = useState<Array<string> | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(dataSourceSchemas[dataSourceType].merge(createDataSourceSchema)),
    });
    const queryClient = useQueryClient();

    useEffect((): void => {
        if (Object.keys(errors).length > 0) {
            if (toastRef.current) toastRef.current.publish();
            setErrorMessages(Object.values(errors).map(error => error?.message) as string[]);
        }
    }, [errors]);

    const { mutateAsync: createDataSourceFn } = useMutation({
        mutationFn: createDataSource,
        onSuccess(_, variables) {
            queryClient.setQueryData(["dataSources"], (data: Array<DataSourceSchema>) => [
                ...data,
                {
                    id: shortid.generate(),
                    ...variables,
                },
            ]);
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

            toastRef.current?.publish();
        } catch {
            setErrorMessages(["If you see this message, something went wrong"]);
            if (toastRef.current) toastRef.current.publish();
        }
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
                            <ErrorMessage>
                                <BiError size={13} />
                                Name is required
                            </ErrorMessage>
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
                            <MqttDataSourceTemplate register={register} />
                        )}

                        {dataSourceType === "REDIS" && (
                            <RedisDataSourceTemplate register={register} />
                        )}

                        <Footer>
                            <Button type="submit">
                                <MdSend size={16} />
                                Create
                            </Button>
                            <Modal.Content.Body.Cancel>
                                <Button>Cancel</Button>
                            </Modal.Content.Body.Cancel>
                        </Footer>
                    </Form>
                </Modal.Content.Body>
            </Modal.Content>

            <Toast>
                <Toast.Content ref={toastRef} variant="error">
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
