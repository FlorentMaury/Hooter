// Librairies
import React           from 'react';
import routes          from '../../../config/routes';
import styled          from 'styled-components';

// Composants
import NavigationItem from './NavigationItem/NavigationItem';

// Styled Components
const StyledUl = styled.ul`
    list-style : none;
    display    : flex;
    font-weight: 100;
    font-size  : 1.3rem;
`;

export default function Navigation(props) {

    return (
        <StyledUl>
            { !props.user && <NavigationItem to={routes.HOME}>Accueil</NavigationItem> }
            { props.user && <NavigationItem to={routes.DASHBOARD}>Dashboard</NavigationItem> }
            { props.user && <NavigationItem to={routes.MANAGEPROFILE}>Paramètres</NavigationItem> }
            <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
        </StyledUl>
    );
};