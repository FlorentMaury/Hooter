// Librairies
import React    from 'react';
import routes   from '../../../config/routes';
import { Link } from 'react-router-dom';
import styled   from 'styled-components';


// Styled Components
const StyledDiv = styled.div`
    display       : flex;
    flex-direction: column;
    align-items   : center;
    color         : black;
    margin        : 15px;
    border-bottom : 1px solid rgba(0, 0, 0, .2);
    border        : 1px solid #cccccce0;
    min-width     : 1000px;
    border-radius : 10px;
    background    : white;
`;

const StyledP = styled.p`
    font-size: 1.6rem;
    padding  : 10px 0;
`;

const StyledSmall = styled.small`
    font-size    : 1.1rem;
    color        : #DF7861;
    border-bottom: 1px solid #cccccce0;
    width        : 950px;
    padding      : 10px;
    font-weight  : bold;
`;

const StyledSpan = styled.span`
    font-style: italic;
    margin    : 5px;
    padding   : 10px 0;
`;


function DisplayedHoot(props) {

    // Render
    return (
        <Link 
            to={routes.HOOT + '/' + props.hoot.slug}
            style={{textDecoration: 'none'}}
        >
            <StyledDiv>
                <StyledSmall>{props.hoot.auteur}</StyledSmall>
                <StyledP>{props.hoot.contenu}</StyledP>
                <StyledSpan>{props.hoot.date}</StyledSpan>
            </StyledDiv>
        </Link>
    );
};

export default DisplayedHoot;