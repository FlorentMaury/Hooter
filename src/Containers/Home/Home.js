// Librairies
import React    from 'react';
import classes  from './Home.module.css';
import styled   from 'styled-components';
import { Link } from 'react-router-dom';
import routes   from '../../config/routes';
import fire     from '../../config/firebase';

// Composants
import Owl    from '../../assets/OwlieTalks.png';
import Spiral from '../../assets/Spiral.png';
import Button from '../../Components/Button/Button';

// Styled
const StyledOwl = styled.img`
    width: 130%;
`;

const StyledLayout = styled.div`
    display        : flex;
    height         : 100%;
    justify-content: space-between;
    background     : #EFEFEF;
    align-items    : center; 
    padding: 0 20%;
`;

const StyledH1 = styled.h1`
    text-align: start;
    font-size: 4.3rem;
    line-height: 1.2em;
    letter-spacing: -3px;
    margin-bottom: 15px;
    color: #112B3C;
`;

const StyledSpan = styled.span`
    color: #F66B0E;
    font-weight: bolder;
`;

const StyledSharedSpace = styled.div`
    width: 100%;
`;

const StyledGreetings = styled.p`
    position: absolute;
    top: 29%;
    left: 72%;
    font-size: 2em;
`;

// let name = fire.auth().currentUser.displayName

export default function Home() {

    return (
        <StyledLayout className='container'>
            <StyledSharedSpace>
                <StyledH1>Bienvenue <br /> dans votre <StyledSpan>Communauté.</StyledSpan></StyledH1>
            </StyledSharedSpace>
            
            <StyledSharedSpace>
            <StyledOwl src={Owl} />
                <div>
                    <img alt='Spirale' className={classes.spiral1} src={Spiral} />
                    <img alt='Spirale' className={classes.spiral2} src={Spiral} />
                </div>
                {/* <StyledGreetings>Hou Hou ! <br />Coucou {name}</StyledGreetings> */}
            </StyledSharedSpace>
        </StyledLayout>
    );
};