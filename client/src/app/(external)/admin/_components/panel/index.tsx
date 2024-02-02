import { PropsWithChildren, ReactElement } from "react";

import { Root, Image, Content } from "./styles";

const Panel = ({ children }: PropsWithChildren): ReactElement => (
    <Root>
        <Image />
        <Content>{children}</Content>
    </Root>
);

export { Panel };
