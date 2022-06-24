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
    background    : white;
    width: 68vw;
    border-radius: 10px;
`;

const StyledP = styled.p`
    font-size: 1.4rem;
    padding  : 10px;
    width: 80%;
    letter-spacing: -0.05rem;
`;

const StyledSmall = styled.small`
    font-size    : 1.1rem;
    color        : #DF7861;
    font-weight  : bold;
`;

const StyledSpan = styled.span`
    padding   : 10px 30px;
    align-self : flex-end;
    color: #bbb;
    font-size: .8em;
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