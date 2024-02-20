"use client";

import { Button } from "@/components/Button";
import { ReactNode, Suspense } from "react";
import { FaCode } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

import { CreateFunctionModal } from "./CreateFunctionModal";
import { FunctionListItem } from "./FunctionListItem";
import { Root, SearchInput, FunctionList, FunctionListTitle } from "./Sidebar.styles";

const Sidebar = (): ReactNode => {
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

                <FunctionList>
                    <FunctionListTitle>
                        <FaCode size={16} />
                        Your functions
                    </FunctionListTitle>
                    <FunctionListItem id="123" name="test-heapsort-vs-bubblesort.js" />
                    <FunctionListItem id="456" name="example-01.js" />
                </FunctionList>
            </Root>
        </Suspense>
    );
};

export { Sidebar };
