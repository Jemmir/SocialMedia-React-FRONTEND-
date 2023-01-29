import React, { useContext, useEffect, useState } from 'react'
import { getConversations } from '../API/conversation'
import Conversations from '../components/Conversations'
import Messages from '../components/Messages'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Context } from '../context/context'

const Chats = () => {
    const [renderingChat, setRenderingChat] = useState(true)
    const {setSelected, userProfileInfo} = useContext(Context)
    const [conversations, setConversations] = useState([])
    const [conversationId, setConversationId] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [username, setUsername] = useState("")
    const [members, setMembers] = useState("")
    const [myLastMessage, setMyLastMessage] = useState("")
    const [doapost, setDoapost] = useState(false)
    const [messages, setMessages] = useState([])

  
      useEffect(() => {
        const gettingConversation = async() => {
          const resConversation = await getConversations(userProfileInfo.username)
          setConversations(resConversation.data)
        }
        gettingConversation()
      },[userProfileInfo])
      useEffect(() => {
        setSelected(2)
      },[])

  return (
    <>
    <Topbar renderingChat={renderingChat}/>
    <div className="undertopbarcontainer">
      
      
      <Sidebar setMessages={setMessages} setConversationId={setConversationId} conversationId={conversationId} renderingChat={renderingChat}/>
      <div style={{display:"flex", flexDirection:"column",  width: (conversationId === "" && window.innerWidth <= 600) ? "90%" : "25%", display: (conversationId !== "" && window.innerWidth <= 600) && "none", borderRight:" 1px solid rgb(54, 51, 51)", backgroundColor:"rgb(19, 19, 19)",borderLeft:" 1px solid rgb(54, 51, 51)"}}>
      <div style={{display:"flex", justifyContent:"center", backgroundColor:"rgb(19, 19, 19)", borderBottom:" 1px solid rgb(54, 51, 51)"}}>
        <p style={{padding:"1rem", fontSize:"1.2rem", fontWeight:"bolder", color:"white"}}>Conversations</p>
      </div>
      
      <>
      {
        conversations?.map(i => <Conversations myLastMessage={myLastMessage} setMyLastMessage={setMyLastMessage} setMembers={setMembers} setUsername={setUsername} setImgUrl={setImgUrl} conversationId={conversationId} setConversationId={setConversationId} userProfileInfo={userProfileInfo} key={i._id} i={i}/>)
      }
      </>
      </div>
      
      <Messages messages={messages} setMessages={setMessages}myLastMessage={myLastMessage} setMyLastMessage={setMyLastMessage} members={members} username={username} imgUrl={imgUrl} userProfileInfo={userProfileInfo} conversationId={conversationId} setConversationId={setConversationId}/>
     
    </div>
    </>

  )
}

export default Chats