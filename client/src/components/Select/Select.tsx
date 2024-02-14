import {
    Value as SelectValue,
    Group as SelectGroup,
    ItemText as SelectItemText,
} from "@radix-ui/react-select";
import type { Root as RootPropTypes } from "@radix-ui/react-select";
import React, { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import {
    StyledRoot,
    StyledLabel,
    StyledItem,
    StyledContent,
    StyledSeparator,
    StyledIcon,
    StyledScrollDownButton,
    StyledScrollUpButton,
    StyledTrigger,
    StyledViewport,
} from "./Select.styles";

const Select = ({
    children,
    ...props
}: ComponentProps<typeof RootPropTypes> & PropsWithChildren): ReactNode => (
    <StyledRoot {...props}>
        <StyledTrigger>
            <SelectValue />
            <StyledIcon>
                <FaAngleDown size={16} />
            </StyledIcon>
        </StyledTrigger>
        <StyledContent>
            <StyledScrollUpButton>
                <FaAngleUp />
            </StyledScrollUpButton>
            <StyledViewport>{children}</StyledViewport>
            <StyledScrollDownButton>
                <FaAngleDown />
            </StyledScrollDownButton>
        </StyledContent>
    </StyledRoot>
);

type ItemPropTypes = PropsWithChildren & {
    value: string;
};

const Item = ({ value, children }: ItemPropTypes): ReactNode => (
    <StyledItem value={value}>
        <SelectItemText>{children}</SelectItemText>
    </StyledItem>
);
Item.displayName = "SelectItem";
Select.Item = Item;

type GroupPropTypes = PropsWithChildren & {
    label: string;
};

const Group = ({ label, children }: GroupPropTypes): ReactNode => (
    <SelectGroup>
        <StyledLabel>{label}</StyledLabel>
        {children}
    </SelectGroup>
);
Group.displayName = "Group";
Select.Group = Group;

const Separator = (): ReactNode => <StyledSeparator />;
Separator.displayName = "Separator";
Select.Separator = Separator;

export { Select };
