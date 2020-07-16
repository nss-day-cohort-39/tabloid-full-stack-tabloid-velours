import React, { useContext, useEffect } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { UserProfile } from "../userProfiles/UserProfile";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import "./UserProfile.css";
import { useHistory } from "react-router-dom";


export const UserProfileList = () => {
  const { userProfiles, getUserProfiles } = useContext(UserProfileContext);
  const history = useHistory();
  const handleLink = () => {history.push(`/userProfiles/list/deactivated`);};

  useEffect(() => {
    getUserProfiles();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="userProfileList">
        <ListGroup horizontal className="header--userList">
          <h5 className="user-info">Full Name</h5>
          <h5 className="user-info">Display Name</h5>
          <h5 className="user-info">User Type</h5>
          <h5 className="user-info">Actions</h5>
        </ListGroup>
        <ListGroup>
          {userProfiles.map((up) => (
            <UserProfile key={up.id} userProfile={up} />
          ))}
        </ListGroup>
        <Button onClick={handleLink}>View Deactivated Users</Button>
      </section>
    </>
  );
};
