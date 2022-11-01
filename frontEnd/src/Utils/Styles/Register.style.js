import styled from 'styled-components';

export const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    // padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: 463px){
        justify-content: center;
        padding: 1em 2em;
        align-items: center;
    }
`;

export const RegisterPageFormContainer = styled.div`
    width: 100%;
    height: 70%;
    padding:1em;
    background: black;
    // border: 1px solid white;
    border-top-left-radius: 3em;
    border-top-right-radius: 3em;
    @media (min-width: 463px){
        width: 60%;
        margin-inline: auto;
        border: none;
        border-bottom-left-radius: 3em;
        border-bottom-right-radius: 3em;

        padding: 1em 2em;
    }
`;

export const RegisterPageTextContainer = styled.div`
    padding: 2em 1em;
    // color: white;
`;

export const RegisterCallToAction = styled.p`
    color: white;
    margin-top: 1em;
`;