import Header from "../Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import "./index.css";

const Profile = () => {
  // profileDetails

  const [profileData, setProfileData] = useState({
    profileDetails: {},
  });

  useEffect(() => {
    const token = Cookies.get("jwtToken");

    const getProfile = async () => {
      const api = "https://apis.ccbp.in/profile";

      const options = {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(api, options);
        const data = await response.json();

        if (response.ok === true) {
          setProfileData({
            ...profileData,
            profileDetails: data.profile_details,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);

  const { profileDetails } = profileData;

  return (
    <div className="profileBody">
      <Header />
      <div className="d-flex justify-content-evenly m-3">
        <div className="ms-5 d-flex flex-column justify-content-start align-items-center border-dark rounded-3 m-3 p-3 shadow-lg profile-card">
          <img
            src={profileDetails.profile_image_url}
            alt="Profile"
            width="80px"
            className="rounded-circle mb-2 border border-2 border-dark"
          />
          <h2 className="h5 text-dark font-weight-bold mb-1">
            {profileDetails.name}
          </h2>
          <p className="text-muted text-center mb-0 px-3">
            {profileDetails.short_bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
