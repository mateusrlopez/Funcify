import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { deleteUser } from "@/repository/userRepository";
import { UserSchema } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, PropsWithChildren, ReactNode, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";

import { Footer } from "./DeleteUserModal.styles";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

const DeleteUserModal = ({
    children,
    ...props
}: PropsWithChildren<UserSchema & Props>): ReactNode => {
    const queryClient = useQueryClient();
    const toastRef = useRef<ToastRefType>();

    const [inputValue, setInputValue] = useState("");
    const [toastContent, setToastContent] = useState({ title: "", message: "" });

    const { mutateAsync: deleteUserFn } = useMutation({
        mutationFn: deleteUser,
        onSuccess(_, variables) {
            queryClient.setQueryData(["users"], (data: Array<UserSchema>) =>
                data.filter(user => user.id !== variables)
            );
        },
    });

    const onHandleSubmit = async (): Promise<void> => {
        try {
            await deleteUserFn(props.id);
            setToastContent({
                title: "User deleted",
                message: `The user "${props.email}" was deleted`,
            });
            toastRef.current?.publish();
        } catch {
            setToastContent({
                title: "An error occurred",
                message: `The user "${props.email}" could not be deleted`,
            });
            toastRef.current?.publish();
        }
    };

    return (
        <Modal open={props.open} onOpenChange={() => props.setOpen(false)}>
            <Modal.Trigger>{children}</Modal.Trigger>
            <Modal.Content width="500px">
                <Modal.Content.Header closeButton>Delete user</Modal.Content.Header>
                <Modal.Content.Body>
                    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                        <Input>
                            <Input.Label fieldId="delete-function-name">
                                Type {`"${props.email}"`} to delete it
                            </Input.Label>
                            <Input.Field
                                $tag="input"
                                id="delete-data-source-name"
                                name="name"
                                value={inputValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setInputValue(e.target.value)
                                }
                            />
                        </Input>

                        <Footer>
                            <Button disabled={inputValue !== props.email} onClick={onHandleSubmit}>
                                <MdDelete size={20} />
                                Delete
                            </Button>
                            <Modal.Content.Body.Cancel>
                                <Button $variant="secondary">Cancel</Button>
                            </Modal.Content.Body.Cancel>
                        </Footer>
                    </div>
                </Modal.Content.Body>
            </Modal.Content>

            <Toast>
                <Toast.Content ref={toastRef} variant="error">
                    <Toast.Title>{toastContent.title}</Toast.Title>
                    <Toast.Description>{toastContent.message}</Toast.Description>
                </Toast.Content>
            </Toast>
        </Modal>
    );
};

export { DeleteUserModal };
