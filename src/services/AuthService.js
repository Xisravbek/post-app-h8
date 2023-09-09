import axios from 'axios';

export const AuthService = {
    login: async function (user) {
        const res = await axios.post("https://webstar-post-app.onrender.com/api/login", user);
        return res.data;
    },
    register: async function (user) {
        const res = await axios.post("https://webstar-post-app.onrender.com/api/signup" , user);
        return res.data;
    },
    // getUserInfo : async function(token) {
    //     const res = await axios.get("https://webstar-post-app.onrender.com/api/", {
    //         headers: {
    //             access_token: token,
    //         } 
    //     });
    //     return res.data;
    // } 
}