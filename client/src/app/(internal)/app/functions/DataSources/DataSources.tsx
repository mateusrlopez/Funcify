"use client";

import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { ReactNode, useState } from "react";
import { BsRocketTakeoff } from "react-icons/bs";
import { MdOutput } from "react-icons/md";

import {
    Root,
    Header,
    Title,
    Body,
    Form,
    DatasourceButton,
    DatasourceContent,
    DatasourceSectionTitle,
} from "./DataSources.styles";

const DataSources = (): ReactNode => {
    const [dataSource, setDataSource] = useState<"input" | "output">("input");

    const [eventInSource, setEventInSource] = useState("redis");
    const [eventOutSource, setEventOutSource] = useState("redis");

    return (
        <Root>
            <Header>
                <Title>Data Sources</Title>
            </Header>
            <Body>
                <DatasourceButton onClick={() => setDataSource("input")}>
                    <MdOutput size={16} />
                    Event-in
                </DatasourceButton>
                <DatasourceContent $visible={dataSource === "input"}>
                    <Form>
                        <DatasourceSectionTitle>Source</DatasourceSectionTitle>
                        <Select value={eventInSource} onValueChange={setEventInSource}>
                            <Select.Item value="redis">Redis</Select.Item>
                            <Select.Item value="mqtt">MQTT</Select.Item>
                        </Select>
                        <br />
                        <DatasourceSectionTitle>Configuration</DatasourceSectionTitle>
                        {/* {VIEW[eventInSource as keyof typeof VIEW]} */}
                        <Button $full>
                            <BsRocketTakeoff />
                            Save connector
                        </Button>
                    </Form>
                </DatasourceContent>

                <DatasourceButton onClick={() => setDataSource("output")}>
                    <span style={{ transform: "rotate(180deg)", marginTop: "-2px" }}>
                        <MdOutput size={16} />
                    </span>
                    Event-out
                </DatasourceButton>
                <DatasourceContent $visible={dataSource === "output"}>
                    <Form>
                        <DatasourceSectionTitle>Source</DatasourceSectionTitle>
                        <Select value={eventOutSource} onValueChange={setEventOutSource}>
                            <Select.Item value="redis">Redis</Select.Item>
                            <Select.Item value="mqtt">MQTT</Select.Item>
                        </Select>
                        <br />
                        <DatasourceSectionTitle>Configuration</DatasourceSectionTitle>
                        {/* {VIEW[eventOutSource as keyof typeof VIEW]} */}
                        <Button $full>
                            <BsRocketTakeoff />
                            Save connector
                        </Button>
                    </Form>
                </DatasourceContent>
            </Body>
        </Root>
    );
};

export { DataSources };
