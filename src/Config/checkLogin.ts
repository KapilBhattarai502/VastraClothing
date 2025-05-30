export const checkLogin = ()=>{
    const isLoggedIn = localStorage.getItem("token")
    return isLoggedIn ? true : false

}