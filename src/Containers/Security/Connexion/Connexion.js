// Librairies.
import React, { useState, useEffect } from 'react';
import { checkValidity }              from '../../../shared/utility';
import { useNavigate }                from 'react-router-dom';
import routes                         from '../../../config/routes';
import fire                           from '../../../config/firebase';
import { toast }                      from 'react-toastify';
import styled                         from 'styled-components';

// Composants.
import Input  from '../../../Components/UI/Input/Input';
import Button from '../../../Components/Button/Button';


// Styled Components.
const StyledConnexionLayout = styled.div`
    background     : #EFEFEF;
    height         : 100%;
    display        : flex;
    justify-content: center;
`;

const StyledH1 = styled.h1`
    font-size: 2.5rem;
    padding  : 50px 0;

    @media (max-width: 660px) {
           font-size: 2rem;
           padding  : 10px;
        }
`;

const StyledConnexionCard = styled.div`
    border-radius  : 10px;
    background     : #EFEFEF;
    width          : 60vw;
    display        : flex;
    flex-direction : column;
    align-items    : center;
    padding-top    : 80px;

    @media (max-width: 815px) {
           width  : 80vw;
           padding: 15px;
        }

    @media (max-width: 590px) {
           width  : 90vw;
           padding: 10px;
        }
`;

const StyledForm = styled.form`
    height: 40vh;
`;

const StyledBlueCard = styled.div`
    margin-top   : 20px;
    width        : 33%;
    border-radius: 10px;
    background   : white;
    box-shadow   : 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

// Authentification.
export default function Authentification(props) {

    // ComponentDidUpdate.
    useEffect(() => {
        document.title = 'Hooter | Authentification';
    });

    const navigate = useNavigate();

    // States.
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

        // Méthodes .
            // checkValidity.

        const inputChangedHandler = (event, id) => {

            // Change la valeur.
            const newInputs = {...inputs};
            newInputs[id].value = event.target.value;
            newInputs[id].touched = true;
    
            // Vérification de la valeur.
            newInputs[id].valid = checkValidity(event.target.value, newInputs[id].validation);
    
            setInputs(newInputs);
    
            // Vérification du formulaire.
            let formIsValid = true;
            for (let input in newInputs) {
                formIsValid = newInputs[input].valid && formIsValid;
            };
            setValid(formIsValid);
        };

        // Requête pour l'inscription.
        const registerClickedHandler = () => {
            const user = {
                email   : inputs.email.value,
                password: inputs.password.value
            };

            fire
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    fire.auth().currentUser.updateProfile({
                        displayName: 'John Doe',
                        photoURL: 'https://urlz.fr/iDgB'
                    });
                    toast('Bienvenue !', {position: 'bottom-right'});
                    navigate(routes.DASHBOARD);
                    toast.info('Veuillez renseigner votre pseudo ainsi que votre image de profil dans l\'onglet \'Paramètres\'.', {position: 'bottom-right'});
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

        // Requête pour la connexion.
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

        // Mot de passe oublié ?
        const renewPasswordHandler = () => {

            if (inputs.email.value !== 0) {
                fire.auth().sendPasswordResetEmail(inputs.email.value)
                    .then(() => {
                        toast('Email de réinitialisation envoyé à ' + inputs.email.value + ' !', {position: 'bottom-right'});
                    })
                    .catch((error) => {
                        // let errorCode = error.code;
                        // let errorMessage = error.message;
                        // console.log(errorCode, errorMessage)
                        toast.error('Veuillez renseigner votre email.', {position: 'bottom-right'})
                })          
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
        <StyledForm onSubmit={formHandler}>
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
                    style        = {{margin: '10px', borderRadius: '5px', border: "3px solid #EFEFEF", padding: '10px', width: '300px'}}
                />
            ))}

            <div>
                <Button
                    onClick   = {loginClickedHandler}
                    disabled  = {!valid} 
                    style     = {{marginTop: '40px', width: '300px'}}
                >
                    Connexion
                </Button> 
                <Button
                    onClick  = {registerClickedHandler}
                    disabled = {!valid} 
                    style    = {{background: '#205375', border: '2px solid #205375', color: 'white', marginTop: '8px', width: '300px'}}
                >
                    Inscription
                </Button>

                <Button 
                    onClick = {renewPasswordHandler} 
                    style   = {{border: 'none', color: '#205375', fontSize: '.9rem'}}
                    id      = "renewPassword"    
                >
                    Mot de passe oublié ?
                </Button>

            </div>
        </StyledForm>
    );
    

    // Render.
    return (
        <StyledConnexionLayout>
            <StyledConnexionCard>
                <StyledBlueCard>
                    <StyledH1>S'identifier</StyledH1>
                    <div>
                        {emailError && <div>Cette adresse email est déjà utilisée.</div>}
                        {loginError && <div>Impossible de vous authentifier.</div>}
                        {form}

                    </div>
                </StyledBlueCard>
            </StyledConnexionCard>
        </StyledConnexionLayout>
    );
};