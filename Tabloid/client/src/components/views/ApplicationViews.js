import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginRegister from "../auth/LoginRegister";
import PostList from "../posts/PostList";
import MyPostList from "../myPosts/MyPostsList";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Hello from "../auth/Hello";
import CategoryList from "../categories/CategoryList";

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

        <Route path="/categories">
          <CategoryList />
        </Route>
      </Switch>
      
    </main>
  );
};
