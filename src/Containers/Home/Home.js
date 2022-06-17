// Librairies
import React    from 'react';
import classes  from './Home.module.css';
import styled   from 'styled-components';
import { Link } from 'react-router-dom';
import routes   from '../../config/routes';

// Composants
import Owl from '../../assets/Owl.png';
import Spiral from '../../assets/spirals2.png';

// Styled
const StyledOwl = styled.img`
    width: 40%;
`;

const StyledLayout = styled.div`
    background: #94B49F;
    display: flex;
    flex-direction: row-reverse;
    height: 100%;
    justify-content: space-around;
`;

const StyledSharedSpace = styled.div`
    width: 50%;
`;

export default function Home() {

    return (
        <StyledLayout>
            <StyledSharedSpace>
                <h1>Home</h1>
                <p>Consectetur nisi dolore fugiat tempor nostrud amet in fugiat dolore Lorem. 
                    Anim voluptate mollit nulla sunt aliquip cupidatat culpa ipsum. 
                    Cupidatat occaecat fugiat voluptate cillum. 
                    Ipsum sit veniam adipisicing aliquip sint aliquip eest ullamco. 
                    Ex dolore commodo cupidatat est dolore fugiat ex. 
                    Velit pariatur amet incididunt laboris laboris culpa aute occaecat labore. 
                    Laboris est ullamco aliquip Lorem qui.
                </p>
                <Link to={routes.CONNEXION}>
                <button>Connexion</button>
            </Link>
            </StyledSharedSpace>
            
            <StyledSharedSpace>
            <StyledOwl src={Owl} />
                <div>
                    <img alt='Spirale' className={classes.spiral1} src={Spiral} />
                    <img alt='Spirale' className={classes.spiral2} src={Spiral} />
                </div>
            </StyledSharedSpace>
        </StyledLayout>
    );
};