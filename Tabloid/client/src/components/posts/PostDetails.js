import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import "./PostDetails.css"
import moment from "moment";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { CommentList } from "../comments/CommentList";
import { useHistory } from 'react-router-dom';


const PostDetails = () => {
    const {getPostById, deletePost, editPost} = useContext(PostContext);
    const [onePost, setOnePost] = useState();
    const { id } = useParams();
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
                {editAndDelete()}
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>View Comments</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <CommentList comments ={onePost.commentList}/>
          </CardBody>
        </Card>
      </Collapse>
            </div>
        
        </>

    )
}

export default PostDetails