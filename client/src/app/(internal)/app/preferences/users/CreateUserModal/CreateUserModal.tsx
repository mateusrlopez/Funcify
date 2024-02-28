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
import shortid from "shortid";
import { z } from "zod";

import { ErrorMessage, Form, InputContainer, Footer } from "./CreateUserModal.styles";

const createUserSchema = z.object({
    email: z.string().email().min(1, { message: "E-mail is required" }),
    password: z.string().min(8, { message: "Password needs to have at least 8 characters" }),
});

type CreateUserSchema = z.infer<typeof createUserSchema> & { role: "ADMIN" | "COMMON" };

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

const CreateUserModal = ({ open, setOpen }: Props): ReactNode => {
    const toastRef = useRef<ToastRefType>();
    const [errorMessages, setErrorMessages] = useState<Array<string> | null>(null);
    const [role, setRole] = useState<"ADMIN" | "COMMON">("COMMON");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createUserSchema),
    });
    const queryClient = useQueryClient();

    useEffect((): void => {
        if (Object.keys(errors).length > 0) {
            if (toastRef.current) toastRef.current.publish();
            setErrorMessages(Object.values(errors).map(error => error?.message) as string[]);
        }
    }, [errors]);

    const { mutateAsync: editUserModal } = useMutation({
        mutationFn: (variables: { data: CreateUserSchema }) => createUser(variables.data),
        onSuccess(_, variables) {
            queryClient.setQueryData(["users"], (data: Array<UserSchema>) => {
                const date = new Date();
                return [
                    ...data,
                    {
                        id: shortid.generate(),
                        email: variables.data.email,
                        role: variables.data.role,
                        createdAt: date.getDate(),
                    },
                ];
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
            toastRef.current?.publish();
        } catch {
            setErrorMessages(["If you see this message, something went wrong"]);
            if (toastRef.current) toastRef.current.publish();
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
                            <ErrorMessage>
                                <BiError size={13} />
                                E-mail is required
                            </ErrorMessage>
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
                            <ErrorMessage>
                                <BiError size={13} />
                                Password is required
                            </ErrorMessage>
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

export { CreateUserModal };
