import React from 'react';
import { Link } from 'react-router-dom';
import { BsPeople } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import { BiChat, BiHomeSmile } from 'react-icons/bi';
import { NavbarContainer } from '../Utils/Styles/Global.style';
import { NavbarLinkContainer, NavbarLinks, NavbarList, NavbarLogo } from '../Utils/Styles/Navbar.style';

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarLinkContainer>
        <NavbarLogo>Logo</NavbarLogo>

        <NavbarList>
          <NavbarLinks>
            <GrAdd />
          </NavbarLinks>
          <NavbarLinks to='/'>
            <BiHomeSmile />
          </NavbarLinks>
          <NavbarLinks to='/chat'>
            <BiChat /> 
          </NavbarLinks>
          <NavbarLinks>
            <BsPeople />
          </NavbarLinks>
          <NavbarLinks to='/profile'>
            <BsPeople />
          </NavbarLinks>
        </NavbarList>
      </NavbarLinkContainer>
    </NavbarContainer>
  );
};

export default Navbar;