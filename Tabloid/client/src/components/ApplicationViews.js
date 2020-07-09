import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import LoginRegister from "./LoginRegister";
import Hello from "./Hello";
import Login from "./Login";
import Register from "./Register";
import PostList from "./posts/PostList";
import MyPostList from "./myPosts/MyPostsList";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/myposts" exact>
          {isLoggedIn ? <MyPostList /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/welcome">
          <LoginRegister/>
        </Route>

        <Route path="/Login">
          <Login/>
        </Route>

        <Route path="/Register">
          <Register/>
        </Route>
      </Switch>
      
    </main>
  );
};
