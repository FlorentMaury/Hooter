// Librairies
import React     from 'react';
import { Link }  from 'react-router-dom';
import routes    from '../../../config/routes';
import PropTypes from 'prop-types'

function DisplayedHolw(props) {
    return (
        <Link to={routes.DASHBOARD}>
            <div>
                <p>{props.holw.contenu}</p>
                <small>{props.holw.auteur}</small>
            </div>
        </Link>
    );
};

DisplayedHolw.propTypes = {
    holw: PropTypes.object
};

export default DisplayedHolw;