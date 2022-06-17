// Librairies
import React           from 'react';
import routes          from '../../../config/routes';
import fire            from '../../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


// Composants
import NavigationItem from './NavigationItem/NavigationItem';

export default function Navigation(props) {

    const navigate = useNavigate();

    // Fonction
    const logoutClickedHandler = () => {
        fire.auth().signOut();
        toast('Á bientôt !', {position: 'bottom-right'});
        navigate(routes.HOME);
    }

    return (
        <ul >
            { !props.user && <NavigationItem to={routes.HOME}>Accueil</NavigationItem> }
            { props.user && <NavigationItem to={routes.DASHBOARD}>Dashboard</NavigationItem> }
            { props.user && <NavigationItem to={routes.MANAGEPROFILE}>Paramètres</NavigationItem> }
            <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>
            { props.user && <button onClick={logoutClickedHandler}>Déconnexion</button> }
        </ul>
    );
};