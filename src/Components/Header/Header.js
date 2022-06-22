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
    height             : 15vh;
    align-items        : center;
    background         : #112B3C;
    background-size    : cover;
    background-position: 20% 15%;

        & a {
            color          : white;
            text-decoration: none;
        };
`;

const StyledLogo = styled.div`
    font-family: 'Fascinate', cursive;
    font-size  : 3.5rem;
`;

const StyledAnimatedDiv = styled.div`
        &:hover {
        animation-name           : ${ColorChangerAnimation};
        animation-duration       : 3.5s;
        animation-iteration-count: infinite;
    }
`;

const StyledRightSide = styled.div`
        display: flex;
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
                    <StyledAnimatedDiv>Hooter</StyledAnimatedDiv>
                </Link>
            </StyledLogo> 

            <StyledRightSide>
                <nav>
                    <Navigation user={props.user} />
                </nav>

                <div>
                { !props.user && 
                    <div>
                        <Link to={routes.CONNEXION}>
                            <Button>Connexion</Button>
                        </Link>
                    </div>
                    }
                    { props.user && <Button style={{
                                                        background: '#F66B0E', 
                                                        color     : 'white', 
                                                        display   : 'flex', 
                                                        alignItems: 'center', 
                                                        marginLeft: '10px', 
                                                        fontSize  : '1.2rem', 
                                                        fontWeight: '100'
                                                    }} 
                                            onClick={logoutClickedHandler}
                    >Déconnexion</Button> }
                </div>
            </StyledRightSide>

        </StyledHeader>
    );
};