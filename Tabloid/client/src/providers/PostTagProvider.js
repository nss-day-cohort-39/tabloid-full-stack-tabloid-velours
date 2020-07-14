import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = createContext();

export function PostTagProvider(props) {
  const { getToken } = useContext(UserProfileContext);

  const apiUrl = "/api/posttag/";

  const [postTags, setPostTags] = useState([]);
  const [currentPostTags, setCurrentPostTags] = useState([]);
  const [currentTagPosts, setCurrentTagPosts] = useState([]);

  const getTags = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setPostTags)
    );
  const getPostTags = (postId) =>
    getToken().then((token) =>
      fetch(apiUrl + `getbypost/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setCurrentPostTags)
    );
  const getTagPosts = (tagId) =>
    getToken().then((token) =>
      fetch(apiUrl + `getbytag/${tagId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setCurrentTagPosts)
    );

  //   const addTag = (tag) => {
  //     return getToken().then((token) =>
  //       fetch(apiUrl, {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(tag),
  //       }).then((resp) => {
  //         if (resp.ok) {
  //           return resp.json();
  //         }
  //         throw new Error("Unauthorized");
  //       }).then(getTags)
  //     );
  //   };
  //   const updateTag = (tag) => {
  //     return getToken().then((token) =>
  //       fetch(apiUrl + `${tag.id}`, {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //           body: JSON.stringify(tag),
  //         },
  //       }).then(getTags)
  //     );
  //   };
  //   const deleteTag = (id) => {
  //     return getToken().then((token) =>
  //       fetch(apiUrl + `${id}`, {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }).then(getTags)
  //     );
  //   };

  return (
    <PostTagContext.Provider
      value={{
        postTags,
        getTags,
        getPostTags,
        getTagPosts,
        currentPostTags,
        currentTagPosts,
        // addTag,
        // updateTag,
        // deleteTag,
      }}
    >
      {props.children}
    </PostTagContext.Provider>
  );
}
