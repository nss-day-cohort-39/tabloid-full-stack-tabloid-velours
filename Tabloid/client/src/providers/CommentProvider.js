import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/comment/";

    
    const getCommentsByPostId = (postId) => {
        debugger
        getToken().then((token) => 
        fetch(apiUrl + `${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((res) => res.json())
          .then(setComments));
      }

      const addComment = (comment) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));
    };

    const editComment = (comment) => {
        getToken().then((token) =>
            fetch(apiUrl + `${comment.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(comment)
                }).then(resp => {
                    if (resp.ok) {
                        return resp.json();
                    }
                    throw new Error("Unauthorized");
                }));
        };
    
    const deleteComment = (id) => {
        getToken().then((token) =>
            fetch(apiUrl + `${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }).then(resp => {
                if (resp.ok) {
                    return ;
                }
                throw new Error("Unauthorized");
            }));
    };
    
    return (
    <CommentContext.Provider value={{ comments, getCommentsByPostId, addComment, deleteComment, editComment}}>
        {props.children}
    </CommentContext.Provider>
    );
}
