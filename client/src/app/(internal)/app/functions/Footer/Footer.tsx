"use client";

import { FunctionsContext } from "@/app/_context/functions";
import { Button } from "@/components/Button";
import { Toast } from "@/components/Toast";
import { updateFunction } from "@/repository/functionRepository";
import { FunctionSchema } from "@/types/function";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ReactNode, useContext, useRef } from "react";
import { FaGithub, FaSave } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineReport } from "react-icons/md";

import { Root, Actions, ProjectInfo, Column, Text, StyledLink } from "./Footer.styles";

const Footer = (): ReactNode => {
    const searchParams = useSearchParams();
    const fid = searchParams.get("fid");

    const toastSuccessRef = useRef<ToastRefType>();
    const toastErrorRef = useRef<ToastRefType>();

    const functionsCtx = useContext(FunctionsContext);

    const { mutateAsync: handleSubmitFn } = useMutation({
        mutationFn: (variables: { functionId: string; data: FunctionSchema }) =>
            updateFunction(variables.functionId, variables.data),
    });

    const handleSubmit = async (): Promise<void> => {
        try {
            const data = {
                ...functionsCtx?.selectedFunction,
                code: functionsCtx?.code,
            };

            await handleSubmitFn({
                functionId: functionsCtx?.selectedFunction?.id as string,
                data: data as FunctionSchema,
            });

            if (toastSuccessRef.current) toastSuccessRef.current.publish();
        } catch {
            if (toastErrorRef.current) toastErrorRef.current.publish();
        }
    };

    return (
        <Root>
            {fid ? (
                <>
                    <Actions>
                        {/* <Text $fontSize="default" $fontWeight="bold" $color="lighterRed"> */}
                        {/*    <IoIosWarning size={16} /> */}
                        {/*    Unsaved changes... */}
                        {/* </Text> */}
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            {/* <Button $variant="tertiary"> */}
                            {/*    <FaUndo size={14} /> */}
                            {/*    Rollback */}
                            {/* </Button> */}
                            <Button onClick={handleSubmit}>
                                <FaSave size={14} />
                                Push
                            </Button>
                        </div>
                    </Actions>
                </>
            ) : (
                <div style={{ flexGrow: 1 }} />
            )}

            <ProjectInfo>
                <Column>
                    <Text $fontSize="sm" $fontWeight="bold" $color="gray10">
                        Version: v1.0.0
                    </Text>
                </Column>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <StyledLink href="#">
                        <IoMdHelpCircleOutline size={18} />
                    </StyledLink>
                    <StyledLink href="#">
                        <MdOutlineReport size={20} />
                    </StyledLink>
                    <StyledLink href="#">
                        <FaGithub size={18} />
                    </StyledLink>
                </div>
            </ProjectInfo>

            <Toast>
                <Toast.Content ref={toastSuccessRef} variant="success">
                    <Toast.Title>Saved!</Toast.Title>
                    <Toast.Description>
                        {`The function <strong>${functionsCtx?.selectedFunction?.name}</strong> was updated with success`}
                    </Toast.Description>
                </Toast.Content>
            </Toast>

            <Toast>
                <Toast.Content ref={toastErrorRef} variant="error">
                    <Toast.Title>An unexpected error occurred</Toast.Title>
                    <Toast.Description>
                        An unexpected error occurred, please try again later
                    </Toast.Description>
                </Toast.Content>
            </Toast>
        </Root>
    );
};

export { Footer };
