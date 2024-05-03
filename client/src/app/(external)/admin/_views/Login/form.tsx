"use client";

import { StyledForm } from "@/app/(external)/admin/styles";
import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Input } from "@/components/Input/Input";
import { Loader } from "@/components/Loading/Spinner.styles";
import { Toast } from "@/components/Toast";
import { signIn } from "@/repository/authRepository";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string({ required_error: "E-mail is required" }).email({ message: "Invalid e-mail" }),
    password: z.string({ required_error: "Password is required" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Form = (): ReactNode => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();
    const toastRef = useRef<ToastRefType>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<Array<string> | null>(null);

    useEffect((): void => {
        if (Object.keys(errors).length > 0) {
            if (toastRef.current) toastRef.current.publish();
            setErrorMessages(Object.values(errors).map(error => error.message) as string[]);
        }
    }, [errors]);

    const onHandleSubmit: SubmitHandler<LoginSchema> = async data => {
        try {
            setIsLoading(true);
            const { email, password } = data;
            await signIn(email, password);
            router.push("/app/functions", { scroll: false });
        } catch (err) {
            setIsLoading(false);
            setErrorMessages(["Invalid credentials"]);
            if (toastRef.current) toastRef.current.publish();
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
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

            <Input>
                <Input.Label fieldId="email">E-mail</Input.Label>
                <Input.Field
                    $tag="input"
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
                        $tag="input"
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
                {!isLoading ? (
                    "Sign In"
                ) : (
                    <span style={{ display: "block", transform: "scale(0.7)" }}>
                        <Loader />
                    </span>
                )}
            </Button>
        </StyledForm>
    );
};

export { Form };
