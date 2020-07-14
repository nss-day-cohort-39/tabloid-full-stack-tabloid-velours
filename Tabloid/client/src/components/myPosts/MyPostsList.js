import React, { useContext, useEffect } from "react"
import { PostContext } from "../../providers/PostProvider";
import Post from "../posts/Post";
import {CardColumns, Button} from "reactstrap"
import { useHistory } from "react-router-dom";
import "../posts/Post.css";

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
        <section>
        <div className="postsHeader">
                    <h2>My Posts</h2>
                </div>
            <div className="btn--addPost">
                <Button color="info" size="lg" onClick={handleClick}>Add Post</Button>
            </div>
            <CardColumns>
                {
                    cuPosts.map(post => {
                        return <Post post={post} />
                    })
                }
            </CardColumns>
            </section>
        </>
    )
}

export default MyPostList