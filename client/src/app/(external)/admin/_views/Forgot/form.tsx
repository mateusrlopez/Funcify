"use client";

import { ErrorMessage, StyledForm } from "@/app/(external)/admin/styles";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiError } from "react-icons/bi";
import { z } from "zod";

const forgotSchema = z.object({
    email: z.string().email(),
});

type ForgotSchema = z.infer<typeof forgotSchema>;

const Form = (): ReactNode => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotSchema>({
        resolver: zodResolver(forgotSchema),
    });

    const onHandleSubmit: SubmitHandler<ForgotSchema> = async data => console.log(data);

    return (
        <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
            <>
                <Input>
                    <Input.Label fieldId="email">E-mail</Input.Label>
                    <Input.Field
                        tag="input"
                        id="email"
                        type="text"
                        max={64}
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

            <div style={{ marginTop: "5px" }} />
            <Button $full type="submit">
                Continue
            </Button>
        </StyledForm>
    );
};

export { Form };
