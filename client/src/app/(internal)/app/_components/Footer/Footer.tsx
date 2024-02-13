import { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineReport } from "react-icons/md";

import { Root, ProjectInfo, Column, Text, StyledLink } from "./Footer.styles";

const Footer = (): ReactNode => (
    <Root>
        <ProjectInfo>
            <Column>
                <Text $fontSize="sm" $fontWeight="bold">
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
