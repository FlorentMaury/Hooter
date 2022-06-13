// Librairies
import React, { useState, useEffect } from 'react';
import { Routes, Route }              from 'react-router-dom';
import routes                         from './config/routes';
import fire                           from './config/firebase';
import './App.css';

// Composants
import Layout      from './HOC/Layout/Layout';
import Home        from './Containers/Home/Home';
import Connexion   from './Containers/Security/Connexion/Connexion';
import Dashboard   from './Containers/Dashboard/Dashboard';
import NotFound    from './Components/NotFound/NotFound';
import Contact     from './Components/Contact/Contact';
import ManageHoots from './Containers/Admin/ManageHoots/ManageHoots';
import Profile     from './Containers/Profile/Profile';

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
                    { !user && <Route path={routes.CONNEXION} element={ <Connexion /> } /> }
                    { user && <Route path={routes.PROFILE}    element={ <Profile user={user} /> } /> }
                    { user &&  <Route path={routes.DASHBOARD} element={ <Dashboard user={user} /> } > 
                        <Route path={routes.MANAGEHOOTS}      element={ <ManageHoots user={user} /> } />
                    </Route> }
                    <Route path={routes.CONTACT}   element= { <Contact /> } />
                    <Route path='*'                element={ <NotFound /> } />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
