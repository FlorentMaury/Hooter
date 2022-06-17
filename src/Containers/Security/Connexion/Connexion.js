// Librairies
import React, { useState, useEffect } from 'react';
import { checkValidity }              from '../../../shared/utility';
import { useNavigate }                from 'react-router-dom';
import routes                         from '../../../config/routes';
import fire                           from '../../../config/firebase';
import { toast }                      from 'react-toastify';

// Composants
import Input from '../../../Components/UI/Input/Input';

export default function Authentification() {

    // ComponentDidUpdate
    useEffect(() => {
        document.title = 'Authentification';
    });

    const navigate = useNavigate();

    // States
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [valid, setValid]           = useState(false);
    const [inputs, setInputs]         = useState({
        email: {
            elementType  : 'input',
            elementConfig: {
                type       : 'email',
                placeholder: 'Email'
            },
            value     : '',
            label     : 'Adresse email',
            valid     : false,
            validation: {
                required: true,
                email   : true
            },
            touched     : false,
            errorMessage: 'L\'adresse email n\'est pas valide'
        },
        password: {
            elementType  : 'input',
            elementConfig: {
                type       : 'password',
                placeholder: 'Mot de passe'
            },
            value     : '',
            label     : 'Mot de passe',
            valid     : false,
            validation: {
                required : true,
                minLength: 6
            },
            touched     : false,
            errorMessage: 'Le mot de passe doit être d\'au moins 6 caractères.'
        },
    });

        // Méthodes 
            // checkValidity

        const inputChangedHandler = (event, id) => {

            // Change la valeur
            const newInputs = {...inputs};
            newInputs[id].value = event.target.value;
            newInputs[id].touched = true;
    
            // Vérification de la valeur
            newInputs[id].valid = checkValidity(event.target.value, newInputs[id].validation);
    
            setInputs(newInputs);
    
            // Vérification du formulaire
            let formIsValid = true;
            for (let input in newInputs) {
                formIsValid = newInputs[input].valid && formIsValid;
            };
            setValid(formIsValid);
        };

        const registerClickedHandler = () => {
            const user = {
                email   : inputs.email.value,
                password: inputs.password.value
            };

            fire
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    toast('Bienvenue !', {position: 'bottom-right'});
                    navigate(routes.DASHBOARD);
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            setEmailError(true);
                            break;
                    
                        default:
                            break;
                    }
                });
        };

        const loginClickedHandler = () => {
            const user = {
                email   : inputs.email.value,
                password: inputs.password.value
            };
            
            fire
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    toast.success('Vous êtes de retour ' + fire.auth().currentUser.displayName + ' !', {position: 'bottom-right'});
                    navigate(routes.DASHBOARD);
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalide-email':
                        case 'auth/user-disabled':
                        case 'auth/user-not-found':
                            setLoginError(true);
                            break;
                    
                        default:
                            break;
                    }
                });
        };

        const renewPasswordHandler = () => {
            if (inputs.email.value !== 0) {
                fire.auth().sendPasswordResetEmail(inputs.email.value)
                    .then(() => {
                        toast('Email de réinitialisation envoyé à ' + inputs.email.value + ' !', {position: 'bottom-right'});
                    })
                    .catch((error) => {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        console.log(errorCode, errorMessage)
                })          
            } else {
                toast('Veuillez renseigner votre email.');
            }

        };

        const formHandler = event => {
            event.preventDefault();
        }

            // Variables
    const formElementArray = [];

    for (let key in inputs) {
        formElementArray.push({
            id    : key,
            config: inputs[key]
        });
    };

    let form = (
        <form onSubmit={formHandler}>
            {formElementArray.map(formElement => (
                <Input
                    key          = {formElement.id}
                    id           = {formElement.id}
                    value        = {formElement.config.value}
                    label        = {formElement.config.label}
                    type         = {formElement.config.elementType}
                    config       = {formElement.config.elementConfig}
                    valid        = {formElement.config.valid}
                    touched      = {formElement.config.touched}
                    errorMessage = {formElement.config.errorMessage}
                    changed      = {(e) => inputChangedHandler(e, formElement.id)}
                />
            ))}
            <div>
                <button
                    onClick  = {registerClickedHandler}
                    disabled = {!valid} 
                    >Inscription</button>
                <button
                    onClick   = {loginClickedHandler}
                    disabled  = {!valid} 
                    >Connexion</button>
            </div>
        </form>
    );

    return (
        <>
            <h1>Authentification</h1>
            <div>
                {emailError && <div>Cette adresse email est déjà utilisée.</div>}
                {loginError && <div>Impossible de vous authentifier.</div>}
                {form}
                <button onClick={renewPasswordHandler}>Mot de passe oublié ?</button>
            </div>
        </>
    );
};