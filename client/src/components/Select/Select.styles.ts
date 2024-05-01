import * as Select from "@radix-ui/react-select";
import styled, { css } from "styled-components";

export const StyledRoot = styled(Select.Root)``;

export const StyledTrigger = styled(Select.Trigger)`
    ${({ theme }) => css`
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        padding: 0 12px;
        font-size: ${theme.fontSize.default};
        font-family: ${theme.fontFamily.inter};
        font-weight: ${theme.fontWeight.regular};
        line-height: ${theme.lineHeight.default};
        background-color: ${theme.colors.white};
        border: 1px solid ${theme.colors.gray50};
        color: ${theme.colors.gray90};
        width: 100%;
        height: 42px;
        cursor: pointer;
        z-index: 1;
        box-sizing: border-box;

        &:hover {
            background-color: ${theme.colors.gray30};
            border: 1px solid ${theme.colors.gray70};
        }

        &:focus {
            outline: none;
            border: 1px solid ${theme.colors.darkestGray};
        }

        &[data-placeholder] {
            color: ${theme.colors.gray90};
        }
    `}
`;

export const StyledIcon = styled(Select.Icon)`
    color: ${({ theme }) => theme.colors.gray90};
    display: flex;
    align-items: center;
`;

export const StyledContent = styled(Select.Content)`
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.darkestGray};
    z-index: 999;
`;

export const StyledViewport = styled(Select.Viewport)`
    padding: 10px;
    z-index: 9999;
`;

export const StyledItem = styled(Select.Item)`
    ${({ theme }) => css`
        all: unset;
        font-size: 13px;
        line-height: ${theme.lineHeight.sm};
        color: ${theme.colors.darkestGray};
        border-radius: 2px;
        display: flex;
        align-items: center;
        padding: 0 10px 0 20px;
        gap: 10px;
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
    `}
`;

export const StyledLabel = styled(Select.Label)`
    ${({ theme }) => css`
        padding-left: 11px;
        font-size: 13px;
        line-height: ${theme.lineHeight.default};
        font-weight: ${theme.fontWeight.bold};
        color: ${theme.colors.gray80};
    `};
`;

export const StyledSeparator = styled(Select.Separator)`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray50};
    margin: 5px;
`;

export const StyledScrollUpButton = styled(Select.ScrollUpButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    background-color: ${({ theme }) => theme.colors.gray20};
    color: ${({ theme }) => theme.colors.darkestGray};
    cursor: default;
`;

export const StyledScrollDownButton = styled(Select.ScrollDownButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    background-color: ${({ theme }) => theme.colors.gray20};
    color: ${({ theme }) => theme.colors.darkestGray};
    cursor: default;
`;
