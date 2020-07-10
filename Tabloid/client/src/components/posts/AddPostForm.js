import React, {useRef, useContext} from 'react';
import { PostContext } from '../../providers/PostProvider';

const AddPostForm = () => {
    const {addPost} = useContext(PostContext)

    const constructNewPost = () => {
        const newPostObj = {
            title: title.current.value,
            content: content.current.value,
            imageLocation: imageLoc.current.value,

        }
    }

    return (
        <>
        </>
    )
}