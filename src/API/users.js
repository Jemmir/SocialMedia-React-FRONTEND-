import axios from "axios"


axios.defaults.baseURL = "https://socialmedia-back.onrender.com/api";

export const loginRequest = async(user) => await axios.post("/auth/login", user)

export const RegisterRequest = async(user) => await axios.post("/auth/register", user)

export const getUserProfile = async(username, fullnofull) => await axios.get(`/users/?username=${username}&${fullnofull}=yes`)

export const FollowRequest = async(me, notme) => await axios.put(`/users/${notme}/follow`, {userId: me}) 

export const UnfollowRequest = async(me, notme) => await axios.put(`/users/${notme}/unfollow`, {userId: me}) 

export const getUserInfoSearch = async(name) => await axios.get(`/users/${name}/search`)

export const UpdateUser = async(id, info) => {
    const form = new FormData()
    for (let key in info) {
        form.append(key, info[key])
    }
    return await axios.put(`/users/${id}`, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}