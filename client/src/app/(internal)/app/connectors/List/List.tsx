import { Item } from "@/app/(internal)/app/connectors/List/Item";
import { ReactNode } from "react";

import { Root } from "./List.styles";

const List = (): ReactNode => {
    return (
        <Root>
            <Item
                type="REDIS"
                name="Redis Principal"
                configuration={{
                    address: "example.address.com",
                    username: "admin",
                    channel: "input",
                    database: "production",
                }}
            />
            <Item
                type="MQTT"
                name="MQTT Production"
                configuration={{ qos: 1, broker: "example.broker.com", topic: "EXAMPLE/TOPIC/1" }}
            />
        </Root>
    );
};

export { List };
