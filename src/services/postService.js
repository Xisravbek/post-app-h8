import axios from "axios";

export const PostService = {
    getAll: async function () {
        const res = await axios.get(
            'https://webstar-post-app.onrender.com/api/post'
        );
        return res.data;
    },
    getPostById : async function(id) {
        const res = await axios.get(
            `https://webstar-post-app.onrender.com/api/post/${id}`
        );
        return res.data;
    },
    showMyPosts: async function(token) {
        const res = await axios.get("https://webstar-post-app.onrender.com/api/my", {
            headers: {
                access_token: token,
            },
        })
        return res.data;
    },
    createPost: async(token,  post) => {
        const res = await axios.post(
            "https://webstar-post-app.onrender.com/api/post", post, {
                headers: {
                    access_token: token,
                }
            }
        )
        return res.data;
    },
    delatePost: async function(id, token) {
        const res = await axios.delete(`https://webstar-post-app.onrender.com/api/post/${id}`, {
            headers: {
                access_token: token,
            }
        })
        return res.data;
    },
    updPost: async function(id, token , post) {
        const res = await axios.put(`https://webstar-post-app.onrender.com/api/post/${id}`, post, {
            headers: {
                access_token: token
            }
        })
        return res.data
    }

}