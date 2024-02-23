import { Header } from "@/app/(internal)/app/datasources/Header/Header";
import { List } from "@/app/(internal)/app/datasources/List";
import { Root, Content } from "@/app/(internal)/app/datasources/Page.styles";
import { ReactNode } from "react";

export default function Page(): ReactNode {
    return (
        <Root>
            <Content>
                <Header />
                <List />
            </Content>
        </Root>
    );
}
