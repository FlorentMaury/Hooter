// Librairies.
import React, { useEffect, useState } from 'react';
import axios                          from '../../config/axios-firebase';
import styled                         from 'styled-components';
import fire                           from '../../config/firebase';

// Composants.
import ManageHoots             from '../Admin/ManageHoots/ManageHoots';
import DisplayedHoots          from '../../Components/DisplayedHoots/DisplayedHoots';
import Button                  from '../../Components/Button/Button';
import Modal                   from '../../Components/UI/Modal/Modal';
import DisplayedFollowersHoots from '../../Components/DisplayedFollowersHoots/DisplayedFollowersHoots';

// Styled Components.
const StyledDashboard = styled.div`
    background    : #EFEFEF;
    height        : auto;
    padding-top   : 30px;
    display       : flex;
    flex-direction: column;
    align-items   : center;
`;

const StyledHootingCard = styled.div`
    width          : 100%;
    height         : 20vh;
    background     : white;
    border         : 1px solid #cccccce0;
    border-radius  : 10px;
    display        : flex;
    align-items    : center;
    padding        : 40px;
    margin-bottom  : 30px;

    @media (max-width: 550px) {
            padding: 20px;
        } 
`;

const StyledMain = styled.main`
    display        : flex;
    flex-direction : column;
    align-items    : center;
    width          : 60vw ;

    @media (max-width: 950px) {
           width  : 80vw;
        }

    @media (max-width: 590px) {
           width  : 90vw;
        }
`;

const StyledDisplayedHoots = styled.div`
    display       : flex;
    flex-direction: column;
    align-items   : center;
    width: 60vw;

    @media (max-width: 815px) {
           width  : 80vw;
        }

    @media (max-width: 590px) {
           width  : 90vw;
        }
`;

const StyledImg = styled.img`
    vertical-align: middle;
    width         : 80px;
    height        : 80px;
    border-radius : 50%;

    @media (max-width: 550px) {
            width : 60px;
            height: 60px;
        }
`;

const StyledLine = styled.div`
    width     : 100%;
    padding   : 30px;
    border-top: 3px solid #DDD;
`;

const StyledFollowerHoots = styled.div`
    display: flex;
    flex-direction: row;
`;


// Tableau de bord.
export default function Dashboard(props) {

    // State
    const [hoots, setHoots]   = useState([]);
    const [modal, setModal]   = useState(false);
    const [follow, setFollow] = useState([]);

    // Nom de la page.
    useEffect(() => {
        document.title = 'Hooter | Tableau de bord';
    });

    // ComponentDidMount ? pour afficher les hoots. 
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

    console.log(hoots)

    // ComponentDidMount ? pour afficher les hoots de ses abonnées. 
    useEffect(() => {
        // Récupère les abonnés.
        axios.get('/follow/' + fire.auth().currentUser.uid + '.json') 
            // Résultat de la requête principale. 
            .then(response => {
                let followArray = [];
                for (let key in response.data) {
                    followArray.push({
                        ...response.data,
                        id: key
                    });
                }
                let eachFollowed = [];
                followArray.forEach(element => {
                    eachFollowed.push(element.id);
                });
                
                // Récupère les hoots des abonnés.
                for (const x of eachFollowed) {
                    axios.get('/hoots.json?orderBy="proprietaire"&equalTo="' + x + '"')
                        // Résultat de la requête secondaire.
                        .then(response => {
                            let followersArray = [];
                            // setFollow(((Object.values(response.data)[0])));
                            for (let key in ((Object.values(response.data)[0]))) {
                                followersArray.push({
                                    ...response.data,
                                    id: key
                                });
                                setFollow(followersArray);
                            }
                        })
                        // Potentielles erreurs de la requête secondaire.
                        .catch(error => {
                            console.log(error)
                        })
                }
            })
            // Potentielles erreurs de la requête principale. 
            .catch(error => {
                console.log(error);   
            });
    }, []);

    console.log(follow);


    // Fonctions 
    const toggleModalHandler = () => {
        setModal(!modal);
    };

    let styledButton = {
        width       : '100%',
        borderRadius: '30px',
        marginLeft  : '40px',
        border      : '1px solid #D7D5D6',
        color       : 'grey',
        display     : 'flex',
        height      : '50px',
        alignItems  : 'center',
        paddingLeft : '50px',
        background  : '#EFEFEF',
    };

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


                <StyledLine />

                    <h3>Derniers Hoots de mes abonnés</h3>
                    <StyledFollowerHoots>
                        <DisplayedFollowersHoots
                            follow = {follow}
                            user   = {props.user}
                        />
                    </StyledFollowerHoots>

                <StyledLine />
                <StyledDisplayedHoots>

                    <h1>Toute l'actualité</h1>
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