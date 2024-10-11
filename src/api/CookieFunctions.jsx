export function setCookie(name, value, expiration){
    const date = new Date();
    date.setTime(date.getTime() + expiration);  // Set expiration using the provided time in milliseconds
    const expires = "; expires=" + date.toUTCString();  // Convert to UTC string format
    document.cookie = name + "=" + value + expires + "; path=/";
}


export function saveTokenToCookie(token, expiration){
    console.log("foybd")
    if (token){
        setCookie('jwt', token, expiration)
        console.log('Token saved')
    } else {
        console.log("No token")
    }
}

export function getCookie(name){
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift();
        return null
}

export function getTokenFromCookie(){
    const token = getCookie('jwt')
    if (token){
        return token
    } else{
        console.log("No token")
        return null
    }
}