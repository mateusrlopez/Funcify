import type {
    Provider as ProviderPropTypes,
    Root as RootPropTypes,
    Title as TitlePropTypes,
    Description as DescriptionPropTypes,
    Action as ActionPropTypes,
} from "@radix-ui/react-toast";
import React, { ComponentProps, PropsWithChildren, ReactElement } from "react";
import { BsLightningCharge } from "react-icons/bs";
import { MdCancel, MdCheckCircle, MdClose, MdInfo, MdWarning } from "react-icons/md";

import {
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastRoot,
    ToastIcon,
    ToastTitle,
    ToastViewport,
} from "./Toast.styles";

export const VARIANTS_CONFIG = {
    generic: {
        icon: <BsLightningCharge size={24} color="#1C2024" />,
    },
    success: {
        icon: <MdCheckCircle size={24} color="#1C2024" />,
    },
    warning: {
        icon: <MdWarning size={24} color="#E54D2E" />,
    },
    error: {
        icon: <MdCancel size={24} color="#D13415" />,
    },
    info: {
        icon: <MdInfo size={24} color="#1C2024" />,
    },
};

const Toast = ({
    children,
    ...props
}: PropsWithChildren<ComponentProps<typeof ProviderPropTypes>>): ReactElement => {
    return (
        <ToastProvider swipeDirection="right" {...props}>
            {children}
            <ToastViewport />
        </ToastProvider>
    );
};

interface IContentProps {
    variant?: "generic" | "success" | "warning" | "error" | "info";
}

const Content = React.forwardRef(
    (
        {
            children,
            variant = "generic",
            ...props
        }: PropsWithChildren<ComponentProps<typeof RootPropTypes> & IContentProps>,
        forwardedRef
    ) => {
        const [open, setOpen] = React.useState(false);

        React.useImperativeHandle(forwardedRef, () => ({
            publish: () => setOpen(true),
        }));

        return (
            <ToastRoot {...props} open={open} onOpenChange={setOpen} duration={3000}>
                <ToastIcon>{VARIANTS_CONFIG[variant].icon}</ToastIcon>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                        width: "calc(100% - 90px)",
                    }}
                >
                    {children}
                </div>

                <ToastClose onChange={() => setOpen(false)}>
                    <MdClose color="#FFF" />
                </ToastClose>
            </ToastRoot>
        );
    }
);
Content.displayName = "Content";
Toast.Content = Content;

const Action = ({
    children,
    ...props
}: PropsWithChildren<ComponentProps<typeof ActionPropTypes>>): ReactElement => (
    <ToastAction asChild {...props}>
        {children}
    </ToastAction>
);
Action.displayName = "Action";
Toast.Action = Action;

const Title = ({
    children,
    ...props
}: PropsWithChildren<ComponentProps<typeof TitlePropTypes>>) => (
    <ToastTitle {...props}>{children}</ToastTitle>
);
Title.displayName = "Title";
Toast.Title = Title;

const Description = ({
    children,
    ...props
}: PropsWithChildren<ComponentProps<typeof DescriptionPropTypes>>) => (
    <ToastDescription {...props}>{children}</ToastDescription>
);
Description.displayName = "Description";
Toast.Description = Description;

export { Toast };
