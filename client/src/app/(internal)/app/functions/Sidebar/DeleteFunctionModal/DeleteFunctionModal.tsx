import { Footer } from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/CreateFunctionModal.styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { deleteFunction } from "@/repository/functionRepository";
import { FunctionSchema } from "@/types/function";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, PropsWithChildren, ReactNode, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

const DeleteFunctionModal = ({
    children,
    ...props
}: PropsWithChildren<FunctionSchema & Props>): ReactNode => {
    const queryClient = useQueryClient();
    const toastErrorRef = useRef<ToastRefType>();

    const [inputValue, setInputValue] = useState("");
    const [toastContent, setToastContent] = useState({ title: "", message: "" });

    const { mutateAsync: deleteFunctionFn } = useMutation({
        mutationFn: deleteFunction,
        onSuccess(_, variables) {
            queryClient.setQueryData(
                ["functions"],
                (data: { functions: Array<FunctionSchema> }) => {
                    const { functions } = data;
                    const newFunctions = functions.filter(item => item.id !== variables);
                    return { functions: newFunctions };
                }
            );
        },
    });

    const onHandleSubmit = async (): Promise<void> => {
        try {
            await deleteFunctionFn(props.id);
            setToastContent({
                title: "Function deleted",
                message: `The function "${props.name}" was deleted`,
            });
        } catch {
            setToastContent({
                title: "An error occurred",
                message: `The function "${props.name}" could not be deleted`,
            });
            toastErrorRef.current?.publish();
        }
    };

    return (
        <Modal open={props.open} onOpenChange={() => props.setOpen(false)}>
            <Modal.Trigger>{children}</Modal.Trigger>
            <Modal.Content width="500px">
                <Modal.Content.Header closeButton>Delete function</Modal.Content.Header>
                <Modal.Content.Body>
                    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                        <Input>
                            <Input.Label fieldId="delete-function-name">
                                Type {`"${props.name}"`} to delete it
                            </Input.Label>
                            <Input.Field
                                $tag="input"
                                id="delete-function-name"
                                name="name"
                                value={inputValue}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setInputValue(e.target.value)
                                }
                            />
                        </Input>

                        <Footer>
                            <Button disabled={inputValue !== props.name} onClick={onHandleSubmit}>
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
                <Toast.Content ref={toastErrorRef} variant="error">
                    <Toast.Title>{toastContent.title}</Toast.Title>
                    <Toast.Description>{toastContent.message}</Toast.Description>
                </Toast.Content>
            </Toast>
        </Modal>
    );
};

export { DeleteFunctionModal };
