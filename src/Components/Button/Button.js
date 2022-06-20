// Librairies
import React  from 'react';
import styled from 'styled-components';

// Styled Components
const StyledButton = styled.button`
    background   : #94B49F;
    padding      : 10px;
    border-radius: 4px;
    border: none;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

        &:hover {
            box-shadow: 0 3px 6px rgba(0,0,0,0.32), 0 3px 6px rgba(0,0,0,0.43);
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