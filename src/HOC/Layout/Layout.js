// Librairies
import React from 'react';

// Composants
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

export default function Layout(props) {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
};