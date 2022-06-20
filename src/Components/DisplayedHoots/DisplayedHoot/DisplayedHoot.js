// Librairies
import React    from 'react';
import routes   from '../../../config/routes';
import { Link } from 'react-router-dom';
import styled   from 'styled-components';


// Styled Components
const StyledDiv = styled.div`
    display       : flex;
    flex-direction: column;
    color         : black;
    margin        : 15px;
    border-bottom : 1px solid rgba(0, 0, 0, .2);
`;

const StyledP = styled.p`
    font-size: 1.6rem;
`;

const StyledSmall = styled.small`
    font-size: 1.1rem;
    color: #DF7861;
`;

const StyledSpan = styled.span`
    font-style: italic;
    margin: 5px;
`;


function DisplayedHoot(props) {

    // Render
    return (
        <Link 
            to={routes.HOOT + '/' + props.hoot.slug}
            style={{textDecoration: 'none'}}
        >
            <StyledDiv>
                <StyledP>{props.hoot.contenu}</StyledP>
                <StyledSmall>{props.hoot.auteur}</StyledSmall>
                <StyledSpan>{props.hoot.date}</StyledSpan>
            </StyledDiv>
        </Link>
    );
};

export default DisplayedHoot;