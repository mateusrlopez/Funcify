import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { ChangeEvent, PropsWithChildren, ReactNode, useState } from "react";
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
    const [inputValue, setInputValue] = useState("");

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
                            <Button disabled={inputValue !== props.name}>
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
        </Modal>
    );
};

export { DeleteDataSourceModal };
