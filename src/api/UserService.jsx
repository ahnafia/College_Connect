import axios from "axios";

const profile_API = "http://localhost:8080/user/profile";

// Fetch profile information using token in Authorization header
export async function fetchProfile(token) {
    return await axios.post(profile_API,{
        token: `Bearer ${token}` 
    }
);
}
