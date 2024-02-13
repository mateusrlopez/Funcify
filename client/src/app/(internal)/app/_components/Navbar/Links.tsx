import { ReactNode } from "react";
import { FaLaptopCode, FaUsers } from "react-icons/fa6";
import { TbCloudDataConnection } from "react-icons/tb";

import { Root, Option, Icon } from "./Links.styles";

const Links = (): ReactNode => (
    <Root>
        <Option href="/app/functions">
            <Icon>
                <FaLaptopCode size={17} />
            </Icon>
            Functions
        </Option>
        <Option href="/app/connectors">
            <Icon>
                <TbCloudDataConnection size={18} />
            </Icon>
            Connectors
        </Option>
        <Option href="/app/preferences/users">
            <Icon>
                <FaUsers size={16} />
            </Icon>
            Preferences
        </Option>
    </Root>
);

export { Links };
