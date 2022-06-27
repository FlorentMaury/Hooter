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
    background-color: #112B3C;
    color           : white;
`;

const StyledA = styled.a`
    text-decoration: none;
    color: white;
`;

// Variables.
const date = new Date();
let year   = date.getFullYear();


// Footer.
export default function Footer() {
    // Render.
    return (
        <StyledFooter>
            <p>
                <StyledA 
                    href="mailto:contact@florent-maury.fr?"
                >
                    Florent Maury
                </StyledA> © {year}
            </p>
        </StyledFooter>
    );
};