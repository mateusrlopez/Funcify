import { ReactElement } from "react";

import { Root, Column, Text, User } from "./UserDropdown.styles";

const UserDropdown = (): ReactElement => {
    return (
        <Root>
            <Column>
                <Text $fontSize="sm" $fontWeight="bold">
                    Anthony Vinicius
                </Text>
                <Text $fontSize="xs" $fontWeight="medium">
                    03/02/2024 13:45
                </Text>
            </Column>
            <User>AV</User>
        </Root>
    );
};

export { UserDropdown };
