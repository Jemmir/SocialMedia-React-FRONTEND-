import React, { useContext, useEffect, useState } from 'react'
import Feed from '../components/Feed'
import MediaModular from '../components/MediaModular'
import Post from '../components/Post'
import PostEditer from '../components/PostEditer'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Context } from '../context/context'
import toasto, { Toaster } from 'react-hot-toast';
import io from "socket.io-client"
import "../styles/home.css"

export const socket = io("https://socialmedia-back.onrender.com")

const Home = () => {
  const [doapost, setDoapost] = useState(false)
  const [home, setHome] = useState(true)
  const {setMensaje, mensaje, userProfileInfo, toast, mediaModular, setMediaModular, setRightbarNewPost, setNewPostCountByUser, setSelected, setValorASaltar, newPostCount, setNewPostCount, filterbyLikeOrMyPosts, setFilterByLikeOrMyPosts, postEditInfo, setPostEditInfo,setShowRight} = useContext(Context)
  
  useEffect(() => {
    toast && toasto.success("Edited successfully")
},[toast])


  useEffect(() => {
    socket.emit("addUser", userProfileInfo.username)
 
    socket.on("getMessage", () => setMensaje(true)) 
        
  
  
  
  

  
  },[])
  
  useEffect(() => {
    setNewPostCount(0)
    setNewPostCountByUser(0)
    setValorASaltar(0)
    setSelected(1)
    setRightbarNewPost({})
  },[])
  useEffect(() => {
    setShowRight(true)
    if(filterbyLikeOrMyPosts !== 0){
    setFilterByLikeOrMyPosts(0)
    
    }
  },[filterbyLikeOrMyPosts])

  return (
    <>
    {mediaModular !== "" && 
    <>
    <MediaModular />
    </>
    }

    {
      window.innerWidth <= 600 && 
      <Rightbar />
      
    }
    
    {postEditInfo.desc !== undefined &&
    <>
    <PostEditer />
    </>
    }
    {doapost && 
    <Post doapost={doapost} setDoapost={setDoapost} />
    }
    
    <Topbar />
    <Toaster />
    <div className="undertopbarcontainer">
      
      <Feed setHome home/>
      <Sidebar setMensaje={setMensaje} mensaje={mensaje} doapost={doapost} setDoapost={setDoapost}/>
      
      <Rightbar />
    </div>
    </>
  )
}

export default Home