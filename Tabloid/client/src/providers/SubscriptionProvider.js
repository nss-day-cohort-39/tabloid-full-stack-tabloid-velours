import React, { createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SubscriptionContext = createContext();

export function SubscriptionProvider(props) {
  const { getToken } = useContext(UserProfileContext);

  const apiUrl = "/api/subscription/";

  const addSubscription = (subscription) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );
  };

    const addSubscription = (subscription) => {
      return getToken().then((token) =>
        fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        }).then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("Unauthorized");
        })
      );
    };

    const deleteSubscription = (id) => {
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
    <SubscriptionContext.Provider
      value={{
        addSubscription,
        deleteSubscription
      }}
    >
      {props.children}
    </SubscriptionContext.Provider>
  );
}
