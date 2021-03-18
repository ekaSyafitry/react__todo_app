import React, {Fragment, Component} from "react"
import Loader from '../../component/loader'
import Cookies from 'js-cookie'
import {
    Link
  } from "react-router-dom";
import axios from "../../axios";

// import firebase from './index.js'



class Login extends Component{
    state = {
        isLoad: false,
        email: "",
        password: "",
        token: Cookies.get('token')
    }
    componentDidMount = () => {
        console.log(this.state.token)
        if(this.state.token) return this.props.history.push('/dashboard')
    }
    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({
          ...this.state,
          [event.target.name]: value
        });
    }
    handleLogin = async (e) => {
        e.preventDefault()
        await this.setState({
             isLoad: true
         })
         try{
            const loginData = await axios({
                method: 'post',
                url: `/user/login`,
                data: {
                    email: this.state.email,
                    password: this.state.password,
                }
            })
            Cookies.set('token', loginData.data.data.token);
            this.props.history.push("/dashboard")
            console.log(loginData, 'logindata')
         }catch (err){
            await this.setState({
                isLoad: false
            })
            alert(`${err.response.data.message}`)
            console.log(err.response)
         }
    }
    render(){
        return(
            <Fragment>
            <div className="container register">
             {this.state.isLoad === true ?
                <div className="wrapLoad">
                    <Loader/>
                </div>
                : ''
                }
                <div className="box">
                    <h1 className="title">Log in</h1>
                    <form action="" onSubmit={this.handleLogin}>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email"  value={this.state.email}  onChange={this.handleInputChange} required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.state.password}  onChange={this.handleInputChange}  required minLength="8"/>
                    <div className="btn">
                    <button>Submit</button>
                    </div>
                    </form>
                    <div>Didn't have an account? <Link to="/register">Register</Link></div>
                </div>               
            </div>
        </Fragment>
        )
    }
}

export default Login;