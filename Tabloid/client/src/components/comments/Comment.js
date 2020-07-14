import React, { useContext, useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Modal, ModalHeader, ModalBody
} from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider"
import moment from "moment";
import { EditComment } from "./EditComment";
import "../posts/Post.css"


export const Comment = ({ comment }) => {
  const { deleteComment, editComment} = useContext(CommentContext);
  const formattedDate = moment(comment.createDateTime).format("MM/DD/YYYY")
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal) 
  
      return (
      <>
      <br></br>
        <ListGroup>
          <ListGroupItem className="comment">
            <ListGroupItemHeading>
              {comment.subject}
            </ListGroupItemHeading>
            <ListGroupItemText>
              "{comment.content}"
              <br></br>
              <i>Posted by {comment.userProfile.fullName} on {formattedDate}</i>
            </ListGroupItemText>
            <ListGroup horizontal>
              {userProfile.id === comment.userProfileId  &&
                <i className="fa fa-pencil-square-o icon--comment" aria-hidden="true" onClick={() => toggleModal() }>
                </i>  
              }
              <br></br>
              {Boolean(userProfile.id === comment.userProfileId | userProfile.userTypeId === 1) &&            
                <i className="fa fa-trash-o icon--comment" aria-hidden="true" onClick={() =>
                  window.confirm("Are you sure you wish to delete this comment?") && deleteComment(comment.id)}>
                </i> 
              }
              <br></br>
            </ListGroup>
          </ListGroupItem>
        </ListGroup>


        <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                        toggle={toggleModal} contentClassName="custom-modal-style-product" >
                        <ModalHeader toggle={toggleModal}>Edit "{comment.subject}"</ModalHeader>
                        <ModalBody>
                            <EditComment comment={comment} toggle={toggleModal} />
                        </ModalBody>
                    </Modal>
      </>
    );
 
};
