import React from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { ProfileContainer, ProfileContentContainer, ProfileDarkmode, ProfilePageContainer, ProfilePicContainer, ProfilePreference } from '../Utils/Styles/Profile.style';


const ProfilePage = () => {

  const userQuery = useQuery(['Users'])
  console.log(userQuery)
  
  return (
    <ProfilePageContainer>
      <ProfileContainer>
        <ProfilePicContainer>Profil PIc</ProfilePicContainer>
        <strong></strong>
        <p>Lorem, ipsum ipsum.</p>
        <Link to='Cliforddareus@gmail.com'>
          <AiOutlineMail />
        </Link>
      </ProfileContainer>

      <ProfileContentContainer>
        <ProfilePreference>
          <p>Dark Moge</p>
          <ProfileDarkmode>
            <p>On</p>
            <span>
              <MdDarkMode />
              <MdOutlineDarkMode />
            </span>
          </ProfileDarkmode>
        </ProfilePreference>

        <ProfilePreference>
          <p>Dark Moge</p>
          <span>
            <MdDarkMode />
          </span>
        </ProfilePreference>
      </ProfileContentContainer>
    </ProfilePageContainer>
  );
};

export default ProfilePage;