// Librairies.
import React from 'react';
import styled from 'styled-components';

// Styled Components.
const StyledFooter = styled.footer`
    height          : 5vh;
    display         : flex;
    color           : gray;
    align-items     : center;
    justify-content : center;
    background-color: #205375;
    color           : white;
`;

// Variables.
const date = new Date();
let year   = date.getFullYear();

export default function Footer() {
    // Render.
    return (
        <StyledFooter>Florent Maury © {year}</StyledFooter>
    );
};