"use client";

import { Item } from "@/app/(internal)/app/preferences/users/List/Item";
import { DiamondLoader } from "@/components/Loading";
import { getAllUsers } from "@/repository/userRepository";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

import { Root, ErrorMessage } from "./List.styles";

const List = (): ReactNode => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    const { data, error, isPending } = useQuery({
        queryKey: ["users"],
        queryFn: async () => getAllUsers(),
    });

    const itemsToRender = data?.users?.filter((user: UserSchema) => {
        if (search) {
            return user.email.toLowerCase().includes(search.toLowerCase());
        }
        return true;
    });

    return (
        <Root>
            {isPending && (
                <div
                    style={{
                        width: "100%",
                        height: "calc(100vh - 120px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <DiamondLoader />
                </div>
            )}
            {!isPending && error && <ErrorMessage>An unexpected error occurred...</ErrorMessage>}
            {!isPending &&
                !error &&
                itemsToRender &&
                itemsToRender?.map(
                    (user: UserSchema): ReactNode => <Item key={user.id} {...user} />
                )}
        </Root>
    );
};

export { List };
