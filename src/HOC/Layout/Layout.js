// Librairies.
import React  from 'react';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

// Composants.
import Header             from '../../Components/Header/Header';
import Footer             from '../../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

// Styled Components.
const StyledLayout = styled.div`
    display        : flex;
    flex-direction : column;
    justify-content: space-between;
    height         : 100vh;
`;

const StyledContent = styled.div`
    flex-grow: 1;
`;

// Mise en page.
export default function Layout(props) {
    return (
        
        <StyledLayout>
            <Header user={props.user} />
            <StyledContent>
                {props.children}
            </StyledContent>
            <ToastContainer />
            <Footer />
        </StyledLayout>

    );
};