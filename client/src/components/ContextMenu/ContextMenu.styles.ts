"use client";

import * as ContextMenu from "@radix-ui/react-context-menu";
import styled, { css } from "styled-components";

export const StyledRoot = styled(ContextMenu.Root)``;

export const StyledTrigger = styled(ContextMenu.Trigger)``;

export const StyledPortal = styled(ContextMenu.Portal)``;

const Content = css`
    min-width: 220px;
    background-color: ${({ theme }) => theme.colors.gray10};
    border: 1px solid ${({ theme }) => theme.colors.darkestGray};
    border-radius: 4px;
    overflow: hidden;
    padding: 10px;
`;
export const StyledContent = styled(ContextMenu.Content)`
    ${Content}
`;

export const StyledSub = styled(ContextMenu.Sub)``;

export const StyledSubContent = styled(ContextMenu.SubContent)`
    ${Content}
`;

const Item = css`
    ${({ theme }) => css`
        font-size: 13px;
        line-height: ${theme.lineHeight.sm};
        color: ${theme.colors.darkestGray};
        border-radius: 2px;
        display: flex;
        align-items: center;
        height: 30px;
        position: relative;
        user-select: none;
        outline: none;

        &[data-disabled] {
            color: ${theme.colors.gray60};
            pointer-events: none;
        }

        &[data-highlighted] {
            background-color: ${theme.colors.darkestGray};
            color: ${theme.colors.gray10};
        }
    `};
`;

export const StyledItem = styled(ContextMenu.Item)<{ sideOffset: boolean }>`
    ${Item};
    padding: ${({ sideOffset }) => (sideOffset ? "0 5px 0 25px" : "0 10px")};
`;

export const StyledRadioGroup = styled(ContextMenu.RadioGroup)``;

export const StyledRadio = styled(ContextMenu.RadioItem)`
    ${Item};
    padding: 0 5px 0 25px;
`;

export const StyledCheckbox = styled(ContextMenu.CheckboxItem)`
    ${Item};
    padding: 0 5px 0 25px;
`;

export const StyledSubTrigger = styled(ContextMenu.SubTrigger)<{ sideOffset: boolean }>`
    ${Item};
    padding: ${({ sideOffset }) => (sideOffset ? "0 5px 0 25px" : "0 10px")};
`;

export const StyledLabel = styled(ContextMenu.Label)`
    ${({ theme }) => css`
        padding-left: 11px;
        font-size: 13px;
        line-height: ${theme.lineHeight.default};
        font-weight: ${theme.fontWeight.bold};
        color: ${theme.colors.gray80};
    `};
`;

export const StyledSeparator = styled(ContextMenu.Separator)`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray50};
    margin: 5px;
`;

export const StyledItemIndicator = styled(ContextMenu.ItemIndicator)`
    position: absolute;
    left: 0;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

export const StyledRightSlot = styled.div`
    margin-left: auto;
    padding-left: 20px;
    color: ${({ theme }) => theme.colors.gray70};
`;
