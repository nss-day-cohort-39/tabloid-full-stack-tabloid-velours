import React, { createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostReactionContext = createContext();

export function PostReactionProvider(props) {
  const { getToken } = useContext(UserProfileContext);

  const apiUrl = "/api/postreaction/";

    const addPostReaction= (pr) => {
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pr),
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Unauthorized");
        })
      );
    };

    const deletePostReaction= (id) => {
      return getToken().then((token) =>
        fetch(apiUrl + `${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
      );
    };

  return (
    <PostReactionContext.Provider
      value={{
        addPostReaction,
        deletePostReaction
      }}
    >
      {props.children}
    </PostReactionContext.Provider>
  );
}
