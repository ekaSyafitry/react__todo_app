import React, {Fragment, Component} from "react"
import Loader from '../../component/loader'
import axios from '../../axios'
import Cookies from "js-cookie";
import {
    Link
  } from "react-router-dom";

// import firebase from './index.js'
import './Register.scss'

class LandingPage extends Component{
    state = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confPassword: "",
        isLoad: false,
        token: Cookies.get('token')
    }
    componentDidMount = () => {
        console.log(this.state.token)
        if(this.state.token) return this.props.history.push('/dashboard')
    }
    handleRegister = async (e) => {
        console.log("laaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        e.preventDefault()
       await this.setState({
            isLoad: true
        })
        if (this.state.password !== this.state.confPassword){
            await this.setState({
                isLoad: false
            })
           return alert('password not match!')
        }
        try{
            const register = await axios({
                method: 'post',
                url: `/user/register`,
                data: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password,
                    confPassword: this.state.confPassword
                }
            })
            console.log(register)
            await this.setState({
                isLoad: false
            })
            alert('Success Register, silahkan melakukan Log in !!')
            this.props.history.push('/login')
        }catch (err){
            await this.setState({
                isLoad: false
            })
            alert(`${err.response.statusText}`)
            console.log(err)
        }          
    }
    handleInputChange = (event) => {
        console.log(event.target.name)
        const value = event.target.value;
        this.setState({
          ...this.state,
          [event.target.name]: value
        });
        // this.setState({firstName: event.target.value});
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
                    <h1 className="title">Sign Up</h1>
                    <form action="" onSubmit={this.handleRegister}>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="firstname" value={this.state.firstName} onChange={this.handleInputChange} required/>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" name="lastname"  value={this.state.lastName}  onChange={this.handleInputChange} />
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email"  value={this.state.email}  onChange={this.handleInputChange} required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.state.password}  onChange={this.handleInputChange}  required minLength="8"/>
                    <label htmlFor="confPassword">Password Confirmation</label>
                    <input type="password" name="confPassword"  value={this.state.passwordConf}  onChange={this.handleInputChange}  required minLength="8"/>
                    <div className="btn">
                    <button>Submit</button>
                    </div>
                   
                    </form>
                    <div>Do you have an account? <Link to="/login">Login</Link></div>
                </div>               
            </div>
        </Fragment>
        )
    }
}

export default LandingPage;