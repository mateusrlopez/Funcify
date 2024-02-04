import { Links } from "@/app/(internal)/app/_components/navbar/links";
import { Notifications } from "@/app/(internal)/app/_components/navbar/notifications";
import { UserDropdown } from "@/app/(internal)/app/_components/navbar/userDropdown";
import { FuncifyLogo } from "@/assets/funcify";
import { ReactNode } from "react";

import { Root, Brand, Group } from "./index.styles";

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
