"use client";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { ToggleGroup } from "@/components/Toggle";
import { PropsWithChildren, ReactNode, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiFileBlank } from "react-icons/bi";
import { MdAdd, MdUploadFile } from "react-icons/md";

import {
    Form,
    Group,
    GroupTitle,
    DragNDropArea,
    Footer,
    ErrorMessage,
} from "./CreateFunctionModal.styles";

const CreateFunctionModal = ({ children }: PropsWithChildren): ReactNode => {
    const [toggle, setToggle] = useState<"scratch" | "upload">("scratch");
    const [fileUploadErrorMessage, setFileUploadErrorMessage] = useState<string>("");

    const handleToggle = (value: string) => setToggle(value as "scratch" | "upload");

    const onDrop = useCallback((acceptedFiles: File[]): void => {
        if (acceptedFiles.length > 1) {
            setFileUploadErrorMessage("Please drop only one JavaScript file");
            return;
        }

        const file: File = acceptedFiles[0];
        if (!file.type.match(/javascript/)) {
            setFileUploadErrorMessage("Please drop a JavaScript file");
            return;
        }

        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.error("file reading has failed");
        reader.onload = () => {
            const binaryStr = reader.result;
            console.log(binaryStr);
        };
        reader.readAsArrayBuffer(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Modal>
            <Modal.Trigger>{children}</Modal.Trigger>
            <Modal.Content width="500px">
                <Modal.Content.Header closeButton>Create function</Modal.Content.Header>
                <Modal.Content.Body>
                    <Form>
                        <>
                            <Input>
                                <Input.Label fieldId="create-function-name">Name</Input.Label>
                                <Input.Field $tag="input" id="create-function-name" name="name" />
                            </Input>
                            <ErrorMessage>Name is required</ErrorMessage>
                        </>

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
                                onValueChange={handleToggle}
                            />

                            {toggle === "upload" && (
                                <DragNDropArea {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <span>Drop the JS file here...</span>
                                    ) : (
                                        fileUploadErrorMessage || (
                                            <span>
                                                Drag n' drop the JS file here, or click to select it
                                            </span>
                                        )
                                    )}
                                </DragNDropArea>
                            )}
                        </Group>

                        <Footer>
                            <Modal.Content.Body.Action>
                                <Button>
                                    <MdAdd size={20} />
                                    Create
                                </Button>
                            </Modal.Content.Body.Action>
                            <Modal.Content.Body.Cancel>
                                <Button $variant="secondary">Cancel</Button>
                            </Modal.Content.Body.Cancel>
                        </Footer>
                    </Form>
                </Modal.Content.Body>
            </Modal.Content>
        </Modal>
    );
};

export { CreateFunctionModal };
