import axios from "axios";
let url = process.env.REACT_APP_API_URL
if(process.env.NODE_ENV !== 'development') {
    url = 'https://todos-app-mnc.herokuapp.com/'
}

const instance = axios.create({
    baseURL: url
})

export default instance;