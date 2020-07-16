import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button } from "reactstrap";
import moment from "moment";
import "./UserProfile.css";

export const UserProfileDetails = () => {
  const { getUserProfileById } = useContext(UserProfileContext);
  const [oneUserProfile, setOneUserProfile] = useState();
  const { id } = useParams();
  const history = useHistory();
  const userProfileId = parseInt(id);

  const handleClick = () => {
    history.push(`/userProfiles/`);
  };

  useEffect(() => {
    getUserProfileById(userProfileId).then(setOneUserProfile);
  }, []);

  if (!oneUserProfile) {
    return null;
  }

  const formattedDate = moment(oneUserProfile.createDateTime).format(
    "MM/DD/YYYY"
  );

  return (
    <>
      <div className="container pt-5">
        <div className="userProfileList">
          <section className="row justify-content-center"></section>
          <div>
            <h1>{oneUserProfile.fullName}</h1>

            <hr />
            <dl className="row">
              <dt className="col-sm-2">Name :</dt>
              <dd className="col-sm-10">{oneUserProfile.fullName}</dd>
              <dt className="col-sm-2">Image :</dt>
              <dd className="col-sm-10">
                {oneUserProfile.imageLocation ? (
                  <img alt=""src={oneUserProfile.imageLocation}></img>
                ) : (
                  <img alt="" src="https://www.pngitem.com/pimgs/m/24-248235_user-profile-avatar-login-account-fa-user-circle.png"></img>
                )}
              </dd>
              <dt className="col-sm-2">Display Name: </dt>
              <dd className="col-sm-10">{oneUserProfile.displayName}</dd>
              <dt className="col-sm-2">Email Address:</dt>
              <dd className="col-sm-10">{oneUserProfile.email}</dd>
              <dt className="col-sm-2">User Added On :</dt>
              <dd className="col-sm-10">{formattedDate}</dd>
              <dt className="col-sm-2">User Type :</dt>
              <dd className="col-sm-10">{oneUserProfile.userType.name}</dd>
              <dt className="col-sm-2"></dt>
              <dd className="col-sm-10">
                <Button onClick={handleClick}>Back to User Profiles</Button>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};
