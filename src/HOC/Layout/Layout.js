// Librairies
import React  from 'react';
import styled from 'styled-components';

// Composants
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const StyledLayout = styled.div`
    display        : flex;
    flex-direction : column;
    justify-content: space-between;
    height         : 100vh;
`;

const StyledContent = styled.div`
    flex-grow: 1;
`;

export default function Layout(props) {
    return (
        <StyledLayout>
            <Header user={props.user} />
            <StyledContent>
                {props.children}
            </StyledContent>
            <Footer />
        </StyledLayout>
    );
};