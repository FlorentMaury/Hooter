// Librairies
import React  from 'react';
import styled from 'styled-components';

// Styled Components
const StyledButton = styled.button`
    background   : transparent;
    color        : #F66B0E;
    padding      : 10px;
    border-radius: 5px;
    border       : 2px solid #F66B0E;
    transition   : all 0.3s cubic-bezier(.25,.8,.25,1);
    font-size: 1rem;
    cursor       : pointer;

        &:hover {
            background: #f66b0e20;
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
`;

export default function Button(props) {
    return (
        <StyledButton 
            onClick  = {props.onClick}
            disabled = {props.disabled}
            style    = {props.style}
        >
            {props.children}
        </StyledButton>
    );
};
// #ECB390
// #DF7861