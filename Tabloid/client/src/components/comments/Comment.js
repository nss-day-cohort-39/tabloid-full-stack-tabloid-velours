import React, { useContext } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider"
import moment from "moment";


export const Comment = ({ comment }) => {
  const { deleteComment, editComment} = useContext(CommentContext);
  const formattedDate = moment(comment.createDateTime).format("MM/DD/YYYY")
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  
      return (
      <>
      <br></br>
        <ListGroup>
          <ListGroupItem active>
            <ListGroupItemHeading>
              {comment.subject}
            </ListGroupItemHeading>
            <ListGroupItemText>
              "{comment.content}"
              <br></br>
              <i>posted by {comment.userProfile.fullName} on {formattedDate}</i>
            </ListGroupItemText>
            {userProfile.id === comment.userProfileId  &&
            <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={(e) =>
                editComment(e)}>
                Edit
            </i>  
}
            <br></br>
            {Boolean(userProfile.id === comment.userProfileId | userProfile.userTypeId === 1) &&
            
  <i className="fa fa-trash-o" aria-hidden="true" onClick={() =>
    window.confirm("Are you sure you wish to delete this comment?") && deleteComment(comment.id)}>
    Delete
  </i> 
            }
            <br></br>
          </ListGroupItem>
        </ListGroup>
      </>
    );
 
};
