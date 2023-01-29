import axios from "axios"


axios.defaults.baseURL = "https://socialmedia-back.onrender.com/api";

export const getMessages = async(conversationId) => await axios.get("/messages/" + conversationId)

export const sendMessage = async(info) => await axios.post("/messages", info)