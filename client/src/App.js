import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import Navbar from './components/views/Navbar/Navbar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
//import Footer from './components/views/Footer/Footer';
import Auth from './hoc/auth';
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./components/views/VideoDetailPage/VideoDetailPage";

function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch> 
          <Route exact path="/" component= {Auth(LandingPage, null)} />
          <Route exact path="/login" component= {Auth(LoginPage, false)} />
          <Route exact path='/register' component= {Auth(RegisterPage, false)} />
          <Route exact path='/video/upload' component= {Auth(VideoUploadPage, true)} />
          <Route exact path='/video/:videoId' component= {Auth(VideoDetailPage, true)} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
