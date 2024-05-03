"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { Toast } from "@/components/Toast";
import { createUser } from "@/repository/userRepository";
import { UserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import shortID from "shortid";
import { z } from "zod";

import { ErrorMessage, Form, InputContainer, Footer } from "./CreateUserModal.styles";

const createUserSchema = z.object({
    email: z.string().email().min(1, { message: "Invalid email" }),
    password: z.string().min(8, { message: "Password needs to have at least 8 characters" }),
});

type CreateUserSchema = z.infer<typeof createUserSchema> & { role: "ADMIN" | "COMMON" };

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

const CreateUserModal = ({ open, setOpen }: Props): ReactNode => {
    const toastSuccessRef = useRef<ToastRefType>();
    const toastErrorRef = useRef<ToastRefType>();

    const [errorMessages, setErrorMessages] = useState<Array<string> | null>(null);
    const [role, setRole] = useState<"ADMIN" | "COMMON">("COMMON");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(createUserSchema),
    });
    const queryClient = useQueryClient();

    useEffect((): void => {
        if (Object.keys(errors).length > 0) {
            if (toastErrorRef.current) toastErrorRef.current.publish();
            setErrorMessages(Object.values(errors).map(error => error?.message) as string[]);
        }
    }, [errors]);

    const { mutateAsync: editUserModal } = useMutation({
        mutationFn: (variables: { data: CreateUserSchema }) => createUser(variables.data),
        onSuccess(_, variables) {
            queryClient.setQueryData(["users"], (data: { users: Array<UserSchema> }) => {
                const currentUsers = data.users ?? [];
                const createdAt = new Date();

                return {
                    users: [
                        ...currentUsers,
                        {
                            id: shortID.generate(),
                            email: variables.data.email,
                            role: variables.data.role,
                            createdAt,
                        },
                    ],
                };
            });
        },
    });

    const onHandleSubmit: SubmitHandler<CreateUserSchema> = async (data: {
        email: string;
        password: string;
    }): Promise<void> => {
        try {
            await editUserModal(
                {
                    data: {
                        email: data.email,
                        password: data.password,
                        role,
                    },
                },
                {}
            );

            setOpen(false);
            toastSuccessRef.current?.publish();
            reset();
        } catch (err) {
            setErrorMessages(["If you see this message, something went wrong"]);
            if (toastErrorRef.current) toastErrorRef.current.publish();
        }
    };

    return (
        <Modal open={open} onOpenChange={setOpen}>
            <Modal.Content width="500px">
                <Modal.Content.Header closeButton>Create user</Modal.Content.Header>
                <Modal.Content.Body>
                    {/* @ts-ignore */}
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                        <InputContainer>
                            <Input>
                                <Input.Label fieldId="user-email">E-mail</Input.Label>
                                <Input.Field
                                    $tag="input"
                                    id="user-email"
                                    max={64}
                                    {...register("email", { required: true })}
                                />
                            </Input>
                            {errorMessages?.includes("Invalid email") && (
                                <ErrorMessage>
                                    <BiError size={13} />
                                    Invalid e-mail
                                </ErrorMessage>
                            )}
                        </InputContainer>

                        <InputContainer>
                            <Input>
                                <Input.Label fieldId="user-password">Password</Input.Label>
                                <Input.Field
                                    $tag="input"
                                    id="user-password"
                                    max={64}
                                    {...register("password", { required: true })}
                                />
                            </Input>
                            {errorMessages?.includes(
                                "Password needs to have at least 8 characters"
                            ) && (
                                <ErrorMessage>
                                    <BiError size={13} />
                                    Password needs to have at least 8 characters
                                </ErrorMessage>
                            )}
                        </InputContainer>

                        <InputContainer>
                            <Input>
                                <Input.Label fieldId="user-role">Role</Input.Label>
                                <Select
                                    value={role}
                                    onValueChange={value => setRole(value as "ADMIN" | "COMMON")}
                                >
                                    <Select.Item value="ADMIN">Admin</Select.Item>
                                    <Select.Item value="COMMON">Common</Select.Item>
                                </Select>
                            </Input>
                        </InputContainer>

                        <Footer>
                            <Button type="submit">
                                <MdAdd size={16} />
                                Create
                            </Button>
                            <Modal.Content.Body.Cancel>
                                <Button $variant="secondary">Cancel</Button>
                            </Modal.Content.Body.Cancel>
                        </Footer>
                    </Form>
                </Modal.Content.Body>
            </Modal.Content>

            <Toast>
                <Toast.Content ref={toastSuccessRef} variant="success">
                    <Toast.Title>User created successfully</Toast.Title>
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

export { CreateUserModal };
