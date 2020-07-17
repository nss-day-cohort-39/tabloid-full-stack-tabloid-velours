import React, { useContext, useState, useRef } from "react";
import {
  ListGroupItem,
  ListGroup,
  Modal,
  Button,
  ModalBody,
  Input
} from "reactstrap";
import "./UserProfile.css";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";


export const UserProfile = ({ userProfile }) => {
  const { editUserProfile } = useContext(UserProfileContext);
  const userProfileType = useRef();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [editModal, setEditModal] = useState(false)
  const toggleEdit = () => setEditModal(!editModal)

  const handleClick = () => {
    history.push(`/userprofiles/${userProfile.id}`);
  };

  const deActivate = () => {
    window.confirm("Are you sure you wish to deactivate this user?") &&
      editUserProfile({
        id: userProfile.id,
        firebaseUserId: userProfile.firebaseUserId,
        displayName: userProfile.displayName,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        createDateTime: userProfile.createDateTime,
        imageLocation: userProfile.imageLocation,
        userTypeId: userProfile.userTypeId,
        IsActivated: 0
      });
  };

  const editUserProfileType = () => {
    editUserProfile({
      id: userProfile.id,
      firebaseUserId: userProfile.firebaseUserId,
      displayName: userProfile.displayName,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      createDateTime: userProfile.createDateTime,
      imageLocation: userProfile.imageLocation,
      userTypeId: userProfileType.current.value,
      isActivated: userProfile.isActivated
    })
    toggleEdit()
  }

  return (
    <>
      {(userProfile.isActivated) && (
        <>

          <ListGroupItem>
            <ListGroup horizontal className="userProfile">
              <div className="user--info">{userProfile.fullName}</div>
              <div className="user--info">{userProfile.displayName}</div>
              <div className="user--info">{userProfile.userType.name}</div>
              <ListGroup horizontal>
                <div className="icon--userProfile">
                  <i
                    onClick={handleClick}
                    className="fa fa-info-circle"
                    aria-hidden="true">
                  </i>
                </div>
                <div className="icon--userProfile">
                  <i
                    onClick={deActivate}
                    className="fa fa-window-close-o"
                    aria-hidden="true">
                  </i>
                </div>
                <div className="icon--userProfile">
                  <i
                    onClick={() => toggleEdit()}
                    className="fa fa-pencil-square-o"
                    aria-hidden="true"
                  ></i>
                    <div>
                      <Modal isOpen={editModal} toggle={toggleEdit}>
                        <ModalBody >
                          <div className="form-group">
                            <Input
                              type="select"
                              id="userProfileType"
                              innerRef={userProfileType}
                              required
                              autoFocus
                              className="form-control mt-4">
                                <option value={0}>Select a User Profile Type</option>
                                <option value={1}>Administrator</option>
                                <option value={2}>Author</option>
                            </Input> 
                            <div className="">
                              <Button
                                type="submit"
                                size="sm"
                                color="info"
                                onClick={
                                  evt => {
                                    evt.preventDefault()
                                    editUserProfileType(userProfile)
                                  }}
                                className="btn mt-4">
                                Save
                                </Button>
                            </div>
                          </div>
                        </ModalBody>
                      </Modal>
                    </div>
                </div>
              </ListGroup>
            </ListGroup>
          </ListGroupItem>

          <Modal
            isOpen={modal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={toggleModal}
            contentClassName="custom-modal-style-product">
          </Modal>
        </>
      )}
    </>
  );
};