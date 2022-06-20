// Librairies
import React    from 'react';
import classes  from './Home.module.css';
import styled   from 'styled-components';
import { Link } from 'react-router-dom';
import routes   from '../../config/routes';

// Composants
import Owl    from '../../assets/Owl.png';
import Spiral from '../../assets/spirals2.png';
import Button from '../../Components/Button/Button';

// Styled
const StyledOwl = styled.img`
    width: 40%;
`;

const StyledLayout = styled.div`
    display        : flex;
    height         : 100%;
    justify-content: space-around;
    background     : #FCF8E8;
    align-items    : center;
`;

const StyledSharedSpace = styled.div`
    width: 50%;
`;

export default function Home() {

    return (
        <StyledLayout>
            <StyledSharedSpace>
                <p>L'application pour suivre toutes les tendances et garder contact avec vos proches</p>
                <Link to={routes.CONNEXION}>
                <Button>Commencer</Button>
            </Link>
            </StyledSharedSpace>
            
            <StyledSharedSpace>
            <StyledOwl src={Owl} />
                <div>
                    <img alt='Spirale' className={classes.spiral1} src={Spiral} />
                    <img alt='Spirale' className={classes.spiral2} src={Spiral} />
                </div>
            </StyledSharedSpace>
        </StyledLayout>
    );
};