import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../../providers/PostProvider";
import { CommentContext } from "../../providers/CommentProvider";
import { useParams } from "react-router-dom";
import "./PostDetails.css"
import moment from "moment";
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { CommentList } from "../comments/CommentList";
import { CommentForm } from "../comments/CommentForm";
import { Comment } from "../comments/Comment"

const PostDetails = () => {
    const {getPostById} = useContext(PostContext);
    const {comments, getCommentsByPostId} = useContext(CommentContext);
    const [onePost, setOnePost] = useState();
    const { id } = useParams();
    const [modal, setModal] = useState(false)
   
    const toggleModal = () => {
      
        setModal(!modal)
      }

    useEffect(() => {
        getPostById(id).then(setOnePost)
    }, []);

    useEffect(() => {
        getCommentsByPostId(id)
    }, []);


    if (!onePost) {
        return null;
    }

    if (!comments) {
        return null;
      }

    const formattedDate = moment().format('MM/DD/YYYY', onePost.publishDateTime)


        return (
            <>
                <div className="postDetailsContainer">
                    <div className="imgContainer">
                        <img src={onePost.imageLocation} alt="" />
                    </div>
                    <div className="titleContainer"><h1>{onePost.title}</h1></div>
                    <div className="authorContainer">Written by: <span className="author">{onePost.userProfile.displayName}</span></div>
                    <div className="contentContainer">{onePost.content}</div>
                    <div className="publishedDate">Published: {formattedDate}</div>
                    <Button color="primary" onClick={toggleModal} style={{ marginBottom: '1rem' }}>Add Comment</Button>
    
                    <Card className='text-left'>
                    <h3> Comments</h3>
    
                <CardBody>
                {
                            (comments.length)? comments.map((comment) => (
                                    <Comment key={comment.id} comment={comment} />
    
                                ))
                                : <div className="alert alert-secondary mt-1" role="alert"> No comments were found.</div>
    
                        }
                        <br />
    
                </CardBody>
            </Card>
    
    
          <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                        toggle={toggleModal} contentClassName="custom-modal-style-product" >
                        <ModalHeader toggle={toggleModal}>Add a comment to "{onePost.title}"</ModalHeader>
                        <ModalBody>
                            <CommentForm postId={id} toggle={toggleModal} />
                        </ModalBody>
                    </Modal>
                </div>
    
            </>
    
        )


}

export default PostDetails