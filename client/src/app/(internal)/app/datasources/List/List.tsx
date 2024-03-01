"use client";

import { Item } from "@/app/(internal)/app/datasources/List/Item";
import { DiamondLoader } from "@/components/Loading";
import { getAllDataSources } from "@/repository/dataSourcesRepository";
import { DataSourceSchema } from "@/types/dataSource";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

import { Root, ErrorMessage } from "./List.styles";

const List = (): ReactNode => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search");

    const { data, error, isPending } = useQuery({
        queryKey: ["dataSources"],
        queryFn: async () => getAllDataSources(),
    });

    const itemsToRender = data?.dataSources.filter((dataSource: DataSourceSchema) => {
        if (search) {
            return dataSource.name.toLowerCase().includes(search.toLowerCase());
        }
        return true;
    });

    return (
        <Root>
            {isPending && (
                <div
                    style={{
                        width: "100%",
                        height: "calc(100vh - 120px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <DiamondLoader />
                </div>
            )}

            {!isPending && error && <ErrorMessage>An unexpected error occurred...</ErrorMessage>}

            {!isPending && !error && !data && (
                <ErrorMessage>Create your first datasource right now!</ErrorMessage>
            )}

            {!isPending &&
                !error &&
                itemsToRender &&
                itemsToRender?.map((dataSource: DataSourceSchema): ReactNode => {
                    if (dataSource.type === "MQTT")
                        return (
                            <Item
                                key={dataSource.id}
                                id={dataSource.id}
                                type="MQTT"
                                name={dataSource.name}
                                configuration={dataSource.configuration}
                            />
                        );

                    if (dataSource.type === "REDIS")
                        return (
                            <Item
                                key={dataSource.id}
                                id={dataSource.id}
                                type="REDIS"
                                name={dataSource.name}
                                configuration={dataSource.configuration}
                            />
                        );

                    return <div />;
                })}
        </Root>
    );
};

export { List };
