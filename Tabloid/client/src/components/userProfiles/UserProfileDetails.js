import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Button, Input, Label } from "reactstrap";
import { UploadImgContext } from "../../providers/UploadImgProvider";
import moment from "moment";
import "./UserProfile.css";

export const UserProfileDetails = () => {
  const { getUserProfileById, editUserProfile, getUserProfiles } = useContext(UserProfileContext);
  const [oneUserProfile, setOneUserProfile] = useState();
  const { id } = useParams();
  const history = useHistory();
  const userProfileId = parseInt(id);
  const [selectedFile, setSelectedFile] = useState(null)

  
  const {getImgURL} = useContext(UploadImgContext)
  const currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const imgURL = getImgURL(currentUser.imageLocation)
  console.log(imgURL)


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

  const onImageSelection = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const updateUserImage = () => {
    editUserProfile({
      id: oneUserProfile.id,
      firebaseUserId: oneUserProfile.firebaseUserId,
      displayName: oneUserProfile.displayName,
      firstName: oneUserProfile.firstName,
      lastName: oneUserProfile.lastName,
      email: oneUserProfile.email,
      createDateTime: oneUserProfile.createDateTime,
      imageLocation: selectedFile.name,
      userTypeId: oneUserProfile.userTypeId,
      isActivated: oneUserProfile.isActivated
    })
    .then(getUserProfiles)
  }

  return (
    <>
      <div className="container">
        <div className="userProfileList">
          <section className="row justify-content-center"></section>
          <div>
            <h1>{oneUserProfile.fullName}</h1>

            <hr />
            <dl className="row">
              <dt className="col-sm-4">Name :</dt>
              <dd className="col-sm-6">{oneUserProfile.fullName}</dd>
            </dl>





            <div>
              <dd className="col-sm-6">
                {oneUserProfile.imageLocation ? (
                  <img alt="" src={imgURL}></img>
                ) : (
                    <img alt="" src="https://www.pngitem.com/pimgs/m/24-248235_user-profile-avatar-login-account-fa-user-circle.png"></img>
                  )}
              </dd>
            </div>
            


              {
                currentUser.id === oneUserProfile.id ? 
                  (
                  <dl className="row">
                    <section id="editProfileImage">
                      <div><Input required type="file" name="Image" id="newImage" placeholder="image" onChange={onImageSelection} /></div>
                      <div><Button size="md" color="link" onClick={updateUserImage}>Save</Button></div>
                    </section>
                  </dl>
                  ) : (
                    <div></div>
                  )
              }



            <dl className="row">  
              <dt className="col-sm-4">Display Name: </dt>
              <dd className="col-sm-6">{oneUserProfile.displayName}</dd>
            </dl>  
            <dl className="row">  
              <dt className="col-sm-4">Email Address:</dt>
              <dd className="col-sm-6">{oneUserProfile.email}</dd>
            </dl>  
            <dl className="row">
              <dt className="col-sm-4">Added On :</dt>
              <dd className="col-sm-6">{formattedDate}</dd>
            </dl>
            <dl className="row">
              <dt className="col-sm-4">User Type :</dt>
              <dd className="col-sm-6">{oneUserProfile.userType.name}</dd>
            </dl >
            <div id="btn--backToUsers">
                <Button onClick={handleClick}>Back</Button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};
