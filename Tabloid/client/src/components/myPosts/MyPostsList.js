import React, { useContext, useEffect } from "react"
import { PostContext } from "../../providers/PostProvider";
import Post from "../posts/Post";
import {CardColumns} from "reactstrap"

const MyPostList = () => {
    const { cuPosts, getUserPosts} = useContext(PostContext);

    useEffect(() => {
        getUserPosts();
      }, []);

    return (
        <>
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