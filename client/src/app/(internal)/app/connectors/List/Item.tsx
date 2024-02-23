"use client";

import { Dropdown } from "@/components/Dropdown";
import { ReactNode } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { TbDots } from "react-icons/tb";

import { Root, Name, Text, Actions } from "./Item.styles";

type MQTTProps = {
    broker: string;
    qos: number;
    topic: string;
};

const MQTT = ({ broker, qos, topic }: MQTTProps): ReactNode => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Text>
            <strong>Broker:</strong> {broker}
        </Text>
        <Text>
            <strong>QOS:</strong> {qos}
        </Text>
        <Text>
            <strong>Topic:</strong> {topic}
        </Text>
    </div>
);

type RedisProps = {
    address: string;
    username: string;
    database: string;
    channel: string;
};

const Redis = ({ address, username, database, channel }: RedisProps): ReactNode => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Text>
            <strong>Address:</strong> {address}
        </Text>
        <Text>
            <strong>Username:</strong> {username}
        </Text>
        <Text>
            <strong>Database:</strong> {database}
        </Text>
        <Text>
            <strong>Channel:</strong> {channel}
        </Text>
    </div>
);

type Props = {
    type: "MQTT" | "REDIS";
    name: string;
    configuration: MQTTProps | RedisProps;
};

const Item = ({ type, name, configuration }: Props): ReactNode => (
    <Root>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Name>{name}</Name>
            <Dropdown>
                <Dropdown.Trigger>
                    <Actions>
                        <TbDots size={18} />
                    </Actions>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item>
                        <MdEdit />
                        Edit connector
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <MdDelete />
                        Delete connector
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </div>

        {type === "MQTT" ? (
            <MQTT {...(configuration as MQTTProps)} />
        ) : (
            <Redis {...(configuration as RedisProps)} />
        )}
    </Root>
);

export { Item };
