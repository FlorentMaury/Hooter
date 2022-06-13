// Librairies
import React     from 'react';
import fire      from '../../config/firebase';
import { toast } from 'react-toastify';


export default function Profile(props) {

    // Fonctions
    const updateProfile = () => {
        props.user.updateProfile({
            displayName: "Pomme",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            // Update successful
            // ...
            console.log(props.user.displayName)
            console.log(props.user.photoURL)
          }).catch((error) => {
            console.log(error)
          });
    }


    const formHandler = event => {
        event.preventDefault();
    }

    return (
        <div>
            <h2>Modifier votre profil</h2>
            <form onSubmit={formHandler} method='post'>
                <input 
                    type="text" 
                    placeholder={props.user.displayName}
                    name="userName" 
                />
                <input type="file" name="userImg"/>
                <button onClick={updateProfile}>Confirmer</button>
            </form>
        </div>
    );
};