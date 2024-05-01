"use client";

import { Dropdown } from "@/components/Dropdown";
import { Toast } from "@/components/Toast";
import { signOut } from "@/repository/authRepository";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactElement, useRef } from "react";
import { MdExitToApp } from "react-icons/md";

import { Root, Column, Text, User } from "./UserDropdown.styles";

const UserDropdown = (): ReactElement => {
    const router = useRouter();
    const toastRef = useRef<ToastRefType>();

    const { mutateAsync: signOutFn } = useMutation({
        mutationFn: signOut,
        onSuccess() {
            // TODO - Cleanup Cookie
        },
    });

    const onHandleSignOut = async (): Promise<void> => {
        try {
            await signOutFn();
            router.push("/admin", { scroll: false });
        } catch {
            toastRef.current?.publish();
        }
    };

    return (
        <Root>
            <Column>
                {/* TODO - Use /me data */}
                <Text $fontSize="sm" $fontWeight="bold">
                    Anthony Vinicius
                </Text>
                <Text $fontSize="xs" $fontWeight="medium">
                    Access Type: COMMON
                </Text>
            </Column>
            <Dropdown>
                <Dropdown.Trigger>
                    <User>AV</User>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item onClick={onHandleSignOut}>
                        <MdExitToApp size={16} />
                        Sign out
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>

            <Toast>
                <Toast.Content ref={toastRef} variant="error">
                    <Toast.Title>Error</Toast.Title>
                    <Toast.Description>An unexpected error occurred.</Toast.Description>
                </Toast.Content>
            </Toast>
        </Root>
    );
};

export { UserDropdown };
