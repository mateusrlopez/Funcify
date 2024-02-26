import styled, { keyframes } from "styled-components";

const Spin = keyframes`
    from { transform: rotate(0deg) } 
    to { transform: rotate(360deg) }
`;

export const Loader = styled.div`
    border: 3px solid ${({ theme }) => theme.colors.gray60};
    border-top: 3px solid ${({ theme }) => theme.colors.darkestGray};
    border-radius: 50%;
    width: 26px;
    height: 26px;
    animation: ${Spin} 1s linear infinite;
`;
