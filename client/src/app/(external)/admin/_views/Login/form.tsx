"use client";

import { StyledForm } from "@/app/(external)/admin/styles";
import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Input } from "@/components/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Form = (): ReactNode => {
    const { register, handleSubmit } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onHandleSubmit: SubmitHandler<LoginSchema> = async data => console.log(data);

    return (
        <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
            <Input>
                <Input.Label fieldId="email">E-mail</Input.Label>
                <Input.Field
                    tag="input"
                    id="email"
                    type="text"
                    max={64}
                    {...register("email", { required: true })}
                />
            </Input>

            <>
                <Input>
                    <Input.Label fieldId="password">Password</Input.Label>
                    <Input.Field
                        tag="input"
                        id="password"
                        type="password"
                        max={64}
                        {...register("password", { required: true })}
                    />
                </Input>
                <Checkbox id="remember-me" label="Remember me" />
            </>

            <div style={{ marginTop: "5px" }} />
            <Button $full type="submit">
                Sign In
            </Button>
        </StyledForm>
    );
};

export { Form };
