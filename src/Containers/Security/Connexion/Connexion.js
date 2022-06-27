// Librairies
import React, { useState, useEffect } from 'react';
import { checkValidity }              from '../../../shared/utility';
import { useNavigate }                from 'react-router-dom';
import routes                         from '../../../config/routes';
import fire                           from '../../../config/firebase';
import { toast }                      from 'react-toastify';
import styled                         from 'styled-components';

// Composants
import Input  from '../../../Components/UI/Input/Input';
import Button from '../../../Components/Button/Button';


// Styled Components
const StyledConnexionLayout = styled.div`
    background     : #EFEFEF;
    height         : 100%;
    display        : flex;
    justify-content: center;
`;

const StyledH1 = styled.h1`
    font-size: 2.5rem;
    padding  : 30px 0;

    @media (max-width: 660px) {
           font-size: 2rem;
           padding: 10px;
        }
`;

const StyledConnexionCard = styled.div`
    border       : 1px solid #EFEFEF;
    padding      : 150px 120px;
    border-radius: 10px;
    background   : white;
    width        :60vw;
    display: flex;
    flex-direction: column;
    justify-content: center ;

    @media (max-width: 815px) {
           width: 80vw;
           padding: 15px;
        }

    @media (max-width: 590px) {
           width: 90vw;
           padding: 10px;
        }
`;

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
                    toast.info('Veuillez renseigner votre pseudo dans l\'onglet \'Paramètres\'.', {position: 'bottom-right'});
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
                    style        = {{margin: '10px', borderRadius: '5px', padding: '10px'}}
                />
            ))}
            <div>
                <Button
                    onClick   = {loginClickedHandler}
                    disabled  = {!valid} 
                >
                    Connexion
                </Button> 
                <Button
                    onClick  = {registerClickedHandler}
                    disabled = {!valid} 
                    style    = {{margin: '10px'}}
                >
                    Inscription
                </Button>

            </div>
        </form>
    );

    return (
        <StyledConnexionLayout>
            <StyledConnexionCard>
                <StyledH1>Authentification</StyledH1>
                <div>
                    {emailError && <div>Cette adresse email est déjà utilisée.</div>}
                    {loginError && <div>Impossible de vous authentifier.</div>}
                    {form}
                    <Button onClick={renewPasswordHandler} style={{border: '2px solid #205375', color: '#205375', margin: '10px'}}>Mot de passe oublié ?</Button>
                </div>
            </StyledConnexionCard>
        </StyledConnexionLayout>
    );
};