import React, {useEffect, useContext} from "react";
import { Card, CardBody, CardLink } from "reactstrap";
import { Link } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import { CommentContext } from "./providers/CommentProvider";



export const CommentList = ({postId}) => {
    const { comments, getCommentsByPostId } = useContext(PostContext);

    useEffect(() => {
        getCommentsByPostId(postId)
    }, []);

    return (
        <Card className='text-left'>
            <CardBody>
            {
                        (comments.length)
                            ? comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))
                            : <div className="alert alert-secondary mt-1" role="alert"> No comments were found.</div>
                    }
                    <br />
                <CardLink to={`/posts/${comment.postId}`}>
                    <Link to={`/posts/${comment.postId}`}>
                        <small className="text-left px-2">Return to {comment.post.title}</small>
                    </Link>
                </CardLink>
            </CardBody>
        </Card>
    );
}

