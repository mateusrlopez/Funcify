"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { FaLaptopCode, FaUsers } from "react-icons/fa6";
import { TbCloudDataConnection } from "react-icons/tb";

import { Root, Option, Icon } from "./Links.styles";

const Links = (): ReactNode => {
    const path = usePathname();

    return (
        <Root>
            <Option href="/app/functions" data-selected={path.startsWith("/app/functions")}>
                <Icon data-selected="true">
                    <FaLaptopCode size={17} />
                </Icon>
                Functions
            </Option>
            <Option href="/app/datasources" data-selected={path.startsWith("/app/datasources")}>
                <Icon>
                    <TbCloudDataConnection size={18} />
                </Icon>
                Data Sources
            </Option>
            <Option
                href="/app/preferences/users"
                data-selected={path.startsWith("/app/preferences/users")}
            >
                <Icon>
                    <FaUsers size={16} />
                </Icon>
                Preferences
            </Option>
        </Root>
    );
};

export { Links };
