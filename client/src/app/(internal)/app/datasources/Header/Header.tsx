import { CreateDataSourceModal } from "@/app/(internal)/app/datasources/CreateDataSourceModal";
import { Button } from "@/components/Button";
import { ReactNode } from "react";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

import { Root, SearchInput } from "./Header.styles";

const Header = (): ReactNode => (
    <Root>
        <CreateDataSourceModal>
            <Button>
                <MdAdd size={20} />
                Add Connector
            </Button>
        </CreateDataSourceModal>
        <div style={{ width: "250px" }}>
            <SearchInput>
                <IoSearch size={20} />
                <input name="search" />
            </SearchInput>
        </div>
    </Root>
);

export { Header };
