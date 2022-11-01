import styled from 'styled-components';

export const ChatPageContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    padding: 1em;
`;

export const ChatPageTop = styled.div`
    width: 100%;
    height: 70px;    
`;

export const ChatBodyContainer = styled.div`
    width: 100%;
    height: calc(100% - 230px);
    padding: 1em;
    overflow-y: scroll;
    overflow-x: hidden;
    // background: red;
    display: flex;
    flex-direction: column;
`;

export const ChatPageForm = styled.div`
    position: absolute;
    bottom: 7.5em;
    left: 1em;
    right: 1em;
    background: grey;
    input{
        width: 100%;
        border-radius: 0;
        background: transparent;
        color: white;
    }
`;

export const ChatBubble = styled.div`
    max-width: 40%;
    width: fit-content;
    word-wrap: break-word;
    padding: 1em;
    margin-top: .5em;
    align-self: ${props => props.fromSelf? 'flex-end': 'flex-start'}; 
    // background:  ${props => props.fromSelf? 'red': 'green'};
    background: green;
    color: white;
    border-bottom-left-radius: ${props => props.fromSelf? '1.5em': ''};
    border-top-left-radius: ${props => props.fromSelf? '1.5em': ''};
    border-bottom-right-radius: ${props => props.fromSelf? '1.5em': ''};

    border-bottom-right-radius: ${props => props.fromSelf? '': '1.5em'};
    border-bottom-left-radius: ${props => props.fromSelf? '': '1.5em'};
    border-top-right-radius: ${props => props.fromSelf? '': '1.5em'};
`;
