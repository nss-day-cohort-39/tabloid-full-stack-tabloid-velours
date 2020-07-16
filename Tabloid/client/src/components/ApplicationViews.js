import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginRegister from "./LoginRegister";
import PostList from "./posts/PostList";
import MyPostList from "./myPosts/MyPostsList";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import TagList from "./tag/TagList";
import Hello from "./Hello";
import { CategoryList } from "./categories/CategoryList";
import PostDetails from "./posts/PostDetails";
import AddPostForm from "./posts/AddPostForm";
import { UserProfileList } from "./userProfiles/UserProfileList";
import {UserProfileDetails} from "./userProfiles/UserProfileDetails";
import { DeactivatedList } from "./userProfiles/DeactivatedList";


export default function ApplicationViews() {
  const { isLoggedIn, isAdmin } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/welcome" />}
        </Route>
        <Route path="/tags">
          {isLoggedIn ? <TagList /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/myposts" exact>
          {isLoggedIn ? <MyPostList /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/posts/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/addposts" exact>
          {isLoggedIn ? <AddPostForm /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/userProfiles/:id" exact>
          {isLoggedIn && isAdmin ? <UserProfileDetails /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/welcome">
          <LoginRegister/>
        </Route>

        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/register">
          <Register/>
        </Route>

        <Route path="/categories">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userProfiles" exact>
          {isLoggedIn && isAdmin ? <UserProfileList /> : <Redirect to="/welcome" />}
        </Route>

        <Route path="/userProfiles/list/deactivated" exact>
          {isLoggedIn && isAdmin ? <DeactivatedList/> : <Redirect to="/welcome" />}
        </Route>
        
      </Switch>
      
    </main>
  );
};
