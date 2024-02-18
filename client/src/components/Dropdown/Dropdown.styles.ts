"use client";

import {
    Content,
    Arrow,
    SubContent,
    Item,
    SubTrigger,
    CheckboxItem,
    RadioItem,
    Label,
    Separator,
    ItemIndicator,
} from "@radix-ui/react-dropdown-menu";
import styled, { css, keyframes } from "styled-components";

const slideUpAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateY(2px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideRightAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateX(-2px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const slideDownAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateY(-2px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideLeftAndFade = keyframes`
    from {
        opacity: 0;
        transform: translateX(2px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const StyledContent = styled(Content)`
    min-width: 220px;
    background-color: ${({ theme }) => theme.colors.gray10};
    border: 1px solid ${({ theme }) => theme.colors.darkestGray};
    border-radius: 4px;
    padding: 10px;
    z-index: 1001;

    @media (prefers-reduced-motion: no-preference) {
        animation-duration: 400ms;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform, opacity;

        &[data-state="open"] {
            &[data-side="top"] {
                animation-name: ${slideDownAndFade};
            }

            &[data-side="right"] {
                animation-name: ${slideLeftAndFade};
            }

            &[data-side="bottom"] {
                animation-name: ${slideUpAndFade};
            }

            &[data-side="left"] {
                animation-name: ${slideRightAndFade};
            }
        }
    }
`;

export const StyledSubContent = styled(SubContent)`
    min-width: 220px;
    background-color: ${({ theme }) => theme.colors.gray10};
    border: 1px solid ${({ theme }) => theme.colors.darkestGray};
    border-radius: 4px;
    padding: 10px;
    z-index: 1001;

    @media (prefers-reduced-motion: no-preference) {
        animation-duration: 400ms;
        animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform, opacity;

        &[data-state="open"] {
            &[data-side="top"] {
                animation-name: ${slideDownAndFade};
            }

            &[data-side="right"] {
                animation-name: ${slideLeftAndFade};
            }

            &[data-side="bottom"] {
                animation-name: ${slideUpAndFade};
            }

            &[data-side="left"] {
                animation-name: ${slideRightAndFade};
            }
        }
    }
`;

export const StyledArrow = styled(Arrow)`
    ${({ theme }) => css`
        fill: none;
        border-right: 1px solid ${theme.colors.darkestGray};
        border-bottom: 1px solid ${theme.colors.darkestGray};
        transform: rotate(45deg);
        height: 10px;
        background: ${theme.colors.gray10};
        z-index: 0;
        margin-top: -4px;
    `}
`;

const CommonStylesItem = css`
    ${({ theme }) => css`
        all: unset;
        font-size: 13px;
        line-height: ${theme.lineHeight.sm};
        color: ${theme.colors.darkestGray};
        border-radius: 2px;
        display: flex;
        align-items: center;
        padding: 0 10px;
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

export const StyledItem = styled(Item)`
    ${CommonStylesItem}

    &[data-selected="true"] {
        background-color: ${({ theme }) => theme.colors.darkestGray};
        color: ${({ theme }) => theme.colors.gray10};
    }
`;

export const StyledItemWithDescription = styled(Item)`
    ${CommonStylesItem};
`;

export const StyledView = styled.div`
    ${({ theme }) => css`
        all: unset;
        font-size: 13px;
        line-height: ${theme.lineHeight.sm};
        color: ${theme.colors.darkestGray};
        border-radius: 2px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        gap: 10px;
        height: 30px;
        position: relative;
        user-select: none;
        outline: none;
    `}
`;

export const StyledSubTrigger = styled(SubTrigger)`
    ${CommonStylesItem};

    &[data-state="open"] {
        background-color: ${({ theme }) => theme.colors.darkestGray};
        color: ${({ theme }) => theme.colors.gray10};
    }
`;

export const StyledSubTriggerArrow = styled.div`
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledCheckboxItem = styled(CheckboxItem)`
    ${CommonStylesItem};
`;

export const StyledRadioItem = styled(RadioItem)`
    ${CommonStylesItem};
`;

export const StyledLabel = styled(Label)`
    ${({ theme }) => css`
        padding-left: 11px;
        font-size: 13px;
        line-height: ${theme.lineHeight.default};
        font-weight: ${theme.fontWeight.bold};
        color: ${theme.colors.gray80};
    `};
`;

export const StyledSeparator = styled(Separator)`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray50};
    margin: 5px;
`;

export const StyledItemIndicator = styled(ItemIndicator)`
    position: absolute;
    right: 7px;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;
