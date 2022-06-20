// Librairies
import React    from 'react';
import { Link } from 'react-router-dom';
import routes   from '../../../config/routes';
import styled   from 'styled-components';

// Styled Components
const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
`;

const StyledP = styled.p`
    font-size: 1.1rem;
    margin-top: 10px;
`;

const StyledSmall = styled.small`
    font-size: 1.1rem;
    color    : #DF7861;
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