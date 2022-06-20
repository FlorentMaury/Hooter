// Librairies
import React  from 'react';
import styled from 'styled-components';

// Styled Components
const StyledH1 = styled.h1`
    padding: 10px;
    font-size: 2rem;
`; 

const StyledDiv = styled.div`
    background: #FCF8E8;
    height: 100%;
`;

export default function Contact() {
    return (
        <StyledDiv>
            <StyledH1>Contact</StyledH1>
        </StyledDiv>
    );
};