// Librairies
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate }   from 'react-router-dom';
import axios                          from '../../../config/axios-firebase';
import routes                         from '../../../config/routes';
import { checkValidity }              from '../../../shared/utility';
import fire                           from '../../../config/firebase';
import { toast }                      from 'react-toastify';

// Composants
import Input from '../../../Components/UI/Input/Input';

export default function ManageHolws(props) {

    const navigate     = useNavigate();
    const location     = useLocation();
    const howlState = location.state;

    // States
    const [inputs, setInputs] = useState({
        contenu: {
            elementType  : 'textarea',
            elementConfig: {},
            value        : howlState !== null ? howlState.howl.contenu : '',
            label        : 'Contenu de l\'article',
            valid        : howlState !== null && howlState.howl ? true : false,
            validation   : {
                required: true
            },
            touched     : false,
            errorMessage: 'Le contenu ne doit pas être vide.'
        },
        auteur: {
            elementType  : 'input',
            elementConfig: {
                type       : 'text',
                placeholder: 'Auteur de l\'article'
            },
            value     : howlState !== null ? howlState.howl.auteur : '',
            label     : 'Auteur',
            valid     : howlState !== null && howlState.howl ? true : false,
            validation: {
                required: true
            },
            touched     : false,
            errorMessage: 'Il doit y avoir un auteur pour cet article.'
        }
    });

    const [valid, setValid] = useState(howlState !== null && howlState.howl ? true : false);

    // ComponentDidUpdate
    useEffect(() => {
        document.title = 'Gérer un article';
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

    // Envoyer les données sur FireBase
    const formHandler = event => {

        event.preventDefault();

        const howl = {
            contenu  : inputs.contenu.value,
            auteur   : inputs.auteur.value,
            date     : Date.now(),
        };

        const token = fire.auth().currentUser.getIdToken()
            .then(token => {

                if(howlState !== null && howlState.howl) {
                    axios.put('/holws/' + howlState.howl.id + '.json?auth=' + token, howl)
                    .then(() => {
                        toast.success('Article modifié avec succès !', {
                            hideProgressBar: false,
                            closeOnClick   : true,
                            pauseOnHover   : true,
                            draggable      : true,
                        });
                        navigate(routes.ARTICLES + '/' + howlState.howl.slug);
                    })
                    .catch(error => {
                        console.log(error);
                    }); 
                } else {
                    axios.post('/holws.json?auth=' + token, howl)
                    .then(() => {
                        toast.success('Article ajouté avec succès !')
                        navigate(routes.DASHBOARD);
                    })
                    .catch(error => {
                        console.log(error);
                    }); 
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Variables
    const formElementArray = [];

    for (let key in inputs) {
        formElementArray.push({
            id    : key,
            config: inputs[key]
        });
    };

    let form = (
        <form onSubmit={(e) => formHandler(e)}>
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
                <input 
                    type     = 'submit'
                    value    = {howlState !== null && howlState.howl ? 'Modifier un article' : 'Ajouter un article'}
                    disabled = {!valid}
                />
            </div>
        </form>
    );

    return (
        <div className='container'>
            {howlState !== null ? 
            <h1>Modifier</h1>
            :
            <h1>Ajouter</h1>
            }
            {form}
        </div>
    );
};