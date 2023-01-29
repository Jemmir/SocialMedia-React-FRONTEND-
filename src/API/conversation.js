import axios from "axios"

axios.defaults.baseURL = "https://socialmedia-back.onrender.com/api";

export const createConversation = async(aPerson,bPerson) => await axios.post("/conversation", {senderUsername:aPerson, receiverUsername:bPerson })

export const getConversations = async(username) => await axios.get("/conversation/" + username)

export const updateLastMessage = async(info) => await axios.put("/conversation/", info)