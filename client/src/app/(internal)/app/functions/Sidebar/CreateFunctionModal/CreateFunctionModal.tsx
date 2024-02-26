"use client";

import { DragNDrop } from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/DragNDrop";
import { MqttDataSourceTemplate } from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/MqttDataSourceTemplate";
import { RedisDataSourceTemplate } from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/RedisDataSourceTemplate";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { Toast } from "@/components/Toast";
import { ToggleGroup } from "@/components/Toggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError, BiFileBlank } from "react-icons/bi";
import { MdSend, MdUploadFile } from "react-icons/md";
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
        .default("mainn"),
    inputConnectorID: z.string().min(1, { message: "Input connector is required" }),
    outputConnectorID: z.string().min(1, { message: "Output connector is required" }),
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
    const [toggle, setToggle] = useState<"scratch" | "upload">("scratch");
    const toastRef = useRef<ToastRefType>();

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
                            <GroupTitle>Code</GroupTitle>
                            <ToggleGroup
                                type="single"
                                defaultValue={toggle}
                                toggles={[
                                    {
                                        value: (
                                            <span
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "7px",
                                                }}
                                            >
                                                <BiFileBlank size={16} />
                                                From scratch
                                            </span>
                                        ),
                                        key: "scratch",
                                    },
                                    {
                                        value: (
                                            <span
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "7px",
                                                }}
                                            >
                                                <MdUploadFile size={16} />
                                                Upload a JS file
                                            </span>
                                        ),
                                        key: "upload",
                                    },
                                ]}
                                onValueChange={value => setToggle(value as "scratch" | "upload")}
                            />

                            {toggle === "upload" && (
                                <>
                                    <DragNDrop />
                                    <InputContainer>
                                        <Input>
                                            <Input.Label fieldId="create-function-method-to-execute">
                                                Method to execute
                                            </Input.Label>
                                            <Input.Field
                                                $tag="input"
                                                id="create-function-method-to-execute"
                                                placeholder="e.g. main"
                                                {...register("methodToExecute")}
                                            />
                                        </Input>
                                        {errors.methodToExecute &&
                                            errors.methodToExecute.message && (
                                                <ErrorMessage>
                                                    <BiError size={13} />
                                                    {errors.methodToExecute.message}
                                                </ErrorMessage>
                                            )}
                                    </InputContainer>
                                </>
                            )}
                        </Group>

                        <Group>
                            <GroupTitle>Data Source</GroupTitle>

                            <Input>
                                <Input.Label fieldId="input-connector-id">
                                    Input Connector
                                </Input.Label>
                                <Select {...register("inputConnectorID")}>
                                    <Select.Item value="mqtt">MQTT Example 1</Select.Item>
                                    <Select.Item value="redis">Redis Connection 1</Select.Item>
                                </Select>
                                {errors.inputConnectorID && errors.inputConnectorID.message && (
                                    <ErrorMessage>
                                        <BiError size={13} />
                                        {errors.inputConnectorID.message}
                                    </ErrorMessage>
                                )}
                            </Input>

                            <RedisDataSourceTemplate register={register} />

                            <hr style={{ width: "20%" }} />

                            <Input>
                                <Input.Label fieldId="output-connector-id">
                                    Output Connector
                                </Input.Label>
                                <Select {...register("outputConnectorID")}>
                                    <Select.Item value="mqtt">MQTT Example 1</Select.Item>
                                    <Select.Item value="redis">Redis Connection 1</Select.Item>
                                </Select>
                                {errors.outputConnectorID && errors.outputConnectorID.message && (
                                    <ErrorMessage>
                                        <BiError size={13} />
                                        {errors.outputConnectorID.message}
                                    </ErrorMessage>
                                )}
                            </Input>

                            <MqttDataSourceTemplate register={register} />
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
