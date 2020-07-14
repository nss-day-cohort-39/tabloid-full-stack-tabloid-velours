import React, { useContext, useEffect } from "react"
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import {CardColumns, Button} from "reactstrap"
import { useHistory } from "react-router-dom";

const PostList = () => {
    const { posts, getAllPosts} = useContext(PostContext);
    const history = useHistory();

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line 
      }, []);

    const handleClick = () => {
        history.push(`/addposts`);
    }

    return (
        <>
            <Button onClick={handleClick}>Add Post</Button>
            <CardColumns>
                {
                    posts.map(post => {
                        return <Post post={post} />
                    })
                }
            </CardColumns>
        </>
    )
}

export default PostList