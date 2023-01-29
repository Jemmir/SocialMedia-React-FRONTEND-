import React, { useContext, useEffect, useState } from 'react'
import { getConversations } from '../API/conversation'
import { getUserProfile } from '../API/users'
import { Context } from '../context/context'
import "../styles/conversations.css"
import Profile from "../assets/perfil.png"
import { socket } from '../routes/Home'

const Conversations = ({myLastMessage, socketMessage, i, userProfileInfo, conversationId, setConversationId,setImgUrl, setUsername, setMembers}) => {
  const [alreadyCreatedConversations, setAlreadyCreatedConversations] = useState([])
  const [lastMessage, setLastMessage] = useState([])
  useEffect(() => {
    const getUsersInfos = async() => {
      try {
    
        const res = await getUserProfile(...i.members.filter(i => i !== userProfileInfo.username), "nofull")
     
      setAlreadyCreatedConversations(res.data)
      
      return
      } catch (error) {
       
      }
      
      
    }
   getUsersInfos()

  },[])

  useEffect(() => {
    
    socket.on("getMessage", (mensaje) => setLastMessage(prev => ([...prev, {sender: mensaje.senderUsername, text:mensaje.text}]))) 
      




},[])

useEffect(() => {
  if(myLastMessage !== ""){
    setLastMessage(prev => ([...prev, myLastMessage]))
  }
},[myLastMessage])
  return (
    <div style={{backgroundColor: conversationId === i._id && "gray"}}onClick={() => {
    setConversationId(i._id)
    setImgUrl(alreadyCreatedConversations?.profilePicture.url)
    setUsername(alreadyCreatedConversations?.username)
    setMembers(i.members.filter(i => i !== userProfileInfo.username).toString())}} className="conversationContainer">
      
        <img className="profileImg"src={alreadyCreatedConversations?.profilePicture?.url || Profile} alt="" />
     
      <div className="namepluslastmessage">
      <p style={{fontSize:"1.1rem", fontWeight:"bold"}}>{alreadyCreatedConversations?.name}</p>
      
      {lastMessage.length !== 0 && i.members.includes(lastMessage[lastMessage.length - 1].sender) ?
      <p style={{fontSize:".8rem"}}>{lastMessage[lastMessage.length - 1].itisme !== undefined && "me: "}{lastMessage[lastMessage.length - 1].text}</p> 
      :
      <p style={{fontSize:".8rem"}}>{i.sender === userProfileInfo.username && "me: "} {i.lastMessage}</p>
      }
      
      </div>
        
    </div>
  )
}

export default Conversations