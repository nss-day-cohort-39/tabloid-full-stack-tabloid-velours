import React from "react"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const Post = ({post}) => {
    return (
        <>
            <Card>
                <CardImg top width="100%" src={post.imageLocation} alt="Card image cap" />
                <CardBody>
                <CardTitle>{post.title}</CardTitle>
                <CardSubtitle>Written by: {post.userProfile.displayName}</CardSubtitle>
                <CardText>category</CardText>
                <Button>Button</Button>
                </CardBody>
            </Card>
        </>

    )
}

export default Post