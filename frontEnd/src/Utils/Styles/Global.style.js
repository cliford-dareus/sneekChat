import styled from 'styled-components';

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

export const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    // overflow: hidden;
    // position : relative;
    grid-template-columns: 1fr;
    @media (min-width: 463px){
        grid-template-columns: 10vw auto;
    }
`;

export const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const NavbarContainer = styled.div`
    position: absolute;
    background: red;
    width: 90%;
    height: 80px;
    border-radius: 2em;
    overflow: hidden;
    padding: 0em 1.5em;
    bottom: 2em;
    left: 50%;
    z-index: 212;
    transform: translateX(-50%) translateY(0%);
    @media (min-width: 463px){
        position: initial;
        height: 100%;
        left: initial;
        bottom: initial;
        transform: translateX(0%) translateY(0%);
        border-radius: 0em;
    }
`;

export const FormInputContainer = styled.div`
    margin-top: 1em;
    display: flex;
    flex-direction: column;
`;

export const InputField = styled.input`
    border: none;
    outline: none;
    border-radius: 1em;
    font-size: 1.1rem;
    padding: .3em 1em;
`;

export const LabelField = styled.label`
    color: white;
`;