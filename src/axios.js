import axios from "axios";
let url = process.env.REACT_APP_API_URL

// console.log(process.env.NODE_ENV, 'envvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv')
if(process.env.NODE_ENV !== 'development') {
    url = 'https://todos-app-mnc.herokuapp.com/'
}
// console.log(url, 'urllllllllllllllllllllllllllllllllllllllllllllll')
const instance = axios.create({
    baseURL: url
})

export default instance;