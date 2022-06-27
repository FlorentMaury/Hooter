// Librairies.
import React                 from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import fire                  from '../../config/firebase';
import { toast }             from 'react-toastify';
import routes                from '../../config/routes';


// Composants.
import Navigation    from './Navigation/Navigation';
import Button        from '../Button/Button';


// Styled Components.
const ColorChangerAnimation = keyframes`
    0.0%{
        color: white;
    }
    100%{
        color: white;
    }
    25.4%{
        color: #94B49F;
    }
    49.6%{
        color: #ECB390;
    }
    74.8%{
        color: #DF7861;
    }
`;

const StyledHeader = styled.header`
    display        : flex;
    justify-content: space-around;
    height         : 12vh;
    align-items    : center;
    background     : #112B3C;

        & a {
            color          : white;
            text-decoration: none;
        };

        @media (max-width: 815px) {
            flex-direction: column;
            height        : 150px;
        }
`;

const StyledLogo = styled.div`
    font-family: 'Fascinate', cursive;
    font-size  : 3.5rem;

    @media (max-width: 815px) {
            font-size: 3rem;
        }
`;

const StyledAnimatedDiv = styled.div`
        &:hover {
        animation-name           : ${ColorChangerAnimation};
        animation-duration       : 3.5s;
        animation-iteration-count: infinite;
    }
`;

const StyledNav = styled.nav`
       @media (max-width: 815px) {
            margin-bottom: 20px;
        }
`;

const StyledRightSide = styled.div`
        display: flex;
`;


// Headers.
export default function Header(props) {

    // Use Navigate.
    const navigate = useNavigate();

    // Fonction
    const logoutClickedHandler = () => {
        fire.auth().signOut();
        toast('Á bientôt !', {position: 'bottom-right'});
        navigate(routes.HOME);
    }

    // Render.
    return (
        <StyledHeader>

            <StyledLogo>
                <Link to={routes.HOME}>
                    <StyledAnimatedDiv>Hooter</StyledAnimatedDiv>
                </Link>
            </StyledLogo> 

            <StyledRightSide>
                <StyledNav>
                    <Navigation user={props.user} />
                </StyledNav>

                <div>
                    { !props.user && 
                        <div>
                            <Link to={routes.CONNEXION}>
                                <Button>Connexion</Button>
                            </Link>
                        </div>
                    }
                    { props.user && 
                        <Button style={{
                                background: '#F66B0E', 
                                color     : 'white', 
                                display   : 'flex', 
                                alignItems: 'center', 
                                marginLeft: '10px', 
                                fontSize  : '1.1rem', 
                                fontWeight: '100'
                            }} 
                                onClick={logoutClickedHandler}
                    >Déconnexion</Button> }
                </div>
            </StyledRightSide>
        </StyledHeader>
    );
};