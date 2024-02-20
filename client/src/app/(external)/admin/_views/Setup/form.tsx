"use client";

import { ErrorMessage, StyledForm } from "@/app/(external)/admin/styles";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Toast } from "@/components/Toast";
import { setup } from "@/repository/setupRepository";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { BsRocketTakeoff } from "react-icons/bs";
import { z } from "zod";

const setupSchema = z
    .object({
        email: z.string().email().min(1, { message: "E-mail is required" }),
        password: z.string().min(8, {
            message: "The password must contain at least 8 character(s)",
        }),
        confirmPassword: z.string().min(8, {
            message: "The password must contain at least 8 character(s)",
        }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "The passwords didn't match",
            });
        }
    });

type SetupSchema = z.infer<typeof setupSchema>;

const Form = (): ReactNode => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SetupSchema>({
        resolver: zodResolver(setupSchema),
    });

    const toastRef = useRef<ToastRefType>();

    const onHandleSubmit: SubmitHandler<SetupSchema> = async data => {
        try {
            const { email, password } = data;
            await setup(email, password);
        } catch {
            if (toastRef.current) toastRef.current.publish();
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
            <Toast>
                <Toast.Content ref={toastRef} variant="error">
                    <Toast.Title>An unexpected error occurred</Toast.Title>
                    <Toast.Description>
                        Check your environment logs to understand the problem
                    </Toast.Description>
                </Toast.Content>
            </Toast>

            <>
                <Input>
                    <Input.Label fieldId="email">E-mail</Input.Label>
                    <Input.Field
                        $tag="input"
                        id="email"
                        type="text"
                        max={64}
                        placeholder="Ex.: john.doe@example.com"
                        {...register("email")}
                    />
                </Input>
                {errors.email && errors.email.message && (
                    <ErrorMessage>
                        <BiError size={13} />
                        {errors.email.message}
                    </ErrorMessage>
                )}
            </>

            <>
                <Input>
                    <Input.Label fieldId="password">Password</Input.Label>
                    <Input.Field
                        $tag="input"
                        id="password"
                        type="password"
                        max={64}
                        {...register("password")}
                    />
                </Input>
                {errors.password && errors.password.message && (
                    <ErrorMessage>
                        <BiError size={13} />
                        {errors.password.message}
                    </ErrorMessage>
                )}
            </>

            <>
                <Input>
                    <Input.Label fieldId="confirm-password">Confirm Password</Input.Label>
                    <Input.Field
                        $tag="input"
                        id="confirm-password"
                        type="password"
                        max={64}
                        {...register("confirmPassword")}
                    />
                </Input>
                {errors.confirmPassword && errors.confirmPassword.message && (
                    <ErrorMessage>
                        <BiError size={13} />
                        {errors.confirmPassword.message}
                    </ErrorMessage>
                )}
            </>

            <div style={{ marginTop: "5px" }} />

            <Button $full>
                <span
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                    }}
                >
                    Let's go!
                    <BsRocketTakeoff />
                </span>
            </Button>
        </StyledForm>
    );
};

export { Form };
