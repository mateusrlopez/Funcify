import { Header } from "@/app/(internal)/app/connectors/Header/Header";
import { List } from "@/app/(internal)/app/connectors/List";
import { Root, Content } from "@/app/(internal)/app/connectors/Page.styles";
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
