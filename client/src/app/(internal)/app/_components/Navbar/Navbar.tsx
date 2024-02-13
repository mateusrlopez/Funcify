import { FuncifyLogo } from "@/assets/funcify";
import { ReactNode } from "react";

import { Links } from "./Links";
import { Root, Brand, Group } from "./Navbar.styles";
import { Notifications } from "./Notifications";
import { UserDropdown } from "./UserDropdown";

const Navbar = (): ReactNode => (
    <Root>
        <Brand>
            <FuncifyLogo fillColor="darkestCyan" width={76} height={30} />
        </Brand>
        <Links />
        <Group>
            <Notifications />
            <UserDropdown />
        </Group>
    </Root>
);

export { Navbar };
