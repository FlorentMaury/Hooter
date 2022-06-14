// Librairies
import React, { useState, useEffect } from 'react';
import axios                          from '../../config/axios-firebase';
import { useParams }                  from 'react-router-dom';
import fire                           from '../../config/firebase';
import { toast }                      from 'react-toastify';
import { useNavigate, Link }          from 'react-router-dom';
import routes                         from '../../config/routes';
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

export default function Hoot() {

    // State 
    const [hoot, setHoot] = useState({});
    const [ownerOfTheHoot, setOwnerOfTheHoot] = useState(false);

    const { slug }  = useParams();
    const navigate  = useNavigate();
    const userEmail = fire.auth().currentUser.displayName;

    // ComponentDidMount
    useEffect(() => {
        axios.get('/hoots.json?orderBy="slug"&equalTo="' + slug + '"')
            .then(response => {

                if(Object.keys(response.data).length === 0) {
                    toast.error('Cet article n\'existe pas !');
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
        if (userEmail === hoot.auteur) {
            setOwnerOfTheHoot(true);
        } else {
            setOwnerOfTheHoot(false);
        }
    }, [hoot.auteur, ownerOfTheHoot, userEmail]);

    // Fonctions
    const deleteHoot = () => {
        
        const token = fire.auth().currentUser.getIdToken()
            .then(token => {
                axios.delete('/hoots/' +  hoot.id + '.json?auth=' + token)
                    .then(() => {
                        toast.success('Article supprimé avec succès !')
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

    const shareUrl = 'www.google.com';

    return (
        <>
            <h1>Hoot</h1>
            <p>{hoot.contenu}</p>
            <small>{hoot.auteur}</small>

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

            <button>Commenter</button>
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
        </>
    );
};