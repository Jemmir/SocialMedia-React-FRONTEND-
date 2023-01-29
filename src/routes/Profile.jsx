import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../components/Feed'
import MediaModular from '../components/MediaModular'
import Post from '../components/Post'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Context } from '../context/context'
import "../styles/home.css"
import { socket } from './Home'
const Profile = () => {
    const [doapost, setDoapost] = useState(false)
    const [profile, setProfile] = useState(true)
    const param = useParams()
    const {setMensaje,mensaje, mediaModular, setMediaModular, setRightbarNewPost, setNewPostCountByUser, setSelected, setValorASaltar, newPostCount, setNewPostCount, filterbyLikeOrMyPosts, setFilterByLikeOrMyPosts, postEditInfo, setPostEditInfo,setShowRight} = useContext(Context)

    useEffect(() => {
      socket.on("getMessage", () => setMensaje(true)) 

    },[])

  return (
    <>
    {mediaModular !== "" && 
    <>
    <MediaModular />
    </>
    }
    {doapost && 
    <Post doapost={doapost} setDoapost={setDoapost} />
    }
    <Topbar />
    <div className="undertopbarcontainer">
      
      <Feed param={param} profile={profile} setProfile={setProfile}/>
      <Sidebar setMensaje={setMensaje} mensaje={mensaje} profile doapost={doapost} setDoapost={setDoapost}/>
      
      <Rightbar profile/>
    </div>
    </>
  )
}

export default Profile