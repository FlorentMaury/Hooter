// Librairies
import React     from 'react';
import { Link }  from 'react-router-dom';
import routes    from '../../../config/routes';
import PropTypes from 'prop-types'

function DisplayedHowl(props) {
    return (
        <div>
            <p>{props.howl.contenu}</p>
            <small>{props.howl.auteur}</small>
        </div>
    );
};

DisplayedHowl.propTypes = {
    howl: PropTypes.object
};

export default DisplayedHowl;