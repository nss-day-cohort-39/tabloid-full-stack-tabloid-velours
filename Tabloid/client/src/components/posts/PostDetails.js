import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";
import "./PostDetails.css"
import moment from "moment";

const PostDetails = () => {
    const {getPostById} = useContext(PostContext);
    const [onePost, setOnePost] = useState();
    const { id } = useParams();

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
            </div>
        </>

    )
}

export default PostDetails