import React from "react";
import { Card, CardBody} from "reactstrap";
import { Comment } from "./Comment"

export const CommentList = ({comments}) => {

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

