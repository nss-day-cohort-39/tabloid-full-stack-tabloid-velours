import React, { useContext } from "react";
import { Button } from "reactstrap";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";

export default function SubscribeButton(post) {
  const { addSubscription } = useContext(SubscriptionContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  function submit() {
    const newSubscription = {
      ProviderUserProfileId: post.UserProfileId,
    };
    addSubscription(newSubscription);
  }

  // get the current user and check if post.UserProfileId = currentUserId
  // if so, disable the subscribe button (users cannot subscribe to their own posts)
  if (userProfile.Id !== post.UserProfileId) {
    return (
      <>
        <Button onClick={submit}>Subscribe</Button>
      </>
    );
  }
}
