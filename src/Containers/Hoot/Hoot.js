// Librairies
import React, { useState, useEffect }   from 'react';
import axios                            from '../../config/axios-firebase';
import fire                             from '../../config/firebase';
import { toast }                        from 'react-toastify';
import { useNavigate, Link, useParams } from 'react-router-dom';
import routes                           from '../../config/routes';
import styled                           from 'styled-components';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    EmailIcon,
    LinkedinIcon,
    WhatsappIcon,
  } from "react-share";

// Composants
import DisplayedComments from '../../Components/DisplayedComments/DisplayedComments';
import Spinner           from '../../Components/UI/Spinner/Spinner';
import Button            from '../../Components/Button/Button';


// Styled Components
const StyledSection = styled.section`
    background    : #EFEFEF;
    height        : 100%;
    display       : flex;
    flex-direction: column;
    align-items   : center;
`;

const StyledH1 = styled.h1`
    font-size: 2.5rem;
    padding  : 15px;
`;

const StyledP = styled.p`
    font-size: 1.6rem;
    margin   : 10px;
`;

const StyledSmall = styled.small`
    font-size  : 1.1rem;
    color      : #DF7861;
    margin     : 10px;
    font-weight: bold;
`;

const StyledMainHoot = styled.main`
    background   : white;
    width        : 65vw;
    height       : auto;
    margin-top   : 30px;
    border-radius: 10px;
`;


export default function Hoot(props) {

    // State 
    const [hoot, setHoot] = useState({});
    const [comments, setComments] = useState([]);
    const [answer, setAnswer] = useState(false);
    const [ownerOfTheHoot, setOwnerOfTheHoot] = useState(false);
    const [loading, setLoading] = useState(false);

    const { slug }  = useParams();
    const navigate  = useNavigate();
    const userName = fire.auth().currentUser.displayName;

    // ComponentDidMount pour les hoots.
    useEffect(() => {
        axios.get('/hoots.json?orderBy="slug"&equalTo="' + slug + '"')
            .then(response => {

                if(Object.keys(response.data).length === 0) {
                    toast.error('Cet article n\'existe pas !', {position: 'bottom-right'});
                    navigate(routes.HOME);
                }

                for(let key in response.data) {
                    setHoot({
                        ...response.data[key],
                        id: key
                    });
                }
            })
            .catch(error => {
                console.log(error)
            });
    }, [navigate, slug]);

    useEffect(() => {
        if (userName === hoot.auteur) {
            setOwnerOfTheHoot(true);
        } else {
            setOwnerOfTheHoot(false);
        }
    }, [hoot.auteur, ownerOfTheHoot, userName]);

    // ComponentDidMount ?
    useEffect(() => {
        axios.get('/comment.json?orderBy="hootId"&equalTo="' + slug + '"')
            .then(response => {
                let commentsArray = [];
                for (let key in response.data) {
                    commentsArray.push({
                        ...response.data[key],
                        id: key
                    });
                }
                setComments(commentsArray);
            })
            .catch(error => {
                console.log(error)
            })
    }, [slug]);

    // Fonctions
    const deleteHoot = () => {
        const token = fire.auth().currentUser.getIdToken()
            .then(token => {
                axios.delete('/hoots/' +  hoot.id + '.json?auth=' + token)
                    .then(() => {
                        toast.success('Hoot supprimé avec succès !', {position: 'bottom-right'})
                        navigate(routes.DASHBOARD);
                    })
                    .catch(error => {
                        console.log(error)
                    })                
            }) 
            .catch(error => {
                console.log(error)
            }) 
    };    

    const commentSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let date = new Date();
        let hootId = slug;
        let content =  document.getElementById('content').value;

        const comment = {
            contenu  : content,
            hootId   :  hootId,
            auteur   : fire.auth().currentUser.displayName,
            date     : date.toLocaleString(navigator.language, {
                year  : 'numeric',
                month : 'numeric',
                day   : 'numeric',
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }),
            fireDate : Date.now()
        };

        if (content !== '') {
            axios.post('/comment.json', comment)
            .then(() => {
                setComments([...comments, comment]);
                toast.success('Commentaire ajouté avec succès !', {position: 'bottom-right'});
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });   
        } else {
            console.log('le contenu ne doit pas être vide')
            setLoading(false);
        }
    }
    
    
    const answerClickedHandler = () => {
        if (answer) {
            setAnswer(false)
        } else {
            setAnswer(true)
        }
    };

    const shareUrl = window.location.href; 


    return (
        <StyledSection>
            <StyledMainHoot>
                <StyledH1>Hoot</StyledH1>
                <StyledP>{hoot.contenu}</StyledP>
                <Link 
                    to    = {routes.PROFILE + '/' + hoot.auteur}
                    state = {hoot.proprietaire}
                    style = {{textDecoration: 'none'}}
                >
                    <StyledSmall>{hoot.auteur}</StyledSmall>
                </Link>

                <div>
                    <EmailShareButton
                        url     = {shareUrl}
                        quote   = {hoot.proprietaire}
                        hashtag = {'#HootingOwl'}
                        style   = {{margin: '15px'}}
                    >
                    <EmailIcon size={40} round={true} />
                    </EmailShareButton>            
                    
                    <FacebookShareButton
                        url     = {shareUrl}
                        quote   = {hoot.proprietaire}
                        hashtag = {'#HootingOwl'}
                        style   = {{margin: '15px'}}

                    >
                    <FacebookIcon size={40} round={true} />
                    </FacebookShareButton>

                    <LinkedinShareButton
                        url     = {shareUrl}
                        quote   = {hoot.proprietaire}
                        hashtag = {'#HootingOwl'}
                        style   = {{margin: '15px'}}

                    >
                    <LinkedinIcon size={40} round={true} />
                    </LinkedinShareButton>

                    <WhatsappShareButton
                        url     = {shareUrl}
                        quote   = {hoot.proprietaire}
                        hashtag = {'#HootingOwl'}
                        style   = {{margin: '8px'}}

                    >
                    <WhatsappIcon size={40} round={true} />
                    </WhatsappShareButton>
                </div>

                <Button 
                    onClick = {answerClickedHandler}
                    style  = {{margin: '10px'}}
                    >
                        { !answer ? 'Répondre' : 'Fermer' }
                </Button>            
                    
                {ownerOfTheHoot &&
                    <Link 
                        to    = {routes.MANAGEHOOTS}
                        state = {{ from: '/dashboard', hoot: hoot }}
                    >
                        <Button style={{color: '#205375', border: '2px solid #205375'}}>Modifier</Button>
                    </Link>
                }

            {ownerOfTheHoot &&
                <Button 
                    onClick = {deleteHoot}
                    style   = {{color: '#112B3C', border: '2px solid #112B3C', margin: '30px 10px'}}
                >Supprimer</Button>
            }

            {answer && 
                <form onSubmit={commentSubmit}>
                    <input 
                        type="text" 
                        id='content' 
                        style={{margin: '10px', borderRadius: '5px', padding: '10px'}}
                        placeholder='Votre réponse' 
                    />
                    <input
                        style={{margin: '10px', borderRadius: '5px', padding: '10px', background: '#205375', color: 'white', border: 'none'}} 
                        type="submit" />
                </form>
            }

        </StyledMainHoot>

            {loading ?
                <Spinner />
            :
                <DisplayedComments comments={comments} />
            }       
        </StyledSection>
    );
};