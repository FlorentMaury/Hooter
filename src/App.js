// Librairies
import React             from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Composants
import Layout from './HOC/Layout/Layout';
import Home   from './Containers/Home/Home';

function App() {

    // State
    // const [user, setUser] = useState('');

    // ComponentDidMount
    // useEffect(() => {
    //     authListener();
    // }, []);

    // const authListener = () => {
    //     fire.auth().onAuthStateChanged(user => {
    //         if(user) {
    //             setUser(user);
    //         } else {
    //             setUser('');
    //         }
    //     });
    // };

    return (
        <div className="App">
            <Layout>
                <Routes>
                    <Route path='/' element={ <Home /> } />
                </Routes>
            </Layout>
        </div>
    );
}

export default App;
