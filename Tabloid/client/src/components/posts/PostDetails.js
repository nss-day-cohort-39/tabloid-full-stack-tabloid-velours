import React, { useContext, useEffect } from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import { PostContext } from "../../providers/PostProvider";

const PostDetails = ({post}) => {
    const { onePost, getOnePost} = useContext(PostContext);

    useEffect(() => {
        getOnePost();
      }, []);

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