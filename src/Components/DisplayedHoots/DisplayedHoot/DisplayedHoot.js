// Librairies
import React    from 'react';
import routes   from '../../../config/routes';
import { Link } from 'react-router-dom';
import styled   from 'styled-components';
import fire     from '../../../config/firebase';


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
    font-weight  : bold;
`;

const StyledSpan = styled.span`
    font-style: italic;
    margin    : 5px;
    padding   : 10px 0;
`;

const StyledImg = styled.img`
    vertical-align: middle;
    width         : 50px;
    height        : 50px;
    border-radius : 50%;
    margin-right  : 10px;
`;

const StyledProfile = styled.div`
    border-bottom: 1px solid #cccccce0;
    padding      : 10px;
    width        : 950px;
`;



function DisplayedHoot(props) {

    // Render
    return (
        <Link 
            to={routes.HOOT + '/' + props.hoot.slug}
            style={{textDecoration: 'none'}}
        >
            <StyledDiv>
                <StyledProfile>
                    <StyledImg 
                        src={props.hoot.userImg} 
                        alt='Image du profil'
                    />
                    <StyledSmall>{props.hoot.auteur}</StyledSmall>
                </StyledProfile>
                <StyledP>{props.hoot.contenu}</StyledP>
                <StyledSpan>{props.hoot.date}</StyledSpan>
            </StyledDiv>
        </Link>
    );
};

export default DisplayedHoot;