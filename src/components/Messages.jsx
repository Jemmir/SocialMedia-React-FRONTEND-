import { StepContext } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { getMessages, sendMessage } from '../API/messages'
import "../styles/messages.css"
import Profile from "../assets/perfil.png"
import { socket } from '../routes/Home'
import { updateLastMessage } from '../API/conversation'
const Messages = ({ setMessages, messages, setMyLastMessage, conversationId, imgUrl,  userProfileInfo, alreadyCreatedConversations, username, members}) => {
const [text,setText] = useState("")

const [socketMessage, setSocketMessage] = useState([])
const ref = useRef()
  useEffect(()=> {
    if(conversationId !== ""){
      const getMessagesFromUser = async() => {
        const res = await getMessages(conversationId)
        setMessages(res.data)
      }
      getMessagesFromUser()
    }
    
    console.log(conversationId)

  },[conversationId])


  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  },[messages])
  useEffect(() => {
    
      socket.on("getMessage", (mensaje) => setSocketMessage(prev => ([...prev, {sender: mensaje.senderUsername, text:mensaje.text}]))) 
        
  


  
  },[])
  useEffect(() => {
    
    if(members === socketMessage[socketMessage.length - 1]?.sender){
    
      setMessages(prev => ([...prev, ...socketMessage]))
    }
    
  },[socketMessage, members])

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await sendMessage({conversationId: conversationId, sender:userProfileInfo.username, text:text})
      const resUpdate = await updateLastMessage({senderUsername: userProfileInfo.username, receiverUsername: members, text:text})
      setMyLastMessage({sender:members, text:text, itisme:"yes"})
      socket.emit("sendMessage", {senderUsername: userProfileInfo.username, receiverUsername: username, text:text })
      setMessages(prev => ([...prev, {sender: userProfileInfo.username, text:text}]))
      setText("")
    return
    } catch (error) {
     
    }
    
  }
  
  if(conversationId === "" && window.innerWidth > 600) return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", width: "45%", fontSize:"2rem", backgroundColor:"rgb(19, 19, 19)", color:"white", fontWeight:"bold"}}>Messages Box</div>
  )
  if(conversationId !== "") return (
    
    <div  style={{width: (window.innerWidth <= 600 && conversationId !== "") && "90%", display: (window.innerWidth <= 600 && conversationId === "") && "none" }}className="messagesContainer">
      <div  className="messagesTop">
      {messages?.map(i => 
      <div  style={{display:"flex", flexDirection:"row", justifyContent: i.sender === userProfileInfo.username ? "flex-end" : "flex-start", marginTop:"0.5rem", }} key={i._id}>
        {i.sender !== userProfileInfo.username && 
        <img  className="profileImg" src={imgUrl || Profile} alt="" />}
        <p ref={ref} style={{marginTop:"1.1rem", marginLeft:"0.3rem", backgroundColor: i.sender === userProfileInfo.username ? "rgb(219, 12, 53)" : "black", padding:"0.5rem", borderTopLeftRadius: i.sender === userProfileInfo.username && "1rem", borderBottomRightRadius: i.sender === userProfileInfo.username && "0.5rem", borderBottomLeftRadius : i.sender !== userProfileInfo.username && "0.5rem", borderTopRightRadius: i.sender !== userProfileInfo.username && "1rem"  }}>{i.text}</p>
      </div>)}
      </div>
      <form onSubmit={handleSubmit} className="messagesBottom">
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Do you have something to say?. Write it" className="textareaMessages" name="" id="" cols="" rows="" />
        <button type="submit" className="sendButton">Send</button>
      </form>
      
    </div>
  )
}

export default Messages