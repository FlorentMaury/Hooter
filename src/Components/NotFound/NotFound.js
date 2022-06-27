// Librairies.
import React           from 'react';
import routes          from '../../config/routes';
import { useNavigate } from 'react-router-dom';
import styled          from 'styled-components';

// Composants.
import Button from '../Button/Button';

// Styled Components
const StyledDiv = styled.div`
    background: #EFEFEF;
    height    : 100%;
    padding   : 30px;
`;

const StyledH1 = styled.h1`
    margin: 30px;
`;

// Not Found.
export default function NotFound() {
    
    // Variables.
    const navigate = useNavigate();

    // Fonctions.
    const backToHome = () => {
        navigate(routes.HOME);
    }

    // Render.
    return (
        <StyledDiv>
            <StyledH1>Oups, cette page n'existe pas !</StyledH1>
            <Button onClick = {backToHome}> Retour à l'acceuil</Button>
        </StyledDiv>
    );
};