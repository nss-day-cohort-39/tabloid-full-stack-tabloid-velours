import React, {useEffect, useContext} from "react";
import { Card, CardBody, CardLink } from "reactstrap";
import { Link } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider"
import { Comment } from "./Comment"

export const CommentList = ({comments}) => {
    // const { comments, getCommentsByPostId } = useContext(CommentContext);

    // useEffect(() => {
    //     getCommentsByPostId(postId)
    // }, []);
    debugger

    return (
        <Card className='text-left'>
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
    );
}

