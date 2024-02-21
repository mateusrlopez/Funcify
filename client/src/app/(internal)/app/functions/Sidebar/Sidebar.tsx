"use client";

import { Button } from "@/components/Button";
import { SpinnerLoader } from "@/components/Loading";
import { getAllFunctions } from "@/repository/functionRepository";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";
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
} from "./Sidebar.styles";

const Sidebar = (): ReactNode => {
    const { data, error, isPending } = useQuery({
        queryKey: ["getAllFunctions"],
        queryFn: async () => getAllFunctions(),
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
                        <input name="search" />
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
                    {!error &&
                        !isPending &&
                        data?.functions?.map(func => <FunctionListItem key={func.id} {...func} />)}
                </FunctionList>
            </Root>
        </Suspense>
    );
};

export { Sidebar };
