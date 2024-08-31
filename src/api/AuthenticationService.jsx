import axios from "axios";


const login_API = 'http://localhost:8080/auth/login'
const signup_API = "http://localhost:8080/auth/signup"


export async function signUp(userInfo) {
    return await axios.post('http://localhost:8080/auth/signup', userInfo);
}


export async function logIn(userInfo) {
    return await axios.post('http://localhost:8080/auth/login', userInfo)
}


export async function verifyAccount(userInfo) {
    return await axios.post('http://localhost:8080/auth/verify', userInfo)
}


export async function getAccountInfo(email) {
    return await axios.get(`http://localhost:8080/student/${email}`)
}
