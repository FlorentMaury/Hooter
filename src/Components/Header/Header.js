// Librairies
import React from 'react';

// Composants
import Navigation from './Navigation/Navigation';

export default function Header() {
    return (
        <header>
        <div>
            <div>
                BLOGOS
            </div> 
            <nav>
                <Navigation />
            </nav>
        </div>
    </header>
    );
};