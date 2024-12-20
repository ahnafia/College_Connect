import axios from "axios";

const profile_API = "http://localhost:8080/user/profile";


export async function fetchProfile(token) {
    return await axios.post(profile_API,{
        token: `Bearer ${token}` 
    }
);
}

export async function updateProfile(username, updatedStudent) {
    return await axios.put(
        `http://localhost:8080/student/${username}/update`, 
        JSON.stringify(updatedStudent), 
        {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
    );
}

export function getSimiliar(username) {
    return axios.get(`http://localhost:8080/student/findsimiliar/${username}`);
}

export function connect(username, user_requested){
    console.log(user_requested, username)
    return axios.post(`http://localhost:8080/student/connect${username}+${user_requested}`); 
}

export function getMatches(username){
    return axios.get(`http://localhost:8080/student/matches_${username}`); 
}

export function getStudent(username){
    return axios.get(`http://localhost:8080/student/get/${username}`); 
}


export function getConnections(username){
    return axios.get(`http://localhost:8080/student/connections_${username}`); 
}


export function accept(username, user_requested){
    console.log("works")
    return axios.post(`http://localhost:8080/student/accept${username}+${user_requested}`); 
}