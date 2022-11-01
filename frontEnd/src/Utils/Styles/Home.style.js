import styled from "styled-components";

export const HomePageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: 463px){
        padding: 1em 2em;
    }
`;

export const HomePageTopContainer = styled.div`
    width: 100%;
    height: 100px;
    padding: 2em 1.5em 1em;
`;

export const HomePageFriendContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 2em;
`;

export const HomePageFriendList = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    margin: 1em 0;
`;

export const HomePageFriendPicContainer = styled.div`
    width: 70px;
    aspect-ratio: 1;
    background: red;
    border-radius: 50%;
`;

export const HomePageMessageContainer = styled.div`
    width: 100%;
    height: 60%;
    background: black;
    padding: 2em 1.5em;
    color: white;
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
`;

export const ChatRecentContainer = styled.div`
    display: flex;
    width: 100%;
    height: 70px;
    background: red;
    margin-top: .5em;
    align-items: center;
    padding: 1em;
    border-radius: 1em;
    cursor: pointer;
`;

export const ChatRecentPic = styled.div`
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: black;
    margin-right: 1em;
`;

export const ChatRecentContent = styled.div`
    margin-right: auto;
`;