import React, {Component, Fragment} from "react"
import './Home.scss'

class notFound extends Component{
 render(){
     return(
        <Fragment>
        <div id="message">
            <h2>404</h2>
            <h1>Page Not Found</h1>
            <p>The specified file was not found on this website. Please check the URL for mistakes and try again.</p>
        </div>
        </Fragment>
     )
 }
}
export default notFound;