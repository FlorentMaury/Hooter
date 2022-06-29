// Librairies .
import React, { useState }          from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios                        from '../../../config/axios-firebase';
import routes                       from '../../../config/routes';
import { checkValidity, genSlug }   from '../../../shared/utility';
import fire                         from '../../../config/firebase';
import { toast }                    from 'react-toastify';
import styled                       from 'styled-components'

// Composants.
import Input from '../../../Components/UI/Input/Input';


// Styled Components.
const StyledInputImg = styled.input`
    padding      : 10px 30px;
    border-radius: 10px;
    background   : #F3F3F3;
    margin-top   : 50px;
    border       : none;
`;

const StyledH2 = styled.h2`
    font-size    : 1.5rem;
    padding      : 15px;
    border-bottom: 1px solid #ebebeb;
    text-align   : start;
    font-weight  : 500;
    color        : #205375;
    background   : rgba(235,235,235, .6);;
`; 

const StyledForm = styled.form`
    margin        : 10px;
    display       : flex;
    flex-direction: column;
`;

const StyledInput = styled.input`
    color        : white;
    padding      : 10px 30px;
    background   : #205375;
    border-radius: 10px;
    margin-top   : 50px;
    border       : none;
`;

// Manage Hoots.
export default function ManageHoots(props) {

    // Sariables.
    const navigate          = useNavigate();
    const location          = useLocation();
    const hootState         = location.state;
    const userEmail         = fire.auth().currentUser.email;
    const [valid, setValid] = useState(hootState !== null && hootState.hoot ? true : false);


    // States
    const [inputs, setInputs] = useState({
        contenu: {
            elementType  : 'textarea',
            elementConfig: {},
            value        : hootState !== null ? hootState.hoot.contenu : '',
            valid        : hootState !== null && hootState.hoot ? true : false,
            validation   : {
                required: true,
                maxLength: 280
            },
            touched     : false,
            errorMessage: 'Le contenu ne doit pas être vide, ni dépasser 280 caractères.'
        }
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

        let date = new Date();

        const slug = genSlug(userEmail) + Math.floor(Math.random() * 10000) + '_hoot';

        const hoot = {
            contenu     : inputs.contenu.value,
            auteur      : fire.auth().currentUser.displayName,
            proprietaire: fire.auth().currentUser.uid,
            auteurImg   : fire.auth().currentUser.photoURL,
            slug        : slug,
            articleImg  : document.getElementById('hootImg').value,
            date        : date.toLocaleString(navigator.language, {
                year  : 'numeric',
                month : 'numeric',
                day   : 'numeric',
                hour  : 'numeric',
                minute: 'numeric'
            })
        };

        const token = fire.auth().currentUser.getIdToken()
            .then(token => {

                if(hootState !== null && hootState.hoot) {
                    axios.put('/hoots/' + hootState.hoot.id + '.json?auth=' + token, hoot)
                    .then(() => {
                        toast.success('Post modifié avec succès !', {position: 'bottom-right'});
                        navigate(routes.DASHBOARD);
                    })
                    .catch(error => {
                        console.log(error);
                    }); 
                } else {
                    axios.post('/hoots.json?auth=' + token, hoot)
                    .then(() => {
                        toast.success('Post ajouté avec succès !', {position: 'bottom-right'});
                    })
                    .catch(error => {
                        console.log(error);
                    }); 
                }
                })
            .catch(error => {
                console.log(error);
            });

            props.setModal(!props.modal);

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
        <StyledForm onSubmit={(e) => formHandler(e)}>
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
                <StyledInputImg type='text' placeholder='Lien vers votre image' id='hootImg' /><br />
                <StyledInput 
                    type     = 'submit'
                    value    = {hootState !== null && hootState.hoot ? 'Modifier' : 'Publier'}
                    disabled = {!valid}
                />
            </div>
        </StyledForm>
    );

    // Render.
    return (
        <div>
            {hootState !== null ? 
            <StyledH2>Modifier un post</StyledH2>
            :
            <StyledH2>Créer un post</StyledH2>
            }
            {form}
        </div>
    );
};