import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'antd/dist/antd.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-image-crop/dist/ReactCrop.css';
import { HomeContent } from './Screens';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  return <HomeContent />;
}

export default App;