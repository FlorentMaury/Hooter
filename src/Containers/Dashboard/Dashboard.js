// Librairies
import React, { useEffect, useState } from 'react';
import axios                          from '../../config/axios-firebase';
import styled                         from 'styled-components';

// Composants
import ManageHoots    from '../Admin/ManageHoots/ManageHoots';
import DisplayedHoots from '../../Components/DisplayedHoots/DisplayedHoots';
import Spinner        from '../../Components/UI/Spinner/Spinner';
import Button         from '../../Components/Button/Button';
import fire from '../../config/firebase';


// Styled Components
const StyledDashboard = styled.div`
    background: #EFEFEF;
    height    : 100%;
`;

const StyledHootingCard = styled.div`
    padding: 10px;
    width: 20vw;
    background: #EFEFEF;
`;

const StyledH1 = styled.h1`
    padding: 10px;
`;

const StyledMain = styled.main`
    display       : flex;
    flex-direction: column;
    align-items   : center;
`;

const StyledDisplayedHoots = styled.div`
    width: 65vw;
`;

const StyledImg = styled.img`
    vertical-align: middle;
    width         : 80px;
    height        : 80px;
    border-radius : 50%;
    margin: 30px;
`;

const StyledOverlay = styled.div`
    position  : absolute;
    top       : 0;
    left      : 0;
    right     : 0;
    bottom    : 0;
    background: rgba(49, 49, 49, 0.6);
`;

const StyledModal = styled.div`
    position     : absolute;
    top          : 40%;
    left         : 50%;
    transform    : translate(-50%, -50%);
    background   : #EFEFEF;
    padding      : 15px 30px;
    border-radius: 5px;
    max-width    : 1200px;
    min-width    : 600px;

`;

export default function Dashboard(props) {

    // State
    const [hoots, setHoots]   = useState([]);
    const [modal, setModal]   = useState(false);

    // ComponentDidMount ?
    useEffect(() => {
        axios.get('/hoots.json?orderBy="date"')
            .then(response => {
                let hootsArray = [];
                for (let key in response.data) {
                    hootsArray.push({
                        ...response.data[key],
                        id: key
                    });
                }

                // Chronologie
                hootsArray.reverse();
                setHoots(hootsArray);
            })
            .catch(error => {
                console.log(error);
            })
    });

    useEffect(() => {
        document.title = 'Article';
    });

    // Fonctions 
    const toggleModalHandler = () => {
        setModal(!modal);
    };

    // Render
    return (
        <>
            <StyledDashboard>
                <StyledMain>
                    <StyledHootingCard>
                        <StyledImg src={fire.auth().currentUser.photoURL} alt="avatar" />
                        <Button onClick={toggleModalHandler}>Hooting</Button> 
                    </StyledHootingCard>

                <StyledDisplayedHoots>
                    <StyledH1>Hoots</StyledH1>
                    <DisplayedHoots 
                        hoots = {hoots}
                        user  = {props.user}
                    />
                </StyledDisplayedHoots>

                </StyledMain>
            </StyledDashboard>

            {modal &&
                <StyledOverlay>
                    <StyledModal>
                    <ManageHoots modal={modal} setModal={setModal} />
                    <Button 
                        onClick={toggleModalHandler}
                        style={{position: 'absolute', top: '10px', right: '10px', padding: '5px 10px'}}
                    >
                        Fermer
                    </Button>
                    </StyledModal>
                </StyledOverlay>
            }
        </>
    );
};