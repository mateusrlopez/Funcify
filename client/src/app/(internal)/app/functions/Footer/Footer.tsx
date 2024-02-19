import { Button } from "@/components/Button";
import { ReactNode } from "react";
import { FaGithub, FaUndo, FaSave } from "react-icons/fa";
import { IoMdHelpCircleOutline, IoIosWarning } from "react-icons/io";
import { MdOutlineReport } from "react-icons/md";

import { Root, Actions, ProjectInfo, Column, Text, StyledLink } from "./Footer.styles";

const Footer = (): ReactNode => (
    <Root>
        <Actions>
            <Text $fontSize="default" $fontWeight="bold" $color="lighterRed">
                <IoIosWarning size={16} />
                Unsaved changes...
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Button $variant="tertiary">
                    <FaUndo size={14} />
                    Rollback
                </Button>
                <Button>
                    <FaSave size={14} />
                    Push
                </Button>
            </div>
        </Actions>
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
    </Root>
);

export { Footer };
