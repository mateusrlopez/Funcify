import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { deleteDataSource } from "@/repository/dataSourcesRepository";
import { DataSourceSchema } from "@/types/dataSource";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, PropsWithChildren, ReactNode, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";

import { Footer } from "./DeleteDataSourceModal.styles";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

const DeleteDataSourceModal = ({
    children,
    ...props
}: PropsWithChildren<DataSourceSchema & Props>): ReactNode => {
    const queryClient = useQueryClient();
    const toastRef = useRef<ToastRefType>();

    const [inputValue, setInputValue] = useState("");
    const [toastContent, setToastContent] = useState({ title: "", message: "" });

    const { mutateAsync: deleteDataSourceFn } = useMutation({
        mutationFn: deleteDataSource,
        onSuccess(_, variables) {
            queryClient.setQueryData(["dataSources"], (data: Array<DataSourceSchema>) =>
                data.filter(dataSource => dataSource.id !== variables)
            );
        },
    });

    const onHandleSubmit = async (): Promise<void> => {
        try {
            await deleteDataSourceFn(props.id);
            setToastContent({
                title: "Data source deleted",
                message: `The data source "${props.name}" was deleted`,
            });
            toastRef.current?.publish();
        } catch {
            setToastContent({
                title: "An error occurred",
                message: `The data source "${props.name}" could not be deleted`,
            });
            toastRef.current?.publish();
        }
    };

    return (
        <Modal open={props.open} onOpenChange={() => props.setOpen(false)}>
            <Modal.Trigger>{children}</Modal.Trigger>
            <Modal.Content width="500px">
                <Modal.Content.Header closeButton>Delete data source</Modal.Content.Header>
                <Modal.Content.Body>
                    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                        <Input>
                            <Input.Label fieldId="delete-function-name">
                                Type {`"${props.name}"`} to delete it
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
                <Toast.Content ref={toastRef} variant="error">
                    <Toast.Title>{toastContent.title}</Toast.Title>
                    <Toast.Description>{toastContent.message}</Toast.Description>
                </Toast.Content>
            </Toast>
        </Modal>
    );
};

export { DeleteDataSourceModal };
