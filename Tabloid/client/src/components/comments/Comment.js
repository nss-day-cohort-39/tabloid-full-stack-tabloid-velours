import React from "react"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';


export const Comment = ({ comment }) => {

    return (
        <>
    <h1>{comment.post.title}</h1>
            <ListGroup>
              <ListGroupItem active>
                <ListGroupItemHeading>{comment.subject} posted by {comment.userProfile.fullName}</ListGroupItemHeading>
                <ListGroupItemText>
                    {comment.content}
                    {comment.createDateTime}
                </ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          </>
        )
}

