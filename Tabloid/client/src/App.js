import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/views/Header";
import ApplicationViews from "./components/views/ApplicationViews";
import { CategoryProvider } from './providers/CategoryProvider';
import { PostProvider } from './providers/PostProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
          <CategoryProvider>
            <Header />
            <ApplicationViews />
          </CategoryProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
