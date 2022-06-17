// Librairies
import React, { useState, useEffect }   from 'react';
import axios                            from '../../config/axios-firebase';
import fire                             from '../../config/firebase';
import { toast }                        from 'react-toastify';
import { useNavigate, Link, useParams } from 'react-router-dom';
import routes                           from '../../config/routes';
import { genSlug }                      from '../../shared/utility';
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
                // window.location.reload()
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
        <>
            <h1>Hoot</h1>
            <p>{hoot.contenu}</p>
            <Link 
                to={routes.PROFILE + '/' + hoot.auteur}
                owner = {hoot.proprietaire}
            >
                <small>{hoot.auteur}</small>
            </Link>

            <div>
                <EmailShareButton
                    url={shareUrl}
                    quote={'Title or jo bhi aapko likhna ho'}
                    hashtag={'#portfolio...'}
                >
                <EmailIcon size={40} round={true} />
                </EmailShareButton>            
                
                <FacebookShareButton
                    url={shareUrl}
                    quote={'Title or jo bhi aapko likhna ho'}
                    hashtag={'#portfolio...'}
                >
                <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <LinkedinShareButton
                    url={shareUrl}
                    quote={'Title or jo bhi aapko likhna ho'}
                    hashtag={'#portfolio...'}
                >
                <LinkedinIcon size={40} round={true} />
                </LinkedinShareButton>

                <WhatsappShareButton
                    url={shareUrl}
                    quote={'Title or jo bhi aapko likhna ho'}
                    hashtag={'#portfolio...'}
                >
                <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
            </div>

            <button onClick={answerClickedHandler}>
                    { !answer ? 'Répondre' : 'Fermer' }
                </button>            
                
                {ownerOfTheHoot &&
                <Link 
                to={routes.MANAGEHOOTS}
                state={{ from: '/dashboard', hoot: hoot }}
                >
                    <button>Modifier</button>
                </Link>
            }
            {ownerOfTheHoot &&
                <button onClick={deleteHoot}>Supprimer</button>
            }

            {answer && 
                <form onSubmit={commentSubmit}>
                    <input type="text" id='content' placeholder='Votre réponse' />
                    <input type="submit" />
                </form>
            }

            {loading ?
                <Spinner />
            :
                <DisplayedComments comments={comments} />
            }       
        </>
    );
};