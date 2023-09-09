import axios from "axios"


export const CommentService = {
    addComment : async (token, comment) => {
        const res = await axios.post("https://webstar-post-app.onrender.com/api/comment", comment, {
            headers:{
                    access_token: token,
            }
        });
        return res.data;
    },
    delComment: async (token , id) => {
        const res = await axios.delete(`https://webstar-post-app.onrender.com/api/comment/${id}`, {
            headers: {
                access_token: token,
            },
        })
        return res.data
    },
    updComment: async(token , id, content) => {
        const res = await axios.put(`https://webstar-post-app.onrender.com/api/comment/${id}` , content, {
            headers: {
                access_token: token,
            },
        })
        return res.data;
    },
}