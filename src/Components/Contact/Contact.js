// Librairies
import React  from 'react';
import styled from 'styled-components';

// Styled Components
const StyledH1 = styled.h1`
    padding  : 10px;
    font-size: 2rem;
`; 

const StyledDiv = styled.div`
    background     : #EFEFEF;
    height         : 100%;
    display        : flex;
    justify-content: center;
`;

const StyledContactCard = styled.div`
    width        : 65VW;
    background   : white;
    border-radius: 10px;
`;

export default function Contact() {
    return (
        <StyledDiv>
            <StyledContactCard>
                <StyledH1>Contact</StyledH1>
            </StyledContactCard>
        </StyledDiv>
    );
};