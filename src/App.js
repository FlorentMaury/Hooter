// Librairies
import React, { useState, useEffect } from 'react';
import { Routes, Route }              from 'react-router-dom';
import routes                         from './config/routes';
import fire                           from './config/firebase';
import './App.css';

// Composants
import Layout        from './HOC/Layout/Layout';
import Home          from './Containers/Home/Home';
import Connexion     from './Containers/Security/Connexion/Connexion';
import Dashboard     from './Containers/Dashboard/Dashboard';
import NotFound      from './Components/NotFound/NotFound';
import Contact       from './Components/Contact/Contact';
import ManageHoots   from './Containers/Admin/ManageHoots/ManageHoots';
import ManageProfile from './Containers/Admin/ManageProfile/ManageProfile';
import Hoot          from './Containers/Hoot/Hoot';
import Profile       from './Containers/Admin/Profile/Profile';

function App() {

    // State
    const [user, setUser] = useState('');

    // ComponentDidMount
    useEffect(() => {
        authListener();
    }, []);

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if(user) {
                setUser(user);
            } else {
                setUser('');
            }
        });
    };

    return (
        <div className="App">
            <Layout user={user}>
                <Routes>
                    <Route path={routes.HOME}      element={ <Home /> } />
                    { !user && <Route path={routes.CONNEXION}       element={ <Connexion /> } /> }
                    { user && <Route path={routes.MANAGEPROFILE}    element={ <ManageProfile user={user} /> } /> }
                    { user && <Route path={routes.DASHBOARD}        element={ <Dashboard user={user} /> } /> }
                    { user && <Route path={routes.PROFILE + '/:id'} element={ <Profile user={user} /> } /> }
                    { user && <Route path={routes.HOOT + '/:slug'}  element={ <Hoot user={user} /> } /> }
                    <Route path={routes.MANAGEHOOTS}                element={ <ManageHoots /> } />
                    <Route path={routes.CONTACT}                    element={ <Contact /> } />
                    <Route path='*'                                 element={ <NotFound /> } />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
