import { PropsWithChildren, ReactNode } from "react";

import { Root, Image, Content } from "./styles";

const Panel = ({ children }: PropsWithChildren): ReactNode => (
    <Root>
        <Image />
        <Content>{children}</Content>
    </Root>
);

export { Panel };
