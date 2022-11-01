import styled from "styled-components";

export const ProfilePageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: 463px){
        padding: 1em 2em;
    }
`;

export const ProfilePicContainer = styled.div`
    width: 90px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ProfileContainer = styled.div`
    width: 100%;
    height: 30%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ProfileContentContainer = styled.div`
    witdh: 100%;
    height: 60%;
    padding: 2em 1.5em;
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
    background: black;
`;

export const ProfilePreference = styled.div`
    color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2em;
`;

export const ProfileDarkmode = styled.div`
    background: white;
    border-radius: 1em;
    padding: .2em 1em;
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    cursor: pointer;
`;