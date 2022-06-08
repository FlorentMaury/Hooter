// Librairies
import React from 'react';

// Composants
import NavigationItem from './NavigationItem/NavigationItem';

export default function Navigation() {
    return (
        <ul >
        <NavigationItem to='/'>Accueil</NavigationItem>
        <NavigationItem to='/'>Articles</NavigationItem>
        <NavigationItem to='/'>Contact</NavigationItem>
        <NavigationItem to='/'>Authentification</NavigationItem>
        <NavigationItem to='/'>Ajouter</NavigationItem>
        <button>Déconnexion</button>
    </ul>
    );
};