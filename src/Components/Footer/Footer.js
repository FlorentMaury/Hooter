// Librairies.
import React from 'react';
import styled from 'styled-components';

// Styled Components.
const StyledFooter = styled.footer`
    background      : #F1F1F1;
    height          : 5vh;
    display         : flex;
    color           : gray;
    align-items     : center;
    justify-content : center;
    background-color: #94B49F;
    border-top      : 1px solid rgba(0, 0, 0, 0.2);
`;

// Variables.
const date = new Date();
let year = date.getFullYear();

export default function Footer() {
    // Render.
    return (
        <StyledFooter>Florent Maury © {year}</StyledFooter>
    );
};