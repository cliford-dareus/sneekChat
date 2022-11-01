import { Link } from "react-router-dom";
import styled from "styled-components";


export const NavbarLinkContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: red;
    @media (min-width: 463px){
       flex-direction: column;
       height: 60%;
    }
`;

export const NavbarList = styled.ul`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    // gap: 1em;
    list-style: none;
    @media (min-width: 463px){
       flex-direction: column;
    // justify-content: initial;
    }
`;

export const NavbarLogo = styled.h3`
    display: none;
    @media (min-width: 463px){
       display: block;
       padding: 1em;
       height: 100px;
    }
`;

export const NavbarLinks = styled(Link)`
    font-size: 2rem;
    color: white;
`;