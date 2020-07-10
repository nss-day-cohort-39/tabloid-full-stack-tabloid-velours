import React, { useContext } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider"

export const Comment = ({ comment }) => {
  const { deleteComment } = useContext(CommentContext);

  return (
    <>
      <h1>{comment.post.title}</h1>
      <ListGroup>
        <ListGroupItem active>
          <ListGroupItemHeading>
            {comment.subject} posted by {comment.post.userProfile.fullName}
          </ListGroupItemHeading>
          <ListGroupItemText>
            {comment.content}
            {comment.createDateTime}
          </ListGroupItemText>
          <i class="fa fa-pencil-square-o" aria-hidden="true" onClick={(e) =>
              this.editComment(e)}>
              Edit
          </i>  
          <i class="fa fa-trash-o" aria-hidden="true" onClick={(e) =>
              window.confirm("Are you sure you wish to delete this comment?") &&
              this.deleteComment(e)}>
              Delete
          </i>  
        </ListGroupItem>
      </ListGroup>
    </>
  );
};
