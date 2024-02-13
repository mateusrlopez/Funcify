"use client";

import type {
    Root as RootPropTypes,
    Trigger as TriggerPropTypes,
    Content as ContentPropTypes,
    Item as ItemPropTypes,
    Sub as SubPropTypes,
    SubContent as SubContentPropTypes,
    SubTrigger as SubTriggerPropTypes,
    Separator as SeparatorPropTypes,
    CheckboxItem as CheckboxPropTypes,
    Label as LabelPropTypes,
    RadioGroup as RadioGroupPropTypes,
} from "@radix-ui/react-context-menu";
import React, { ComponentProps, PropsWithChildren, ReactNode } from "react";

import {
    StyledRoot,
    StyledTrigger,
    StyledPortal,
    StyledContent,
    StyledItem,
    StyledSub,
    StyledSubContent,
    StyledSubTrigger,
    StyledSeparator,
    StyledCheckbox,
    StyledItemIndicator,
    StyledLabel,
    StyledRightSlot,
    StyledRadio,
    StyledRadioGroup,
} from "./ContextMenu.styles";

const ContextMenu = ({
    children,
    ...props
}: ComponentProps<typeof RootPropTypes> & PropsWithChildren): ReactNode => (
    <StyledRoot {...props}>{children}</StyledRoot>
);

const Trigger = ({
    children,
    ...props
}: ComponentProps<typeof TriggerPropTypes> & PropsWithChildren): ReactNode => (
    <StyledTrigger {...props}>{children}</StyledTrigger>
);
ContextMenu.Trigger = Trigger;

const Content = ({
    children,
    ...props
}: ComponentProps<typeof ContentPropTypes> & PropsWithChildren): ReactNode => (
    <StyledPortal>
        <StyledContent {...props}>{children}</StyledContent>
    </StyledPortal>
);
ContextMenu.Content = Content;

type ItemProps = ComponentProps<typeof ItemPropTypes> &
    PropsWithChildren & {
        shortcut?: string;
        sideOffset?: boolean;
    };

const Item = ({ children, shortcut, sideOffset = false, ...props }: ItemProps): ReactNode => (
    <StyledItem sideOffset={sideOffset} {...props}>
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>{children}</span>
        {shortcut && <StyledRightSlot>{shortcut}</StyledRightSlot>}
    </StyledItem>
);
ContextMenu.Item = Item;

const Label = ({
    children,
    ...props
}: ComponentProps<typeof LabelPropTypes> & PropsWithChildren): ReactNode => (
    <StyledLabel {...props}>{children}</StyledLabel>
);
ContextMenu.Label = Label;

const Sub = ({
    children,
    ...props
}: ComponentProps<typeof SubPropTypes> & PropsWithChildren): ReactNode => (
    <StyledSub {...props}>{children}</StyledSub>
);
ContextMenu.Sub = Sub;

type SubTriggerProps = ComponentProps<typeof SubTriggerPropTypes> &
    PropsWithChildren & {
        sideOffset?: boolean;
    };

const SubTrigger = ({ children, sideOffset = false, ...props }: SubTriggerProps): ReactNode => (
    <StyledSubTrigger sideOffset={sideOffset} {...props}>
        {children}
    </StyledSubTrigger>
);
ContextMenu.SubTrigger = SubTrigger;

const SubContent = ({
    children,
    ...props
}: ComponentProps<typeof SubContentPropTypes> & PropsWithChildren): ReactNode => (
    <StyledPortal>
        <StyledSubContent sideOffset={2} alignOffset={-5} {...props}>
            {children}
        </StyledSubContent>
    </StyledPortal>
);
ContextMenu.SubContent = SubContent;

const Separator = ({ ...props }: ComponentProps<typeof SeparatorPropTypes>): ReactNode => (
    <StyledSeparator {...props} />
);
ContextMenu.Separator = Separator;

type CheckboxProps = ComponentProps<typeof CheckboxPropTypes> &
    PropsWithChildren & {
        indicatorIcon: ReactNode;
    };

const Checkbox = ({ children, indicatorIcon, ...props }: CheckboxProps): ReactNode => (
    <StyledCheckbox {...props}>
        <StyledItemIndicator>{indicatorIcon}</StyledItemIndicator>
        {children}
    </StyledCheckbox>
);
ContextMenu.Checkbox = Checkbox;

type RadioProps = ComponentProps<typeof RadioGroupPropTypes> &
    PropsWithChildren & {
        radios: Array<{ content: string; value: string }>;
        indicatorIcon: ReactNode;
    };

const Radio = ({ radios, indicatorIcon, ...props }: RadioProps): ReactNode => (
    <StyledRadioGroup {...props}>
        {radios.map(radio => (
            <StyledRadio value={radio.value}>
                <StyledItemIndicator>{indicatorIcon}</StyledItemIndicator>
                {radio.content}
            </StyledRadio>
        ))}
    </StyledRadioGroup>
);
ContextMenu.Radio = Radio;

export { ContextMenu };
