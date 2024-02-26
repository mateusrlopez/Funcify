"use client";

import { CreateDataSourceModal } from "@/app/(internal)/app/datasources/CreateDataSourceModal";
import { Button } from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useCallback } from "react";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { TbCloudDataConnection } from "react-icons/tb";

import { Root, Content, Title, SearchInput } from "./Header.styles";

const Header = (): ReactNode => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

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
                    <TbCloudDataConnection size={20} />
                    Data Sources
                </Title>
            </Content>
            <Content>
                <CreateDataSourceModal>
                    <Button>
                        <MdAdd size={20} />
                        Add Connector
                    </Button>
                </CreateDataSourceModal>
                <div style={{ width: "250px" }}>
                    <SearchInput>
                        <IoSearch size={20} />
                        <input name="search" onChange={e => handleSearch(e.target.value)} />
                    </SearchInput>
                </div>
            </Content>
        </Root>
    );
};

export { Header };
