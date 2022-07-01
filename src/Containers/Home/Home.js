// Librairies.
import React, { useEffect }  from 'react';
import styled                from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import routes                from '../../config/routes';

// Composants.
import Owlie      from '../../assets/Owlie.gif';
import Button     from '../../Components/Button/Button';

// Styled Components.
const StyledOwlie = styled.img`
    width: 150%;
`;

const StyledHome = styled.div`
    height         : 100%;
    display        : flex;
    justify-content: center;
    background     : #EFEFEF;

`;

const StyledHomeLayout = styled.div`
    background: #EFEFEF;
    width: 60vw;
    display: flex;

        @media (max-width: 1500px) {
            width  : 70vw;
        }

        @media (max-width: 1150px) {
            width  : 75vw;
        }

        @media (max-width  : 873px) {
            flex-direction : column;
            justify-content: center;
            align-items    : center;
            width          : 90w;
        }

        @media (max-width: 590px) {
            width  : 90vw;
            }
`;

const StyledH1 = styled.h1`
    font-size     : 4.3rem;
    line-height   : 1.1em;
    letter-spacing: -3px;
    color         : #112B3C;
    text-align    : start;
    margin-bottom: 30px;

        @media (max-width: 1200px) {
            margin-bottom: 10px;
        }

        @media (max-width: 873px) {
                font-size: 3em;
                text-align: center;
            }
`;

const StyledP = styled.p`
    color        : #205375;
    font-size    : 1.8em;
    text-align: start;
    margin-bottom: 30px;

        @media (max-width: 1200px) {
            margin-bottom: 10px;
        }
    
        @media (max-width: 873px) {
                text-align: center;
            }
`;

const StyledSpan = styled.span`
    color      : #F66B0E;
    font-weight: 900;
`;

const StyledSharedSpaceText = styled.div`
    display       : flex;
    flex-direction: column;
    margin-top: 150px;
    width: 50%;

        @media (max-width: 1200px) {
                margin-top: 10%;
            }
            
        @media (max-width: 873px) {
                width: 80%;
                margin-bottom: 30px;
            }
`;

const StyledSharedSpaceOwlie = styled.div`
    width: 50%;

    @media (max-width: 1550px) {
            display        : flex;
            justify-content: center;
            align-items    : center;
        }

    @media (max-width: 873px) {
            width: 80%;
        }
`;

const StyledRegisterButtons = styled.div`
    display: flex;        
    
        @media (max-width: 873px) {
                justify-content: center;
            }
`;

const StyledButton = {
    background: '#205375',
    border    : 'none',
    width     : '250px',
    color     : 'white',
    fontSize  : '1.15em',
    padding   : '20px',
    alignSelf : 'start'
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
        <StyledHome>
            <StyledHomeLayout>
                <StyledSharedSpaceText>
                    {props.user ?
                        <div>
                            <StyledH1>Hello <StyledSpan>{props.user.displayName}</StyledSpan>, quoi de neuf aujourd'hui ?</StyledH1>
                            <StyledP>Retrouvez votre tableau de bord !</StyledP>
                        </div>
                    :
                        <div>
                            <StyledH1>Bienvenue sur <br/> <StyledSpan> Hooter</StyledSpan> votre réseau <br /> de partage.</StyledH1>
                            <StyledP>Rejoignez notre communauté !</StyledP>
                        </div>
                    }
                    {!props.user ? 
                        <StyledRegisterButtons>
                            <Link 
                                to    = {routes.CONNEXION} 
                            >
                                <Button 
                                    style={{background: '#205375', marginRight: '10px', alignSelf: 'center', border: '2px solid #205375', color: 'white'}}
                                >
                                    S'inscrire
                                </Button>
                            </Link>
                            <Link to={routes.CONNEXION}>
                                <Button>Connexion</Button>
                            </Link>
                        </StyledRegisterButtons>
                    :
                        <Button 
                            onClick={() => navigate(routes.DASHBOARD)}  
                            style={StyledButton}
                        >Partager son actualité
                        </Button>
                    }
                    
                </StyledSharedSpaceText>
                
                <StyledSharedSpaceOwlie>
                    <StyledOwlie src={Owlie} />
                </StyledSharedSpaceOwlie>

            </StyledHomeLayout>
        </StyledHome>
    );
};