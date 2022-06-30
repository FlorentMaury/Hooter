// Librairies.
import React, { useState, useEffect } from 'react';
import styled                         from 'styled-components';
import { Link }                       from 'react-router-dom';
import routes                         from '../../../config/routes';
import axios                          from '../../../config/axios-firebase';

// Styled Components.
const StyledDiv = styled.div`
    display       : flex;
    flex-direction: column;
    align-items   : center;
    color         : black;
    margin        : 15px;
    border-bottom : 1px solid rgba(0, 0, 0, .2);
    border        : 1px solid #cccccce0;
    background    : white;
    width         : 250px;
    border-radius: 10px;
        
    @media (max-width: 950px) {
           width  : 80vw;
           padding: 15px;
        }

    @media (max-width: 590px) {
           width  : 90vw;
           padding: 10px;
        }
`;

const StyledP = styled.p`
    font-size     : 1.4rem;
    padding       : 30px;
    width         : 80%;
    letter-spacing: -0.05rem;
`;

const StyledSmall = styled.small`
    font-size    : 1.1rem;
    color        : #DF7861;
    font-weight  : bold;
`;

const StyledSpan = styled.span`
    padding   : 5px 30px;
    align-self: flex-end;
    color     : #BBB;
    font-size : .8em;
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
    width        : 90%;

    @media (max-width: 1050px) {
            width : 90%;
        }
`;

const StyledHootImg = styled.img`
    width        : 30%;
    border-radius: 3px;
    border       : 1px solid #CCC;
    margin-bottom: 30px;
`;

const StyledNumberOfComments = styled.div`
    display: flex;
    padding: 0 30px;
    opacity: 0.6;

`;

export default function DisplayedFollower(props) {

    // State
    const [numberOfComments, setNumberOfComments] = useState(null);
    const [numberOfLikes, setNumberOfLikes]       = useState(null);

    // UseEffect pour récupérer le nombre de commentaires.
    useEffect(() => {
        axios.get('/comment.json?orderBy="hootId"&equalTo="' + props.element.slug + '"')

            .then(response => {
                let commentsArray = [];
                for (let key in response.data) {
                    commentsArray.push({
                        ...response.data[key],
                        id: key
                    });
                }
                setNumberOfComments(commentsArray.length)
            })

            .catch(error => {console.log(error)});
    }, [props.element.slug]);

    // UseEffect pour récupérer le nombre de likes.
    useEffect(() => {
        axios.get('/like/' + props.element.slug + '.json')

            .then(response => {
                let commentsArray = [];
                for (let key in response.data) {
                    commentsArray.push({
                        ...response.data[key],
                        id: key
                    });
                }
                setNumberOfLikes(commentsArray.length)
            })
            
            .catch(error => {console.log(error)})
    }, [props.element.slug]);

    return (
        <Link 
            to={routes.HOOT + '/' + props.element.slug}
            style={{textDecoration: 'none', display: 'inline-block'}}
        >
            <StyledDiv>
                <StyledProfile>
                    <StyledImg 
                        src={props.element.auteurImg} 
                        alt='Image du profil'
                    />
                    <StyledSmall>{props.element.auteur}</StyledSmall>
                </StyledProfile>
                <StyledP>{props.element.contenu}</StyledP>
                {props.element.articleImg &&
                <StyledHootImg src={props.element.articleImg} alt='Image de larticle' />
                }
                
                <StyledNumberOfComments>
                    <span className="material-symbols-outlined">
                        comment
                    </span>
                    <p>&nbsp; {numberOfComments} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <span className="material-symbols-outlined">
                    favorite
                    </span>
                    <p>&nbsp; {numberOfLikes} &nbsp;</p>

                </StyledNumberOfComments>

                <StyledSpan>{props.element.date}</StyledSpan>
            </StyledDiv>
        </Link>
    );
};