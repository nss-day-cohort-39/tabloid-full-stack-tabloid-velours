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
  const { deleteComment, editComment } = useContext(CommentContext);
  const formattedDate = moment().format('MM/DD/YYYY', comment.createDateTime)

  return (
    <>
      <h1>{comment.post.title}</h1>
      <ListGroup>
        <ListGroupItem active>
          <ListGroupItemHeading>
            {comment.subject} posted by {comment.post.fullName}
          </ListGroupItemHeading>
          <ListGroupItemText>
            {comment.content}
            <br></br>
            <i>posted on {formattedDate}</i>
          </ListGroupItemText>
          <i class="fa fa-pencil-square-o" aria-hidden="true" onClick={(e) =>
              this.editComment(e)}>
              Edit
          </i>  
          <br></br>
          <i class="fa fa-trash-o" aria-hidden="true" onClick={() =>
              window.confirm("Are you sure you wish to delete this comment?") &&
              deleteComment(comment.id)}>
              Delete
          </i>  
        </ListGroupItem>
      </ListGroup>
    </>
  );
};
