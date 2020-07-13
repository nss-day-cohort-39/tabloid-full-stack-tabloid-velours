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
    const {getPostById, deletePost, editPost} = useContext(PostContext);
    const [onePost, setOnePost] = useState();
    const { id } = useParams();
    const [modal, setModal] = useState(false)
   
    const toggleModal = () => {
      
        setModal(!modal)
      }

    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const toggle = () => setIsOpen(!isOpen);


    useEffect(() => {
        getPostById(id).then(setOnePost)
    }, []);

      
    if (!onePost) {
        return null;
    }

    const editAndDelete = () => {
        if (onePost.isCurrentUsers === true)
        {
            return (
                <>
                <i class="fa fa-pencil-square-o" aria-hidden="true">
                    Edit
                </i>  
                <br></br>
                <i class="fa fa-trash-o" aria-hidden="true" 
                onClick={() =>
                    window.confirm("Are you sure you wish to delete this post?") &&
                    deletePost(onePost.id).then(history.push("/posts"))}
                    
                >
                    Delete
                </i>
                </> 
            )
        }
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