import React, { useContext, useEffect, useState } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
import { PostContext } from "../../providers/PostProvider";
import { useParams } from "react-router-dom";

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

    return (
        <>
            <Card>
                <CardImg top width="100%" src={onePost.imageLocation} alt="Card image cap" />
                <CardBody>
                <CardTitle>{onePost.title}</CardTitle>
                <CardSubtitle>Written by: {onePost.userProfile.displayName}</CardSubtitle>
                <CardText>{onePost.content}</CardText>
                </CardBody>
            </Card>
        </>

    )
}

export default PostDetails