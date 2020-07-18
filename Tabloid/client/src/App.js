import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CategoryProvider } from "./providers/CategoryProvider";
import { PostProvider } from "./providers/PostProvider";
import { TagProvider } from "./providers/TagProvider";
import { CommentProvider } from "./providers/CommentProvider";
import { PostTagProvider } from "./providers/PostTagProvider";
import {ReactionProvider} from "./providers/ReactionProvider";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
          <CommentProvider>
            <CategoryProvider>
              <PostTagProvider>
                <TagProvider>
                  <ReactionProvider>
                  <Header />
                  <ApplicationViews />
                  </ReactionProvider>
                </TagProvider>
              </PostTagProvider>
            </CategoryProvider>
          </CommentProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
