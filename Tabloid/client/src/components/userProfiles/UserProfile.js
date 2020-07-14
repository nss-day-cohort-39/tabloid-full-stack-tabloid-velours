import React from "react";
import { ListGroupItem, ListGroup } from 'reactstrap';
import "./UserProfile.css"

export const UserProfile = ({ userProfile }) => {

    return (
        <ListGroupItem>
            <ListGroup horizontal className="userProfile">
                <div className="user--info">
                    {userProfile.fullName}
                </div> 
                <div className="user--info">
                    {userProfile.displayName}
                </div> 
                <div className="user--info">
                    {userProfile.userType.name}
                </div> 
                <ListGroup horizontal>
                    <div className="icon--userProfile"> 
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                    </div>
                    <div className="icon--userProfile"> 
                        <i className="fa fa-window-close-o" aria-hidden="true"></i>
                    </div>
                </ListGroup>
            </ListGroup>
        </ListGroupItem>       
    )
}