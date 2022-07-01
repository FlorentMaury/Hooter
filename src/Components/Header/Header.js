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

const StyledHeaderLayout = styled.div`
    display        : flex;
    justify-content: space-between;
    height         : 12vh;
    align-items    : center;
    background     : #112B3C;
    width          : 60vw;

        & a {
            color          : white;
            text-decoration: none;
        };

        @media (max-width: 1150px) {
           width: 70vw;
        }

        @media (max-width: 1000px) {
           width: 80vw;        }

        @media (max-width: 815px) {
            flex-direction: column;
            width         : 80vw;
            ${props => !props.user ? `height: 150px;` : `height: 12vh;`};
        }  
    
    @media (max-width: 590px) {
           width: 90vw;
        }
`;

const StyledHeader = styled.header`
    display        : flex;
    justify-content: center;
    background     : #112B3C;
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
                <StyledHeaderLayout>
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
                        { props.user && 
                            <Button style={{
                                    background    : '#F66B0E', 
                                    color         : 'white', 
                                    display       : 'flex',
                                    justifyContent: 'center', 
                                    alignItems    : 'center', 
                                    marginLeft    : '10px', 
                                    fontWeight    : '100',
                                    height        : '40px',
                                    width         : '40px'
                                }} 
                                    onClick={logoutClickedHandler}
                        >
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                        </Button> }
                    </div>
                </StyledRightSide>
                </StyledHeaderLayout>
            </StyledHeader>
    );
};