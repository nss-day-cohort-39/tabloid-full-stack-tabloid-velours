import React, { useContext, useEffect } from "react"
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import {CardColumns} from "reactstrap"

const PostList = () => {
    const { posts, getAllPosts} = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
      }, []);

    return (
        <>
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