// Librairies
import React from 'react';
import classes from './Home.module.css';
import styled from 'styled-components';

// Composants
import Owl from '../../assets/Owl.png';
import Spiral from '../../assets/Spirals.svg';

// Styled
const StyledOwl = styled.img`
    width: 60%;
`;

export default function Home() {
    return (
        <>
            <h1>Home</h1>
            <StyledOwl src={Owl} />
            <img className={classes.spiral1} src={Spiral} />
            <img className={classes.spiral2} src={Spiral} />
        </>
    );
};