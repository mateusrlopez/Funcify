import { Header } from "@/app/(internal)/app/datasources/Header/Header";
import { List } from "@/app/(internal)/app/datasources/List";
import { Root, Content } from "@/app/(internal)/app/datasources/Page.styles";
import { ReactNode, Suspense } from "react";

export default function Page(): ReactNode {
    return (
        <Suspense>
            <Root>
                <Content>
                    <Header />
                    <List />
                </Content>
            </Root>
        </Suspense>
    );
}
