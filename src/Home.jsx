import React, {Component} from "react"
// import firebase from './index.js'
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from "react-router-dom";

//pages
import Dashboard from './pages/Dashboard/Dashboard';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
// import Notfound from '../public/404.hmtl'

class Home extends Component{
 render(){
     return(
         <Router>
             {/* <Link to="/dashboard">Youtube Component</Link> */}
             <Switch>
             <Route path="/" exact component={LandingPage}></Route>
             <Route path="/dashboard" component={Dashboard}></Route>
             <Route path="/register" component={Register}></Route>
             <Route path="/login" component={Login}></Route>
             {/* <Route path="*"  component={Notfound}> </Route> */}
             </Switch>
         </Router>
     )
 }
}
export default Home;