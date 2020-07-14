import React, { useContext, useEffect } from "react"
import { PostContext } from "../../providers/PostProvider";
import Post from "../posts/Post";
import {CardColumns, Button} from "reactstrap"
import { useHistory } from "react-router-dom";

const MyPostList = () => {
    const { cuPosts, getUserPosts} = useContext(PostContext);
    const history = useHistory();

    useEffect(() => {
        getUserPosts();
      }, []);
    const handleClick = () => {
        history.push(`/addposts`);
    }
    return (
        <>
            <Button onClick={handleClick}>Add Post</Button>
            <CardColumns>
                {
                    cuPosts.map(post => {
                        return <Post post={post} />
                    })
                }
            </CardColumns>
        </>
    )
}

export default MyPostList