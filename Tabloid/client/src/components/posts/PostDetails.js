import React, { useContext, useEffect, useState, useHistory } from "react"
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import "./PostDetails.css"
import moment from "moment";
import { Collapse, Button, CardBody, Card, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { CommentList } from "../comments/CommentList";
import { CommentForm } from "../comments/CommentForm";

const PostDetails = () => {
    const {getPostById} = useContext(PostContext);
    const [onePost, setOnePost] = useState();
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false)
    const toggle = () => setIsOpen(!isOpen);
    const toggleModal = () => setModal(!modal);


    // const history = useHistory();
    // const handleClick = () => {
    //     history.push(`/posts/comments/${onePost.id}`);
    // }
    useEffect(() => {
        getPostById(id).then(setOnePost)
    }, []);

      
    if (!onePost) {
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
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>View Comments</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <CommentList postId ={id}/>
          </CardBody>
        </Card>
      </Collapse>

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