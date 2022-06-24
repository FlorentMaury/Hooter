// Librairies
import React, { useEffect, useState } from 'react';
import axios                          from '../../config/axios-firebase';
import styled                         from 'styled-components';
import fire                           from '../../config/firebase';

// Composants
import ManageHoots    from '../Admin/ManageHoots/ManageHoots';
import DisplayedHoots from '../../Components/DisplayedHoots/DisplayedHoots';
import Spinner        from '../../Components/UI/Spinner/Spinner';
import Button         from '../../Components/Button/Button';
import Modal          from '../../Components/UI/Modal/Modal';


// Styled Components
const StyledDashboard = styled.div`
    background: #EFEFEF;
    height    : auto;
    padding-top: 30px;
`;

const StyledHootingCard = styled.div`
    width: 68vw;
    height: 20vh;
    background: white;
    border        : 1px solid #cccccce0;
    border-radius : 10px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 40px;
    margin-bottom: 30px;
`;

const StyledH1 = styled.h1`
    /* padding: 10px; */

`;

const StyledMain = styled.main`
    display       : flex;
    flex-direction: column;
    justify-content: center;
    align-items   : center;
`;

const StyledDisplayedHoots = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledImg = styled.img`
    vertical-align: middle;
    width         : 80px;
    height        : 80px;
    border-radius : 50%;
`;

const StyledLine = styled.div`
    width: 68vw;
    padding: 30px;
    border-top: 3px solid #DDD;
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

    let styledButton = {
        width: '100%',
        borderRadius: '30px',
        marginLeft: '40px',
        border: '1px solid #D7D5D6',
        color: 'grey',
        display: 'flex',
        height: '50px',
        alignItems: 'center',
        paddingLeft: '50px',
        background: '#EFEFEF',
    }

    // Render
    return (
        <>
            <StyledDashboard>
                <StyledMain>
                    <StyledHootingCard>
                        <StyledImg src={fire.auth().currentUser.photoURL} alt="avatar" />
                        <Button 
                            style={styledButton}
                            onClick={toggleModalHandler}>Commencez un post</Button> 
                    </StyledHootingCard>

                <StyledDisplayedHoots>
                <StyledLine />

                    <StyledH1>Toute l'actualité</StyledH1>
                    <DisplayedHoots 
                        hoots = {hoots}
                        user  = {props.user}
                    />
                </StyledDisplayedHoots>

                </StyledMain>
            </StyledDashboard>

            {modal &&
                <Modal>    
                    <ManageHoots modal={modal} setModal={setModal} />
                    <Button 
                        onClick={toggleModalHandler}
                        style={{color: '#205375', position: 'absolute', top: '10px', right: '10px', padding: '5px 10px', border: 'none'}}
                    >
                        <span class="material-symbols-outlined">close</span>
                    </Button>
                </Modal>
            }


        </>
    );
};