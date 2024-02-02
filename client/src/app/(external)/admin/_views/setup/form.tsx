"use client";

import { ErrorMessage, StyledForm } from "@/app/(external)/admin/styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { BsRocketTakeoff } from "react-icons/bs";
import { z } from "zod";

const setupSchema = z
    .object({
        name: z.string().min(1, {
            message: "Name is required",
        }),
        email: z.string().email(),
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

    const onHandleSubmit: SubmitHandler<SetupSchema> = async data => console.log(data);

    return (
        <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
            <>
                <Input>
                    <Input.Label fieldId="name">Name</Input.Label>
                    <Input.Field tag="input" id="name" type="text" max={64} {...register("name")} />
                </Input>
                {errors.name && errors.name.message && (
                    <ErrorMessage>
                        <BiError size={13} />
                        {errors.name.message}
                    </ErrorMessage>
                )}
            </>

            <>
                <Input>
                    <Input.Label fieldId="email">E-mail</Input.Label>
                    <Input.Field
                        tag="input"
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

            <Button full>
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
