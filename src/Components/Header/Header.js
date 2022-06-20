// Librairies
import React                 from 'react';
import styled, { keyframes }                from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import fire                  from '../../config/firebase';
import { toast }             from 'react-toastify';
import routes                from '../../config/routes';


// Composants
import Navigation    from './Navigation/Navigation';
import Button        from '../Button/Button';
import backgroundImg from '../../assets/bureau1bis.jpg';
import dots          from '../../assets/points.png'


// Styled Components
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
    display            : flex;
    justify-content    : space-around;
    height             : 50vh;
    padding            : 40px 80px;
    align-items        : start;
    background-image   : url(${dots}), url(${backgroundImg});
    background-size    : cover;
    background-position: 20% 15%;
    border-bottom      : 5px solid silver;
    box-shadow         : 0px 5px 21px 1px rgba(0,0,0,0.71);

        & a {
            color          : white;
            text-decoration: none;
        };
`;

const StyledLogo = styled.div`
    font-family: 'Fascinate', cursive;
    font-size  : 3.8rem;
    flex-grow  : 1;
`;

const StyledAnimatedDiv = styled.div`
        /* &:hover { */
        animation-name           : ${ColorChangerAnimation};
        animation-duration       : 3.5s;
        animation-iteration-count: infinite;
    /* } */
`;

const StyledConnexion = styled.div`
    padding  : 2% 0;
    flex-grow: 1;
`;

const StyledNav = styled.nav`
    padding  : 2% 0;
    flex-grow: 1;
`;

export default function Header(props) {

    const navigate = useNavigate();

    // Fonction
    const logoutClickedHandler = () => {
        fire.auth().signOut();
        toast('Á bientôt !', {position: 'bottom-right'});
        navigate(routes.HOME);
    }

    return (
        <StyledHeader>

            <StyledLogo>
                <Link to={routes.HOME}>
                    <StyledAnimatedDiv>Hooting Owl</StyledAnimatedDiv>
                </Link>
            </StyledLogo> 

            <StyledNav>
                <Navigation user={props.user} />
            </StyledNav>

            <StyledConnexion>
            { !props.user && 
                <div>
                    <Link to={routes.CONNEXION}>
                        <Button>Connexion</Button>
                    </Link>
                </div>
                }
                { props.user && <Button style={{background: '#DF7861'}} onClick={logoutClickedHandler}>Déconnexion</Button> }
            </StyledConnexion>

        </StyledHeader>
    );
};