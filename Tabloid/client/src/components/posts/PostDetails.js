import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../../providers/PostProvider";
import { useParams, useHistory } from "react-router-dom";
import "./Post.css"
import moment from "moment";
import { Button, CardBody, Card, Modal, ModalHeader, ModalBody, ListGroup } from 'reactstrap';
import { CommentForm } from "../comments/CommentForm";
import { Comment } from "../comments/Comment"
import EditPostForm from "./EditPostForm";
import TagManager from "../tag/TagManager";
import { UploadImgContext } from "../../providers/UploadImgProvider";


const PostDetails = () => {
    const { getPostById, deletePost } = useContext(PostContext);
    const {getImgURL} = useContext(UploadImgContext)
    const [onePost, setOnePost] = useState();
    const [img, setImg] = useState()
    const { id } = useParams();
    const [modal, setModal] = useState(false)
    const [postModal, setPostModal] = useState(false)
    const [tagModal, setTagModal] = useState(false)

    const history = useHistory();
    const toggleModal = () => setModal(!modal)
    const togglePostModal = () => setPostModal(!postModal)
    const toggleTagModal = () => setTagModal(!tagModal)
    
    
    
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
    
    const imgURL = getImgURL(onePost.imageLocation)
    
    //edit and delete post
    const editAndDelete = () => {
        if (onePost.isCurrentUsers === true) {
            return (
                <>
                <ListGroup horizontal>
                    <i className="fa fa-pencil-square-o icon--comment" aria-hidden="true" style={{cursor:'pointer'}}
                        onClick={(e) => {
                            e.preventDefault()
                            togglePostModal()
                        }}>
                    </i>
                    <br></br>
                    <i className="fa fa-trash-o icon--comment" aria-hidden="true" style={{cursor:'pointer'}}
                        onClick={() =>
                            window.confirm("Are you sure you wish to delete this post?") &&
                            deletePost(onePost.id).then(history.push("/posts"))}
                    >
                    </i>
                </ListGroup>
                </>
            )
        }
    }

    const formattedDate = moment(onePost.publishDateTime).format("MM/DD/YYYY")
    const sortedComments = onePost.commentList.sort((a, b) => new Date(b.createDateTime).getTime() - new Date(a.createDateTime).getTime())
    return (
        <>
            <section className="postDetailsContainer">
                <div className="imgContainer">
                    <img className="img--postDetails" src={imgURL} alt="" />
                </div>
                <div className="titleContainer"><h1>{onePost.title}</h1></div>
                <div className="authorContainer">Written by: <span className="author">{onePost.userProfile.displayName}</span></div>
                <div className="contentContainer">{onePost.content}</div>
                <div className="publishedDate">Published: {formattedDate}</div>
                {editAndDelete()}
                    <div className="tagMngBtnContainer">
                    <Button outline color="info" onClick={toggleTagModal} style={{ marginBottom: '1rem', width: "100%" }}>Tag Manager</Button>

                    </div>
                <div className="tagContainer">
                    {
                        onePost.postTagList.map(pT => (<div className="tagBox">{pT.tag.name}</div>))
                    }
                </div>
    
                <Card className="text-left">
                    <Button outline color="secondary" onClick={toggleModal} style={{ marginBottom: "50px" }}>Add Comment</Button>
                    <div className="mt-10">
                        <h3 className="postsHeader">Comments</h3>
                    </div>
                    <CardBody>
                        {
                            (sortedComments.length) ? sortedComments.map((comment) => (
                                <Comment refreshPost={refreshPost} key={comment.id} comment={comment} />
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
                <Modal isOpen={tagModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                    toggle={toggleTagModal} contentClassName="custom-modal-style-product" >
                    <ModalHeader toggle={toggleTagModal}>Tag Manager</ModalHeader>
                    <ModalBody>
                        <TagManager refreshPost={refreshPost} onePost={onePost} toggle={toggleTagModal} />
                    </ModalBody>
                </Modal>
            </section>
        </>
    )
}

export default PostDetails