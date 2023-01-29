import React, { useContext, useState } from 'react'
import "../styles/sidebar.css"
import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { Context } from '../context/context';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Sidebar = ({setMessages, setConversationId, conversationId, doapost, setDoapost, renderingChat, mensaje, setMensaje}) => {
  
  const {mobileRightbar, setMobileRightbar, selected, setSelected, newPostCount,darkmode, userProfileInfo, setUserProfileInfo, filterbyLikeOrMyPosts, setFilterByLikeOrMyPosts} = useContext(Context)

  return (
    <div style={{position: renderingChat && "static"}} className="sidebar">
      <div className="sidebarwrapper">
        <nav>
        <ul className="sidebarList">
          <Link to="/">
          <li style={{position:"relative", color: selected === 1 && "white", backgroundColor: selected === 1 && "rgb(26, 26, 26)"}} className="sidebarListItem">
          <HomeIcon />
            {window.innerWidth > 600 && <p onClick={() => {setSelected(1)
            setFilterByLikeOrMyPosts(0)}}>Home</p>}
            
            {newPostCount !== 0 &&
            <div style={{position:"absolute", top:"1px", width:"8px", backgroundColor:"red", height:"8px", borderRadius:"50%"}}></div>

            }
          </li>
          </Link>
          <Link to={"/chats"}>
          <li onClick={() => setMensaje(false)}style={{position:"relative", color: selected === 2 && "white", backgroundColor: selected === 2 && "rgb(26, 26, 26)"}} className="sidebarListItem">
            <ChatIcon />
            {window.innerWidth > 600 && <p onClick={() => setSelected(2)}>Chats</p>}
            {mensaje &&
            <div style={{position:"absolute", top:"1px", width:"8px", backgroundColor:"red", height:"8px", borderRadius:"50%"}}></div>

            }

          </li>
          </Link>
          <Link to={`/${userProfileInfo.username}`}>
          <li style={{color: selected === 3 && "white", backgroundColor: selected === 3 && "rgb(26, 26, 26)"}} className="sidebarListItem">
            <AccountCircleOutlinedIcon />
            {window.innerWidth > 600 &&  <p onClick={() => {
              setFilterByLikeOrMyPosts(1)
              setSelected(3)}}>Profile</p>}
           
          </li>
          </Link>
          {
            (window.innerWidth <= 600 && !renderingChat) &&
            <li onClick={() => {
              setMobileRightbar(!mobileRightbar)
              setSelected(4)
            }}style={{zIndex:"1000px", color: selected === 4 && "white", backgroundColor: selected === 4 && "rgb(26, 26, 26)"}} className="sidebarListItem">
            <KeyboardDoubleArrowLeftIcon />
            
           
          </li>
          }
          { (window.innerWidth <= 600 && conversationId !== "" && renderingChat) &&
            <li onClick={() => {
              setConversationId("")
              setMessages([])
              }}>
            <p> <ArrowBackIcon /> </p>
            </li>}
        </ul>
        </nav>
        {!renderingChat  &&
        <div style={{display:Object.keys(userProfileInfo).length === 0 && "none"}}onClick={() => setDoapost(!doapost)} className="post"><p className="spanpost">{window.innerWidth > 600 ? "POST" : "P"}</p></div>
}
      </div>
    </div>
  )
}

export default Sidebar