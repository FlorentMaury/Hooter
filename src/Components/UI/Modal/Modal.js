// Librairies.
import React from 'react';
import styled from 'styled-components';

// Styled Components.
const StyledOverlay = styled.div`
    position  : absolute;
    top       : 0;
    left      : 0;
    right     : 0;
    bottom    : 0;
    background: rgba(49, 49, 49, 0.6);
`;

const StyledModal = styled.div`
    position     : absolute;
    top          : 40%;
    left         : 50%;
    transform    : translate(-50%, -50%);
    background   : white;
    border-radius: 5px;
    max-width    : 1200px;
    min-width    : 600px;

`;

// Modale.
export default function Modal(props) {
    // Render.
    return (
        <StyledOverlay>
            <StyledModal>
                {props.children}
            </StyledModal>
        </StyledOverlay>
    )
}
