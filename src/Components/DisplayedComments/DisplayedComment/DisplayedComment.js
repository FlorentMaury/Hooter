// Librairies
import React    from 'react';
import { Link } from 'react-router-dom';
import routes   from '../../../config/routes';
import styled   from 'styled-components';

// Styled Components
const StyledArticle = styled.article`
    display       : flex;
    flex-direction: column;
    background    : white;
    height        : auto;
    width         : 40vw;
    margin        : 10px;
    border-radius : 10px;
    padding       : 10px 0;
`;

const StyledP = styled.p`
    font-size: 1.1rem;
`;

const StyledSmall = styled.small`
    font-size  : 1.1rem;
    color      : #DF7861;
    font-weight: bold;
`;

const StyledI = styled.i`
    font-size: 1.1rem;
`;

export default function DisplayedComment(props) {
    return (
            <StyledArticle>
                <StyledP>{props.comment.contenu}</StyledP>
                <Link 
                    to    = {routes.PROFILE + '/' + props.comment.auteur}
                    style = {{textDecoration: 'none'}}
                >
                    <StyledSmall>{props.comment.auteur}</StyledSmall>
                </Link>
                <StyledI>{props.comment.date}</StyledI>
            </StyledArticle>
        );
};