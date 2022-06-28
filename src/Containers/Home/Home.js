// Librairies.
import React, { useEffect } from 'react';
import classes              from './Home.module.css';
import styled               from 'styled-components';
import { useNavigate }      from 'react-router-dom';
import routes               from '../../config/routes';

// Composants.
import Owlie      from '../../assets/Owlie.gif';
// import Spiral     from '../../assets/Spiral.png';
import Button     from '../../Components/Button/Button';

// Styled Components.
const StyledOwl = styled.img`
    width: 120%;

    @media (max-width: 1500px) {
            width    : 90%;
        }

    @media (max-width: 873px) {
            width    : 80%;
        }
`;

const StyledLayout = styled.div`
    display        : flex;
    height         : 100%;
    justify-content: space-around;
    background     : #EFEFEF;
    align-items    : center; 
    padding: 0 20em;
        @media (max-width: 1500px) {
            padding: 30px;
        }
        @media (max-width  : 873px) {
            flex-direction : column;
            justify-content: center;
            align-items    : center;
        }
`;

const StyledH1 = styled.h1`
    font-size     : 4.3rem;
    line-height   : 1.1em;
    letter-spacing: -3px;
    margin-bottom : 15px;
    color         : #112B3C;
    @media (max-width: 873px) {
            font-size: 3em;
        }
`;

const StyledP = styled.p`
    color        : #205375;
    font-size    : 1.8em;
    padding      : 20px 0;
    margin-bottom: 15px;
`;

const StyledSpan = styled.span`
    color      : #F66B0E;
    font-weight: 900;
`;

const StyledSharedSpace = styled.div`
    width: 100%;
    text-align: start;
    @media (max-width : 873px) {
            text-align: center;
        }
`;

const StyledButton = {
    background: '#205375',
    border    : 'none',
    width     : '250px',
    color     : 'white',
    fontSize  : '1.15em',
    padding   : '15px',
};

// Accueil.
export default function Home(props) {

    // Nom de la page.
    useEffect(() => {
        document.title = 'Hooter | Accueil';
    });

    // Variables.
    let navigate = useNavigate();

    // Render.
    return (
        <StyledLayout>
            <StyledSharedSpace>
                {props.user ?
                    <div>
                        <StyledH1>Hello <StyledSpan>{props.user.displayName}</StyledSpan>, quelle est votre actualité ?</StyledH1>
                        <StyledP>Retrouvez votre tableau de bord !</StyledP>
                    </div>
                :
                    <div>
                        <StyledH1>Bienvenue sur <br/> <StyledSpan> Hooter</StyledSpan> votre réseau <br /> de partage.</StyledH1>
                        <StyledP>Rejoignez notre communauté !</StyledP>
                    </div>
                }
                {!props.user ?
                    <Button 
                        onClick={() => navigate(routes.CONNEXION)}  
                        style={{background: '#205375', border: 'none', width: '10vw', color: 'white', padding: '15px', fontSize: '1.15em'}}
                    >S'inscrire
                    </Button>
                :
                    <Button 
                        onClick={() => navigate(routes.DASHBOARD)}  
                        style={StyledButton}
                    >Partager son actualité
                    </Button>
                }
            </StyledSharedSpace>
            
            <StyledSharedSpace>
            <StyledOwl src={Owlie} />
                {/* <div>
                    <img alt='Spirale' className={classes.spiral1} src={Spiral} />
                    <img alt='Spirale' className={classes.spiral2} src={Spiral} />
                </div> */}
            </StyledSharedSpace>
        </StyledLayout>
    );
};