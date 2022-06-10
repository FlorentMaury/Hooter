// Librairies
import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
    background: #F1F1F1;
`;

const date = new Date();
let year = date.getFullYear();

export default function Footer() {
    return (
        <StyledFooter>Florent Maury © {year}</StyledFooter>
    );
};