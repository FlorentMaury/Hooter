// Librairies
import React, { useEffect, useState } from 'react';
import axios                          from '../../config/axios-firebase';
import styled                         from 'styled-components';

// Composants
import ManageHoots    from '../Admin/ManageHoots/ManageHoots';
import DisplayedHoots from '../../Components/DisplayedHoots/DisplayedHoots';
import Spinner        from '../../Components/UI/Spinner/Spinner';
import Button         from '../../Components/Button/Button';
import Modal           from '../../Components/UI/Modal/Modal';


// Styled Components
const StyledDashboard = styled.div`
    background: #EFEFEF;
    height    : 100%;
`;

const StyledH1 = styled.h1`
    font-size  : 2.5rem;
    padding-top: 15px;
`;

const StyledH2 = styled.h2`
    margin   : 15px;
    font-size: 1.8rem;
`;

const StyledMain = styled.main`
    height         : 100%;
    padding        : 30px;
    display        : flex;
    justify-content: center;
`;

const StyledAddingHoots = styled.div`
    
`;

const StyledDisplayedHoots = styled.div`
    width: 65vw;
`;

export default function Dashboard(props) {

    // State
    const [hoots, setHoots]   = useState([]);
    const [hootin, setHootin] = useState(false);

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
    }, []);

    useEffect(() => {
        document.title = 'Article';
    });

    // Fonctions 
    const hootinClickedhandler = () => {
        setHootin(!hootin);
    };

    // Render
    return (
        <>
            <StyledDashboard>
                <StyledH1>Dashboard</StyledH1>
                <StyledMain>
                    <StyledDisplayedHoots>
                        <StyledH2>Hoots</StyledH2>
                        <DisplayedHoots 
                            hoots={hoots} 
                            user={props.user}
                        />
                    </StyledDisplayedHoots>

                    <StyledAddingHoots>                
                        <Button onClick={hootinClickedhandler}>
                            { !hootin ? 'Hoot' : 'Fermer' }
                        </Button>
                        {hootin && <ManageHoots /> }
                    </StyledAddingHoots>

                </StyledMain>
            </StyledDashboard>
            <Modal />
        </>
    );
};