import React, { useContext, useEffect } from 'react';
import { ListGroup,Jumbotron, Container } from 'reactstrap';
import { UserProfile } from "../userProfiles/UserProfile";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import "./UserProfile.css";

export const DeactivatedList = () => {
    const { userProfiles, getUserProfiles } = useContext(UserProfileContext)

    useEffect(() => {
        getUserProfiles();
        // eslint-disable-next-line 
      }, []);
const deactivatedUsers = userProfiles.filter(userProfile=>userProfile.isActivated === false)

if (deactivatedUsers.length > 0) {
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
                    {deactivatedUsers.map(dUp =>
                        <UserProfile key={dUp.id} deactivatedUser={dUp}/>
                    )} 
                </ListGroup>
            </section>
        </>
    )
} else {
    return (
        <>
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">There are no deactivated Users!</h1>
              <p className="lead">Get to deactivating those Slytherins &amp; trolls; use &amp; abuse your superpowers!</p>
            </Container>
          </Jumbotron>
        </div>
        </>
      );
}
    
}