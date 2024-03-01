"use client";

import { Button } from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

import { CreateUserModal } from "../CreateUserModal";
import { Root, Content, Title, SearchInput } from "./Header.styles";

const Header = (): ReactNode => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

    const handleSearch = useCallback(
        (value: string): void => {
            const params: URLSearchParams = new URLSearchParams(searchParams.toString());
            params.set("search", value);

            router.push(`${pathname}?${params.toString()}`);
        },
        [pathname, router, searchParams]
    );

    return (
        <Root>
            <Content>
                <Title>
                    <FaUsers size={18} />
                    Preferences / Users
                </Title>
            </Content>
            <Content>
                <Button onClick={() => setCreateModalOpen(true)}>
                    <MdAdd size={20} />
                    Add User
                </Button>
                <div style={{ width: "250px" }}>
                    <SearchInput>
                        <IoSearch size={20} />
                        <input name="search" onChange={e => handleSearch(e.target.value)} />
                    </SearchInput>
                </div>
            </Content>
            <CreateUserModal open={createModalOpen} setOpen={setCreateModalOpen} />
        </Root>
    );
};

export { Header };
