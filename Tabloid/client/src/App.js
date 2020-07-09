import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/views/Header";
import ApplicationViews from "./components/views/ApplicationViews";
import { CategoryProvider } from './providers/CategoryProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <CategoryProvider>
          <Header />
          <ApplicationViews />
        </CategoryProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
