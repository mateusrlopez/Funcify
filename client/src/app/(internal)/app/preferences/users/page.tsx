import { Header } from "@/app/(internal)/app/preferences/users/Header";
import { List } from "@/app/(internal)/app/preferences/users/List";
import { ReactNode, Suspense } from "react";

import { Root, Content } from "./Page.styles";

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
