// Librairies
import React  from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';


// Composants
import Navigation from './Navigation/Navigation';
import routes from '../../config/routes';


// Variables
const StyledHeader = styled.header`
    display        : flex;
    justify-content: space-around;
    background     : #94B49F;
    height         : 15vh;
    align-items    : center;
`;

export default function Header(props) {

    // Variables
    const navigate = useNavigate();

    return (
        <StyledHeader>
        <div>
            Believitter
        </div> 
        <nav>
            <Navigation user={props.user} />
        </nav>
        { !props.user && 
        <div>
            <Link to={routes.CONNEXION}>
                <button>Connexion</button>
            </Link>
        </div>
        }
    </StyledHeader>
    );
};