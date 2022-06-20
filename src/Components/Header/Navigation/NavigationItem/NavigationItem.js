// Librairies
import React       from 'react';
import { NavLink } from 'react-router-dom';
import styled      from 'styled-components'

// Styled Components
const StyledLi = styled.li`
    margin: 10px 30px;
`;
export default function NavigationItem(props) {
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