"use client";

import { Dropdown } from "@/components/Dropdown";
import { Toast } from "@/components/Toast";
import { signOut } from "@/repository/authRepository";
import { getMe } from "@/repository/userRepository";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ReactElement, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

import { Root, Column, Text, User } from "./UserDropdown.styles";

const UserDropdown = (): ReactElement => {
    const router = useRouter();
    const toastRef = useRef<ToastRefType>();

    const { data } = useQuery({
        queryKey: ["getMe"],
        queryFn: async () => getMe(),
    });

    const { mutateAsync: signOutFn } = useMutation({
        mutationFn: signOut,
        onSuccess: async () => {
            Cookies.remove("session");
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
                <Text $fontSize="sm" $fontWeight="bold">
                    {data?.email ?? "Funcify User"}
                </Text>
                <Text $fontSize="xs" $fontWeight="medium">
                    Access Type: {data?.role ?? "COMMON"}
                </Text>
            </Column>
            <Dropdown>
                <Dropdown.Trigger>
                    <User>
                        <FaUser size={14} />
                    </User>
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
