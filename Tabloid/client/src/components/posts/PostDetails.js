import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import "./PostDetails.css"
import moment from "moment";
import { Button, CardBody, Card, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { CommentForm } from "../comments/CommentForm";
import { Comment } from "../comments/Comment"
import EditPostForm from "./EditPostForm";


const PostDetails = () => {
    const {getPostById, deletePost} = useContext(PostContext);
    const [onePost, setOnePost] = useState();
    const { id } = useParams();
    const [modal, setModal] = useState(false)
    const [postModal, setPostModal] = useState(false)
    const history = useHistory();

    
    const toggleModal = () =>  setModal(!modal)
    const togglePostModal = () => setPostModal(!postModal)
    
    
    useEffect(() => {
        getPostById(id).then(setOnePost)
        // eslint-disable-next-line 
    }, []);
    
    const refreshPost = () => {
        getPostById(id).then(setOnePost)
    }
    
    
    if (!onePost) {
        return null;
    }
    
    //edit and delete post
    const editAndDelete = () => {
        if (onePost.isCurrentUsers === true)
        {
            return (
                <>
                <i class="fa fa-pencil-square-o" aria-hidden="true"
                onClick={(e) => {
                    e.preventDefault()
                    togglePostModal()
                }}>
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
    const formattedDate = moment(onePost.publishDateTime).format("MM/DD/YYYY")
    const sortedComments = onePost.commentList.sort((a,b) => new Date(b.createDateTime).getTime() - new Date(a.createDateTime).getTime())
    
    
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
                    {editAndDelete()}
                    {
                        onePost.tagList.map(tag => (<div>{tag.name}</div>))
                    }
                    <Button color="primary" onClick={toggleModal} style={{ marginBottom: '1rem' }}>Add Comment</Button>
    
                    <Card className='text-left'>
                    <h3> Comments</h3>
    
                <CardBody>
                {
                            (sortedComments.length)? sortedComments.map((comment) => (
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
                            <CommentForm refreshPost={refreshPost} postId={id} toggle={toggleModal} />
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={postModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                        toggle={togglePostModal} contentClassName="custom-modal-style-product" >
                        <ModalHeader toggle={togglePostModal}>Edit "{onePost.title}"</ModalHeader>
                        <ModalBody>
                            <EditPostForm refreshPost={refreshPost} onePost={onePost} toggle={togglePostModal} />
                        </ModalBody>
                    </Modal>
                </div>
    
            </>
    
        )


}

export default PostDetails