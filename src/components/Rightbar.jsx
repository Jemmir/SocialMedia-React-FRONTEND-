import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { getMostLikedFriendPost, LikePost } from '../API/posts'
import { Context } from '../context/context'
import "../styles/rightbar.css"
import Profile from "../assets/perfil.png"
import Posts from './Posts'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TimeAgo from 'react-timeago'
import ClipLoader from "react-spinners/ClipLoader";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReactPlayer from 'react-player'


const Rightbar = () => {
  const {mobileRightbar, setMobileRightbar, rightbarNewPost,setRightbarNewPost, noShow, setNoShow, userInfo,showRight, setUserInfo, userProfileInfo, setUserProfileInfo, postEditInfo, setPostEditInfo} = useContext(Context)
  const [rightbarInfo, setRightBarInfo] = useState({})
  const [vo, setvo] = useState(true)
  const [drag, setDrag] = useState(false)
  const [showHover, setShowHover] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [liked, setLiked] = useState(false)
 
  useEffect(() => {
    console.log(rightbarNewPost)
  },[rightbarNewPost])
  const handleLike = async() => {
    try {
        const ResLike = await LikePost(rightbarNewPost._id, {userId: userProfileInfo._id})
        liked === false ? setLiked(true) : setLiked(false)
        console.log(ResLike)
        return
    } catch (error) {
        
    }
    
}


  
  useEffect(() => {
    if(Object.keys(rightbarInfo).length === 0){
      setSpinner(true)
    const getMostLikedPost = async () => {
      
        setNoShow(false)
     
        try {
        const ResPosts = await getMostLikedFriendPost(userProfileInfo._id)
        
        let cambio = ResPosts.data._id 
        delete ResPosts.data._id
        ResPosts.data.info.userId = cambio
        
        let nuevaInfo = ResPosts.data.info
        
        Object.keys(ResPosts.data).length === 0 ? setNoShow(true) : setRightBarInfo(nuevaInfo)
        
          setSpinner(false)
        
        }catch (error) {
        setNoShow(true)
        setSpinner(false)
        }
      
    
  }
  getMostLikedPost()
  }
},[userInfo])
  
  


  return (
    <div style={{ display: (!showRight || Object.keys(userProfileInfo).length === 0)  && "none", }}className={window.innerWidth <= 600 ? (mobileRightbar === false ? "rightbarmobile" : "rightbarmobile mobile") : "rightbar"}>
      <div className="rightbarTopText">
          <b style={{width:"100%", textAlign:"center",  }}>The most popular post of all your friends</b>
          
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
        <ClipLoader 

          color={"red"}
          loading={spinner}
          
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
        </div>
          
     { spinner === false &&
     
     <div style={{padding: noShow  && "0.3rem"}} className="rightbarContainer">
      
        {noShow === false ?
        <Posts rightbarInfo={rightbarInfo} setRightBarInfo={setRightBarInfo}/>
        :
        <p style={{alignSelf:"center", width:"100%", fontSize:"2rem"}}>It seems like there is not a post to hightlight. Make some friends or wait till one of their post become popular.  </p>
        }
      </div>
}
      <div className={Object.keys(rightbarNewPost).length === 0 ? "rightbarNewPost dark" : "rightbarNewPost"}>
            <p style={{ alignSelf:"center", fontSize:"1.2rem", alignSelf:"center", }}>Your Last Post:</p>
            <div style={{marginTop:"1rem", borderBottom:"none"}} className="imgPlusPostsContainer">
            
            <div className="imgContainer">
                <img style={{display: Object.keys(rightbarNewPost).length === 0 ? "none" : null}}className="profileImg" src={userProfileInfo.profilePicture?.url || Profile} alt="" />
            </div>
            <div className="postsContainer">
                <div className="postsTop">
                    <div style={{display:"flex", alignItems:"center"}}className="nameplustimeago">
                   
                    <p className="nameontimeline">{userProfileInfo.name}</p>
                    
                    
                    <p className={Object.keys(rightbarNewPost).length === 0 ? "rightbarTimeAgo" : "rightbarTimeAgo dark"}>{rightbarNewPost.createdAt !== undefined && <TimeAgo date={rightbarNewPost?.createdAt} minPeriod={30}/>}</p>

                    </div>
                                       
                    
                    
                </div>
                <div style={{maxHeight:"8vh", overflowY:"auto"}} className="postsComment">
                    <p>{rightbarNewPost.desc}</p>
                </div>
               
                { (rightbarNewPost.img !== undefined || rightbarNewPost.video !== undefined || rightbarNewPost.uploadVideo?.url !== undefined || rightbarNewPost.uploadImg?.url !== undefined) &&
                <div style={{maxHeight:"20vh", display:"flex", justifyContent:"center", width:"100%"}}className="postsMedia"> 
                    {(rightbarNewPost.img !== undefined|| rightbarNewPost.uploadImg !== undefined)&&
                    <div style={{margin:"0px", width: (rightbarNewPost.video !== undefined || rightbarNewPost.uploadVideo.url !== undefined) ? "50%" : "100%"}}className="postMediaImg">
                        <img style={{margin:"0px", width: "100%" }} className="postsMediaImg" src={rightbarNewPost.img || rightbarNewPost.uploadImg?.url} alt="" />
                    </div>
                    
                    }
                    {(rightbarNewPost.video !== undefined || rightbarNewPost.uploadVideo.url !== undefined) &&
                    <div style={{margin:"0px", width: (rightbarNewPost?.img !== undefined || rightbarNewPost?.uploadImg?.url !== undefined) ? "50%" : "100%" }}className="postsMediaVideo">
                    <ReactPlayer  url={rightbarNewPost?.video && rightbarNewPost.video || rightbarNewPost.uploadVideo?.url && rightbarNewPost.uploadVideo?.url} controls={true} height={"100%"} width={"100%"}/>
                    </div>
}
                </div>
}
                { 
                <div className="postsInteractions">
                                          
                        <><p onClick={handleLike} className={Object.keys(rightbarNewPost).length === 0 ? "heartoutlined dark" : "heartoutlined"}>{liked === false ? <FavoriteBorderIcon /> : <FavoriteIcon/>}
                        <p style={{position:"absolute",left:"24px", bottom:"-2px", fontSize:"11px", color:"white"}}></p></p>
                        <p>{liked === false ? "Drop your like" : "Liked"}</p></>
                                                          
                </div>
}
             </div>
            </div>
            </div>
        
    </div>
  )
}

export default Rightbar