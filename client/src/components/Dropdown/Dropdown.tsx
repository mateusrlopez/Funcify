import {
    Portal,
    Root,
    Trigger as RadixTrigger,
    Sub as RadixSub,
    RadioGroup as RadixRadioGroup,
} from "@radix-ui/react-dropdown-menu";
import type {
    Root as RootPropTypes,
    Sub as SubPropTypes,
    SubTrigger as SubTriggerPropTypes,
    Content as ContentPropTypes,
    SubContent as SubContentPropTypes,
    Item as ItemPropTypes,
    RadioGroup as RadioGroupPropTypes,
    ItemIndicator as ItemIndicatorPropTypes,
} from "@radix-ui/react-dropdown-menu";
import React, { ReactElement, ComponentProps, PropsWithChildren } from "react";
import { FaAngleRight } from "react-icons/fa";

import {
    StyledContent,
    StyledSubContent,
    StyledArrow,
    StyledItem,
    StyledSubTrigger,
    StyledSubTriggerArrow,
    StyledCheckboxItem,
    StyledItemIndicator,
    StyledLabel,
    StyledRadioItem,
    StyledSeparator,
    StyledView,
    StyledItemWithDescription,
} from "./Dropdown.styles";

const Dropdown = ({
    children,
    ...props
}: ComponentProps<typeof RootPropTypes> & PropsWithChildren): ReactElement => (
    <Root {...props}>{children}</Root>
);

const Sub = ({
    children,
    ...props
}: ComponentProps<typeof SubPropTypes & PropsWithChildren>): ReactElement => (
    <RadixSub {...props}>{children}</RadixSub>
);
Sub.displayName = "Sub";
Dropdown.Sub = Sub;

const Trigger = ({
    children,
    ...props
}: ComponentProps<typeof RadixTrigger & PropsWithChildren>): ReactElement => (
    <RadixTrigger asChild {...props}>
        {children}
    </RadixTrigger>
);
Trigger.displayName = "Trigger";
Dropdown.Trigger = Trigger;

const SubTrigger = ({
    children,
    ...props
}: ComponentProps<typeof SubTriggerPropTypes & PropsWithChildren>): ReactElement => (
    <StyledSubTrigger {...props}>
        {children}
        <StyledSubTriggerArrow>
            <FaAngleRight color="#FFF" />
        </StyledSubTriggerArrow>
    </StyledSubTrigger>
);
SubTrigger.displayName = "SubTrigger";
Dropdown.SubTrigger = SubTrigger;

const Content = ({
    children,
    ...props
}: ComponentProps<typeof ContentPropTypes & PropsWithChildren>): ReactElement => (
    <Portal>
        <StyledContent {...props}>
            {children}
            <StyledArrow />
        </StyledContent>
    </Portal>
);
Content.displayName = "Content";
Dropdown.Content = Content;

const SubContent = (props: ComponentProps<typeof SubContentPropTypes>): ReactElement => (
    <Portal>
        <StyledSubContent {...props} sideOffset={8} />
    </Portal>
);
SubContent.displayName = "SubContent";
Dropdown.SubContent = SubContent;

const Item = ({
    children,
    ...props
}: ComponentProps<typeof ItemPropTypes & PropsWithChildren>): ReactElement => (
    <StyledItem {...props}>{children}</StyledItem>
);
Item.displayName = "Item";
Dropdown.Item = Item;

const ItemWithDescription = ({
    children,
    ...props
}: ComponentProps<typeof ItemPropTypes & PropsWithChildren>): ReactElement => (
    <StyledItemWithDescription {...props}>{children}</StyledItemWithDescription>
);
ItemWithDescription.displayName = "ItemWithDescription";
Dropdown.ItemWithDescription = ItemWithDescription;

const View = ({ children }: PropsWithChildren): ReactElement => <StyledView>{children}</StyledView>;
View.displayName = "View";
Dropdown.View = View;

const RadioGroup = ({
    children,
    ...props
}: ComponentProps<typeof RadioGroupPropTypes & PropsWithChildren>): ReactElement => (
    <RadixRadioGroup {...props}>{children}</RadixRadioGroup>
);
RadioGroup.displayName = "RadioGroup";
Dropdown.RadioGroup = RadioGroup;

const ItemIndicator = ({
    children,
    ...props
}: ComponentProps<typeof ItemIndicatorPropTypes & PropsWithChildren>) => (
    <StyledItemIndicator {...props}>{children}</StyledItemIndicator>
);
ItemIndicator.displayName = "ItemIndicator";
Dropdown.ItemIndicator = ItemIndicator;

const CheckboxItem = StyledCheckboxItem;
CheckboxItem.displayName = "CheckboxItem";
Dropdown.CheckboxItem = CheckboxItem;

const Label = StyledLabel;
Label.displayName = "Label";
Dropdown.Label = Label;

const RadioItem = StyledRadioItem;
RadioItem.displayName = "RadioItem";
Dropdown.RadioItem = RadioItem;

const Separator = StyledSeparator;
Separator.displayName = "Separator";
Dropdown.Separator = Separator;

export { Dropdown };
