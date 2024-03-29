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
import DisplayedFollowers      from '../../Components/DisplayedFollowers/DisplayedFollowers';

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
    border-top: 3px solid #DDD;
    margin    : 10px 0 
`;

const StyledFollowerHoots = styled.div`
    display        : flex;
    justify-content: center;
    align-items    : center;
    flex-wrap: wrap;
    width          : 60vw;

    @media (max-width: 1200px) {
            width: 70vw;
        }

    @media (max-width: 800px) {
            width: 80vw;
        }
`;

const StyledShowMoreTitle = styled.div`
    display    : flex;
    align-items: center;
`;

// Tableau de bord.
export default function Dashboard(props) {

    // State
    const [hoots, setHoots]           = useState([]);
    const [modal, setModal]           = useState(false);
    const [follow, setFollow]         = useState([]);
    const [showFollow, setShowFollow] = useState(false);
    const [showNews, setShowNews]     = useState(false);

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
    });

    // ComponentDidMount ? pour afficher les hoots de ses abonnées. 
    useEffect(() => {
        // Récupère l'id des abonnements.
        axios.get('/follow/' + fire.auth().currentUser.uid + '.json') 
            // Résultat de la requête principale. 
            .then(response => {
                let followArray = [];
                for (let key in response.data) {
                    followArray.push({
                        ...response.data[key],
                        id: key
                    });
                }
                let eachFollowed = [];
                followArray.forEach(element => {
                    eachFollowed.push(element.id);
                });

                let axiosFollowersRequest = [];
                for (const x of eachFollowed) {
                    axiosFollowersRequest.push('/hoots.json?orderBy="proprietaire"&equalTo="' + x + '"&limitToLast=1');
                }

                let closerToTheResult = [];

                // Résultat de la requête secondaire. 
                const getFollow = async () => {
                    for (let value of axiosFollowersRequest) {
                        await axios.get(value)
                        .then(response => {
                            for (let key in response.data) {
                            closerToTheResult.push({
                                ...response.data[key],
                                id: value
                            });
                        }
                        })
                        // Potentielles erreurs de la requête secondaire. 
                        .catch(error => {console.log(error)})
                        setFollow(closerToTheResult);
                    }
                }

                getFollow();
            })
            // Potentielles erreurs de la requête principale. 
            .catch(error => {
                console.log(error);   
            });
    }, []);

    // Fonctions 
    const toggleModalHandler = () => {
        setModal(!modal);
    };

    const showMoreToggler = () => {
        setShowFollow(!showFollow);
    }

    const showMoreNewsToggler = () => {
        setShowNews(!showNews);
    }

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

    let showMoreButton = {
        border        : 'none',
        color         : '#205375',
        display       : 'flex',
        justifyContent: 'center',
        height        : '30px',
        width         : '30px',
        alignItems    : 'center',
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

                    {follow.length !== 0 ?
                        <>
                            {showFollow ?
                                <>
                                    <StyledShowMoreTitle>
                                        <h2>Derniers Hoots de vos abonnements &nbsp;</h2>
                                        <Button 
                                            style={showMoreButton}
                                            onClick={showMoreToggler}
                                        >
                                            <span 
                                                className="material-symbols-outlined"
                                            >
                                                expand_more
                                            </span>
                                        </Button>
                                    </StyledShowMoreTitle>
                                        </>
                                    :
                                    <>
                                    <StyledShowMoreTitle>
                                        <h2>Derniers Hoots de vos abonnements &nbsp;</h2>
                                        <Button
                                            style={showMoreButton} 
                                            onClick={showMoreToggler}
                                        >
                                            <span 
                                                className="material-symbols-outlined"
                                            >
                                                expand_less
                                            </span>
                                        </Button>
                                    </StyledShowMoreTitle>

                                    <StyledFollowerHoots>
                                        <DisplayedFollowers
                                            follow={follow}
                                        />
                                    </StyledFollowerHoots>
                                </>
                            }
                        </>
                    :
                        <h2>Vous ne suivez personne pour le moment</h2>
                    }

                <StyledLine />

                {showNews ? 
                    <>
                        <StyledDisplayedHoots>
                            <StyledShowMoreTitle>
                                <h2>Toute l'actualité &nbsp;</h2>
                                <Button
                                    style={showMoreButton} 
                                    onClick={showMoreNewsToggler}
                                >
                                    <span 
                                        className="material-symbols-outlined"
                                    >
                                        expand_more
                                    </span>
                                </Button>
                            </StyledShowMoreTitle>
                        </StyledDisplayedHoots>
                    </>
                :
                    <>
                    <StyledDisplayedHoots>
                            <StyledShowMoreTitle>
                                <h2>Toute l'actualité &nbsp;</h2>
                                <Button
                                    style={showMoreButton} 
                                    onClick={showMoreNewsToggler}
                                >
                                    <span 
                                        className="material-symbols-outlined"
                                    >
                                        expand_less
                                    </span>
                                </Button>
                            </StyledShowMoreTitle>

                            <DisplayedHoots 
                                hoots = {hoots}
                                user  = {props.user}
                            />
                        </StyledDisplayedHoots>
                    </>
                }

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