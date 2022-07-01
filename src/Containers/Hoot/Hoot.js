// Librairies.
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

// Composants.
import DisplayedComments from '../../Components/DisplayedComments/DisplayedComments';
import Spinner           from '../../Components/UI/Spinner/Spinner';
import Button            from '../../Components/Button/Button';
import Modal             from '../../Components/UI/Modal/Modal';


// Styled Components.
const StyledSection = styled.section`
    background    : #EFEFEF;
    height        : 100%;
    display       : flex;
    flex-direction: column;
    align-items   : center;
`;

const StyledP = styled.p`
    font-size: 1.6rem;
    margin   : 10px;

    @media (max-width: 815px) {
           font-size: 1.4rem;
        }
`;

const StyledSmall = styled.small`
    font-size  : 1.4rem;
    color      : #DF7861;
    margin     : 15px;
    font-weight: bold;
`;

const StyledMainHoot = styled.main`
    background   : white;
    width        : 60vw;
    height       : auto;
    margin-top   : 30px;
    border-radius: 10px;
    
    @media (max-width: 1000px) {
           width: 90vw;
        }
`;

const StyledImg = styled.img`
    vertical-align: middle;
    width         : 60px;
    height        : 60px;
    border-radius : 50%;
    margin-right  : 10px;
`;

const StyledDiv = styled.div`
    align-items   : center;
    color         : black;
    margin        : 15px;
    border-bottom : 1px solid rgba(0, 0, 0, .2);
    border-top    : 1px solid rgba(0, 0, 0, .2);
`;

const StyledHootImg = styled.img`
    width        : 30%;
    border-radius: 3px;
    border       : 1px solid #CCC;
    margin       : 10px;
`;

const StyledH3 = styled.h3`
    font-size    : 1.5rem;
    padding      : 15px;
    border-bottom: 1px solid #ebebeb;
    text-align   : start;
    font-weight  : 500;
    color        : #205375;
    background   : rgba(235,235,235, .6);;
`; 

const StyledProfile = styled.div`
    margin         : 3vh;
    display        : flex;
    justify-content: center;
    align-items    : center;
`;

const StyledInteractiveDiv = styled.div`
    display        : flex;
    align-items    : center;
    justify-content: center;

        @media (max-width: 550px) {
            flex-wrap: wrap;
            }
`;


// Hoot.
export default function Hoot(props) {


    // State.
    const [hoot, setHoot]       = useState({});
    const [share, setShare]       = useState([]);
    const [answer, setAnswer]       = useState(false);
    const [loading, setLoading]       = useState(false);
    const { slug }                  = useParams();
    const navigate                = useNavigate();
    const userName                  = fire.auth().currentUser.displayName;
    const [comments, setComments]      = useState([]);
    const [userLiked, setUserLiked]       = useState(null);
    const [manageHoot, setManageHoot]        = useState(false);
    const [ownerOfTheHoot, setOwnerOfTheHoot] = useState(false);

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



    // ComponentDidMount ? pour les commentaires.
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
                console.log(commentsArray)
                commentsArray.sort((a, b) => {
                    return a.fireDate - b.fireDate;
                });
                setComments(commentsArray);
            })
            .catch(error => {
                console.log(error)
            })
    }, [slug]);

    // Fonctions.

    // Supprimer un hoot.
    const deleteHoot = () => {
        setLoading(true);
        const token = fire.auth().currentUser.getIdToken()
            .then(token => {
                axios.delete('/hoots/' +  hoot.id + '.json?auth=' + token)
                    .then(() => {
                        // axios.delete('/comment.json?where="hootId"equalTo="' + slug + '"')
                        // .then((response) => {console.log(response)})
                        // .catch((error) => {console.log(error)})
                        setLoading(false);
                        toast.success('Hoot supprimé avec succès !', {position: 'bottom-right'})
                        navigate(routes.DASHBOARD);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    })                

            }) 
            .catch(error => {
                console.log(error);
                setLoading(false);
            }) 
    };    

    // Commenter un hoot.
    const commentSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let date    = new Date();
        let hootId  = slug;
        let content =  document.getElementById('content').value;

        const comment = {
            contenu  : content,
            hootId   : hootId,
            auteur   : fire.auth().currentUser.displayName,
            auteurImg: fire.auth().currentUser.photoURL,
            fireDate : Date.now(),
            date     : date.toLocaleString(navigator.language, {
                year  : 'numeric',
                month : 'numeric',
                day   : 'numeric',
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            })
        };

        if (content !== '') {
            axios.post('/comment.json', comment)
            .then(() => {
                setComments([...comments, comment]);
                toast.success('Commentaire ajouté avec succès !', {position: 'bottom-right'});
                setLoading(false);
                setAnswer(!answer);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });   
        } else {
            console.log('le contenu ne doit pas être vide')
            setLoading(false);
        }
    };

    // Récupérer les likes.
    useEffect(() => {
        axios.get('/like/' + slug + '/'+ fire.auth().currentUser.uid + '.json')
        .then(response => {
            if (response.data !== null) {
                setUserLiked(true);
            } else {
                setUserLiked(false);
            }
        })
            .catch(error => {
                console.log(error)
            })
    }, [slug]);

    // Liker un hoot.
    const like = event => {
        event.preventDefault();
        setUserLiked(true);
        setLoading(true);
        const like = {
            hootId: slug,
            lover : fire.auth().currentUser.uid
        };

        axios.post('/like/' + slug + '/'+ fire.auth().currentUser.uid + '.json', like)
            .then(() => {
                toast('Article liké !', {position: 'bottom-right'});
                setLoading(false);
            })
            .catch(error => {console.log(error)});
            setLoading(false);
    };
    
    // Disliker un hoot.
    const unLike = event => {
        event.preventDefault();
        setUserLiked(false);
        setLoading(true);
        axios.delete('/like/' + slug + '/'+ fire.auth().currentUser.uid + '.json')
            .then(() => {
                toast.error('Vous n\'aimez plus cette article !', {position: 'bottom-right'});
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            }); 
    };

    // Fonctions
    const answerClickedHandler = () => {
        setAnswer(!answer);
    };

    const shareClickedHandler = () => {
        setShare(!share);
    };

    const manageHootHandler = () => {
        setManageHoot(!manageHoot);
    };

    // Nom de la page.
    useEffect(() => {
        document.title = 'Hooter | Hoot de ' + hoot.auteur;
    });


    // Variables.
    const shareUrl = window.location.href; 

    const interactiveButtons = {
        margin: '3px', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        width: '160px',
        height: '40px',
        marginBottom: '20px',
        border: 'none',
        background: '#205375',
        color: 'white',
    };

    // Render
    return (
        <StyledSection>

            {loading ? 

            <Spinner />

            :

            <>

                <StyledMainHoot>
                    <StyledProfile>
                        <Link 
                            to    = {routes.PROFILE + '/' + hoot.auteur}
                            state = {hoot}
                            style = {{textDecoration: 'none'}}
                        >
                            <StyledImg src={hoot.auteurImg} alt='avatar'></StyledImg>
                            <StyledSmall>{hoot.auteur}</StyledSmall>
                        </Link>
                    </StyledProfile>

                    <StyledDiv>
                        <StyledP>{hoot.contenu}</StyledP>
                        {hoot.articleImg &&
                            <StyledHootImg  src={hoot.articleImg} alt="Image de l'article" />
                        }
                    </StyledDiv>

                    <StyledInteractiveDiv>

                        { userLiked ?
                            <>                   
                                <Button 
                                    onClick = {unLike} 
                                    style   = {interactiveButtons}
                                >
                                    <span 
                                        className="material-symbols-outlined" 
                                        style={{color: 'red'}}
                                    >
                                        favorite
                                    </span>
                                        <p>&nbsp;Je n'aime plus</p>
                                </Button>
                            </>
                            :     
                            <>                 
                                <Button 
                                    onClick = {like} 
                                    style   = {interactiveButtons}
                                >
                                    <span 
                                        className="material-symbols-outlined" 
                                    >
                                        favorite
                                    </span>
                                            <p>&nbsp;J'aime</p>
                                </Button>
                            </>
                        }

                        { ownerOfTheHoot &&
                            <Button 
                                    onClick = {manageHootHandler} 
                                    style   = {interactiveButtons}
                            >
                                <span 
                                    className="material-symbols-outlined" 
                                >
                                    settings
                                </span>
                                        <p>&nbsp;Paramètres</p>
                            </Button>
                        }

                    <Button 
                        onClick = {answerClickedHandler}
                        style   = {interactiveButtons}
                        >
                            { !answer ? 
                            <>
                                <span className="material-symbols-outlined">
                                    reply
                                </span>
                                    <p>&nbsp; Répondre</p>
                            </> 
                            : 
                            <>
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                                    <p>&nbsp; Fermer</p>
                            </>  
                            }
                    </Button>  

                    <Button 
                        onClick = {shareClickedHandler}
                        style   = {interactiveButtons}
                        >
                            { share ?
                                <>
                                    <span className="material-symbols-outlined">
                                        share
                                    </span>
                                        <p>&nbsp; Partager</p>
                                 </>  
                            : 
                                <>
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                        <p>&nbsp; Fermer</p>
                                </> 
                            }
                    </Button> 

                </StyledInteractiveDiv>



                    {!share &&
                        <div>
                            <EmailShareButton
                                url     = {shareUrl}
                                quote   = {hoot.proprietaire}
                                hashtag = {'#HootingOwl'}
                                style   = {{margin: '5px'}}
                            >
                            <EmailIcon size={40} round={true} />
                            </EmailShareButton>            
                            
                            <FacebookShareButton
                                url     = {shareUrl}
                                quote   = {hoot.proprietaire}
                                hashtag = {'#HootingOwl'}
                                style   = {{margin: '5px'}}

                            >
                            <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>

                            <LinkedinShareButton
                                url     = {shareUrl}
                                quote   = {hoot.proprietaire}
                                hashtag = {'#HootingOwl'}
                                style   = {{margin: '5px'}}

                            >
                            <LinkedinIcon size={40} round={true} />
                            </LinkedinShareButton>

                            <WhatsappShareButton
                                url     = {shareUrl}
                                quote   = {hoot.proprietaire}
                                hashtag = {'#HootingOwl'}
                                style   = {{margin: '5px'}}

                            >
                            <WhatsappIcon size={40} round={true} />
                            </WhatsappShareButton>
                        </div>
                    }

                    {answer && 
                        <form onSubmit={commentSubmit}>
                            <input 
                                type="text" 
                                id='content' 
                                style={{margin: '8px', borderRadius: '5px', padding: '10px'}}
                                placeholder='Votre réponse' 
                            />
                            <input
                                style={{margin: '8px', borderRadius: '5px', padding: '10px', background: '#205375', color: 'white', border: 'none'}} 
                                type="submit" />
                        </form>
                    }

                </StyledMainHoot>

                { manageHoot &&
                    <Modal>

                        <StyledH3>Parametres</StyledH3>

                        <Link 
                            to    = {routes.MANAGEHOOTS}
                            state = {{ from: '/dashboard', hoot: hoot }}
                        >
                            <Button style={{color: '#205375', border: '2px solid #205375'}}>Modifier</Button>
                        </Link>

                        <Button 
                            onClick = {deleteHoot}
                            style   = {{color: 'white', background: '#F66B0E', margin: '30px 10px'}}
                        >
                            Supprimer
                        </Button>

                        <Button 
                            onClick={manageHootHandler}
                            style={{color: '#205375', position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', border: 'none'}}
                        >   

                        <span class="material-symbols-outlined">close</span>
                        </Button>
                    </Modal>
        }

                <DisplayedComments comments={comments} />
            </>
            
            }

        </StyledSection>
    );
};