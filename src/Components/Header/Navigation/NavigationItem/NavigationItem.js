// Librairies.
import React       from 'react';
import { NavLink } from 'react-router-dom';
import styled      from 'styled-components'

// Styled Components.
const StyledLi = styled.li`
    margin: 10px;

    @media (max-width: 815px) {
        margin: 4px;
    };
`;

// Navigation Item.
export default function NavigationItem(props) {

    // Render.
    return (
        <StyledLi>
            <NavLink
                exact = {props.exact}
                to    = {props.to}
                style = {({isActive}) => {
                    return isActive ? {color: '#DF7861'} : {color: 'white'}
                }}
                >{props.children}
            </NavLink>
        </StyledLi>
    );
};