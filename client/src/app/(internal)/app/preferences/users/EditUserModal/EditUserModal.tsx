"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { Toast } from "@/components/Toast";
import { updateUser } from "@/repository/userRepository";
import { UserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import { z } from "zod";

import { ErrorMessage, Form, InputContainer, Footer } from "./EditUserModal.styles";

const editUserSchema = z.object({
    email: z.string().email().min(1, { message: "Invalid email" }),
});

type EditUserSchema = z.infer<typeof editUserSchema> & { role: "ADMIN" | "COMMON" };

type Props = UserSchema & {
    open: boolean;
    setOpen: (value: boolean) => void;
};

const EditUserModal = ({ open, setOpen, ...props }: Props): ReactNode => {
    const toastRef = useRef<ToastRefType>();
    const [errorMessages, setErrorMessages] = useState<Array<string> | null>(null);
    const [role, setRole] = useState<"ADMIN" | "COMMON">(props.role);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editUserSchema),
    });
    const queryClient = useQueryClient();

    useEffect((): void => {
        if (Object.keys(errors).length > 0) {
            if (toastRef.current) toastRef.current.publish();
            setErrorMessages(Object.values(errors).map(error => error?.message) as string[]);
        }
    }, [errors]);

    const { mutateAsync: editUserModal } = useMutation({
        mutationFn: (variables: { id: string; data: EditUserSchema }) =>
            updateUser(variables.id, variables.data),
        onSuccess(_, variables) {
            queryClient.setQueryData(["users"], (data: Array<UserSchema>) => [
                ...data,
                {
                    id: props.id,
                    email: variables.data.email,
                    role: variables.data.role,
                    createdAt: props.createdAt,
                },
            ]);
        },
    });

    const onHandleSubmit: SubmitHandler<EditUserSchema> = async (data: {
        email: string;
    }): Promise<void> => {
        try {
            await editUserModal(
                {
                    id: props.id,
                    data: {
                        email: data.email,
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
                <Modal.Content.Header closeButton>Edit user e-mail</Modal.Content.Header>
                <Modal.Content.Body>
                    {/* @ts-ignore */}
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                        <InputContainer>
                            <Input>
                                <Input.Label fieldId="user-email">E-mail</Input.Label>
                                <Input.Field
                                    $tag="input"
                                    id="user-email"
                                    defaultValue={props.email}
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
                                <MdSend size={16} />
                                Send
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

export { EditUserModal };
