"use client";

import {
    Root as RadixRoot,
    Portal as RadixPortal,
    Trigger as RadixTrigger,
    Action as RadixAction,
    Cancel as RadixCancel,
} from "@radix-ui/react-alert-dialog";
import type {
    Root as RootPropTypes,
    Trigger as TriggerPropTypes,
} from "@radix-ui/react-alert-dialog";
import React, { ReactElement, ComponentProps, ReactNode, PropsWithChildren } from "react";
import { IoIosClose } from "react-icons/io";

import {
    Overlay,
    RadixContent,
    ContainerHeader,
    ContainerBody,
    ContainerFooter,
    CloseButton,
} from "./Modal.styles";

const Modal = ({
    children,
    ...props
}: ComponentProps<typeof RootPropTypes & PropsWithChildren>): ReactElement => (
    <RadixRoot {...props}>{children}</RadixRoot>
);

const Trigger = ({
    children,
    ...props
}: ComponentProps<typeof TriggerPropTypes & PropsWithChildren>): ReactElement => (
    <RadixTrigger asChild {...props}>
        {children}
    </RadixTrigger>
);
Trigger.displayName = "Trigger";
Modal.Trigger = Trigger;

type ContentProps = {
    width?: string;
    children: ReactNode | ReactNode[];
};
const Content = ({ children, width = "90vw" }: ContentProps): ReactElement => (
    <RadixPortal>
        <Overlay />
        <RadixContent width={width}>{children}</RadixContent>
    </RadixPortal>
);
Content.displayName = "Content";
Modal.Content = Content;

type HeaderPropTypes = {
    children: ReactNode | ReactNode[];
    closeButton?: boolean;
};

const Header = ({ children, closeButton = false }: HeaderPropTypes): ReactElement => (
    <ContainerHeader>
        {children}
        {closeButton && (
            <RadixCancel asChild>
                <CloseButton>
                    <IoIosClose size={25} />
                </CloseButton>
            </RadixCancel>
        )}
    </ContainerHeader>
);
Header.displayName = "Header";
Content.Header = Header;

const Body = ({ children }: PropsWithChildren): ReactElement => (
    <ContainerBody>{children}</ContainerBody>
);
Body.displayName = "Body";
Content.Body = Body;

const Footer = ({ children }: PropsWithChildren): ReactElement => (
    <ContainerFooter>{children}</ContainerFooter>
);
Footer.displayName = "Footer";
Content.Footer = Footer;

const Action = ({ children }: PropsWithChildren): ReactElement => (
    <RadixAction asChild>{children}</RadixAction>
);
Action.displayName = "Action";
Body.Action = Action;

const Cancel = ({ children }: PropsWithChildren): ReactElement => (
    <RadixCancel asChild>{children}</RadixCancel>
);
Cancel.displayName = "Cancel";
Body.Cancel = Cancel;

export { Modal };
