import { Footer } from "@/app/(internal)/app/functions/Sidebar/CreateFunctionModal/CreateFunctionModal.styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Toast } from "@/components/Toast";
import { updateFunction } from "@/repository/functionRepository";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdSend } from "react-icons/md";
import { z } from "zod";

import { Form } from "./EditFunctionModal.styles";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

const editFunctionSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
});

type EditFunctionSchema = z.infer<typeof editFunctionSchema>;

const EditFunctionModal = ({
    children,
    ...props
}: PropsWithChildren<FunctionSchema & Props>): ReactNode => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editFunctionSchema),
    });

    const toastRef = useRef<ToastRefType>();
    const [errorMessages, setErrorMessages] = useState<Array<string> | null>(null);

    useEffect((): void => {
        if (Object.keys(errors).length > 0) {
            if (toastRef.current) toastRef.current.publish();
            setErrorMessages(Object.values(errors).map(error => error?.message) as string[]);
        }
    }, [errors]);

    const onHandleSubmit: SubmitHandler<EditFunctionSchema> = async data => {
        try {
            const { name } = data;
            await updateFunction(props.id, { ...props, name });
            props.setOpen(false);
            toastRef.current?.publish();
        } catch {
            setErrorMessages(["If you see this message, something went wrong"]);
            if (toastRef.current) toastRef.current.publish();
        }
    };

    return (
        <Modal open={props.open} onOpenChange={() => props.setOpen(false)}>
            <Modal.Trigger>{children}</Modal.Trigger>
            <Modal.Content width="500px">
                <Modal.Content.Header closeButton>Edit function name</Modal.Content.Header>
                <Modal.Content.Body>
                    {/* @ts-ignore */}
                    <Form onSubmit={handleSubmit(onHandleSubmit)}>
                        <Input>
                            <Input.Label fieldId="function-name">Name</Input.Label>
                            <Input.Field
                                $tag="input"
                                id="function-name"
                                defaultValue={props.name}
                                max={64}
                                {...register("name", { required: true })}
                            />
                        </Input>

                        <Footer>
                            <Button type="submit">
                                <MdSend size={16} />
                                Send
                            </Button>
                            <Button $variant="secondary" onClick={() => props.setOpen(false)}>
                                Cancel
                            </Button>
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

export { EditFunctionModal };
