// Librairies
import React    from 'react';
import routes   from '../../../config/routes';
import { Link } from 'react-router-dom';

function DisplayedHoot(props) {

    return (
        <Link to={routes.HOOT + '/' + props.hoot.slug}>
            <div>
                <p>{props.hoot.contenu}</p>
                <small>{props.hoot.auteur}</small> <br />
                <span>{props.hoot.date}</span>
            </div>
        </Link>
    );
};

export default DisplayedHoot;