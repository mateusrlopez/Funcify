"use client";

import { Button } from "@/components/Button";
import { SpinnerLoader } from "@/components/Loading";
import { getAllFunctions } from "@/repository/functionRepository";
import { FunctionSchema } from "@/types/function";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useCallback } from "react";
import { FaCode } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

import { CreateFunctionModal } from "./CreateFunctionModal";
import { FunctionListItem } from "./FunctionListItem";
import {
    Root,
    SearchInput,
    FunctionList,
    FunctionListTitle,
    FunctionHeader,
    ErrorMessage,
} from "./Sidebar.styles";

const Sidebar = (): ReactNode => {
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    const { data, error, isPending } = useQuery({
        queryKey: ["getAllFunctions"],
        queryFn: async () => getAllFunctions(),
    });

    const handleSearch = useCallback(
        (value: string): void => {
            const params: URLSearchParams = new URLSearchParams(searchParams.toString());
            params.set("search", value);

            router.push(`${pathname}?${params.toString()}`);
        },
        [pathname, router, searchParams]
    );

    const itemsToRender = data?.functions.filter((fn: FunctionSchema) => {
        if (search) {
            return fn.name.toLowerCase().includes(search.toLowerCase());
        }
        return true;
    });

    return (
        <Suspense>
            <Root>
                <div style={{ padding: "10px 10px 0 10px" }}>
                    <CreateFunctionModal>
                        <Button $full>
                            <MdAdd size={20} />
                            New Function
                        </Button>
                    </CreateFunctionModal>
                </div>

                <div style={{ padding: "0 10px" }}>
                    <SearchInput>
                        <IoSearch size={20} />
                        <input name="search" onChange={e => handleSearch(e.target.value)} />
                    </SearchInput>
                </div>

                <FunctionHeader>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0 10px 0 0",
                        }}
                    >
                        <FunctionListTitle>
                            <FaCode size={16} />
                            Your functions
                        </FunctionListTitle>

                        {isPending && <SpinnerLoader />}
                    </div>
                </FunctionHeader>
                <FunctionList>
                    {!isPending && error && (
                        <div style={{ padding: "0 10px" }}>
                            <ErrorMessage>An unexpected error occurred...</ErrorMessage>
                        </div>
                    )}

                    {!isPending &&
                        !error &&
                        itemsToRender &&
                        itemsToRender?.map(func => <FunctionListItem key={func.id} {...func} />)}
                </FunctionList>
            </Root>
        </Suspense>
    );
};

export { Sidebar };
