import React, {Fragment, Component} from "react"
import todo from '../../assets/todoList.svg'
import {
    Link
  } from "react-router-dom";

// import firebase from './index.js'

import './LandingPage.scoped.scss'

class LandingPage extends Component{
    render(){
        return(
        <Fragment>
            <div className="container landing">
                <div>
                 <img src={todo} alt="" width="100%" /> 
                </div>
                <h1>The only to-do app you need</h1>
                <div>
                <p>Planning the daily work,
                    it has never been so impacting                  
                </p>
               <Link to="/register"> <button>Start</button> </Link>
                </div>
               
                </div>
        </Fragment>
        )
    }
}

export default LandingPage;