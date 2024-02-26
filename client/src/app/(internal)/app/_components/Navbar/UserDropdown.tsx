"use client";

import { Dropdown } from "@/components/Dropdown";
import { ReactElement } from "react";
import { MdExitToApp } from "react-icons/md";

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
            <Dropdown>
                <Dropdown.Trigger>
                    <User>AV</User>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Item>
                        <MdExitToApp size={16} />
                        Sign out
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown>
        </Root>
    );
};

export { UserDropdown };
