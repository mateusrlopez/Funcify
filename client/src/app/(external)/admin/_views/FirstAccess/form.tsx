"use client";

import { ErrorMessage, StyledForm } from "@/app/(external)/admin/styles";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { BsRocketTakeoff } from "react-icons/bs";
import { z } from "zod";

const firstAccessSchema = z
    .object({
        password: z.string().min(8, {
            message: "The password must contain at least 8 character(s)",
        }),
        confirmPassword: z.string().min(8, {
            message: "The password must contain at least 8 character(s)",
        }),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                path: ["confirmPassword"],
                message: "The passwords didn't match",
            });
        }
    });

type FirstAccessSchema = z.infer<typeof firstAccessSchema>;

const Form = (): ReactNode => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FirstAccessSchema>({
        resolver: zodResolver(firstAccessSchema),
    });

    const onHandleSubmit: SubmitHandler<FirstAccessSchema> = async data => console.log(data);

    return (
        <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
            <>
                <Input>
                    <Input.Label fieldId="password">Password</Input.Label>
                    <Input.Field
                        tag="input"
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
                        tag="input"
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

            <Button $full type="submit">
                <span
                    style={{
                        width: "100%",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                    }}
                >
                    Access the Platform!
                    <BsRocketTakeoff />
                </span>
            </Button>
        </StyledForm>
    );
};

export { Form };
