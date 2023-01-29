import React, { useContext, useEffect, useState } from 'react'
import Profile from "../assets/perfil.png"
import ReactPlayer from 'react-player'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { dummypost } from '../dummydata/dummypost';
import { getUserProfile } from '../API/users';
import { deleteMyPost, deletePost, getAPost, LikePost } from '../API/posts';
import { Context } from '../context/context';
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Posts = ({rightbarInfo, feed, posts}) => {
    const {mediaModular, setMediaModular, setNewPostCountByUser, setValorASaltar, likedPost, setLikedPost, userProfileInfo, setUserProfileInfo, postEditInfo, setPostEditInfo} = useContext(Context)
    
    const [userInfo, setUserInfo] = useState({})
    const [showHover, setShowHover] = useState(false)
    const [userRightbarInfo, setUserRightbarInfo] = useState({})
   
    useEffect(() => {
        if(postEditInfo === ""){
            toast("Edited successfully", {  
                duration: 4000,
                position: 'top-center',})
        }
    },[postEditInfo])

    
   
   useEffect(() => {
    if(posts !== undefined){
        const handleFetch = async() => {
          
            try {
                const profileInfoRes = await getUserProfile(posts.username, "nofull")
                console.log(profileInfoRes.data)
                setUserInfo(profileInfoRes.data)
                
            } catch (error) {
            
            }                                              
          }
        handleFetch()
    }
       
            

   },[posts?.username])

   useEffect(() => {
    if(rightbarInfo?.username !== undefined){
        const handleFetch = async() => {
          
            try {
                const profileInfoRes = await getUserProfile(rightbarInfo.username, "nofull")
                setUserRightbarInfo(profileInfoRes.data)
                
            } catch (error) {
                console.log(error)
            }                                              
          }
        handleFetch()
    }
       
            

   },[rightbarInfo?.username])
   console.log(rightbarInfo)
    const handleLike = async() => {
        try {
            const ResLike = await LikePost((rightbarInfo?.postId || posts._id), {userId: userProfileInfo._id})
            const resPost = await getAPost(rightbarInfo?.postId || posts._id)
            setLikedPost(resPost.data)
            console.log(ResLike)
            console.log(resPost.data)
            return
        } catch (error) {
            
        }
        
    }
    const handleEditPost = async() => {
        setPostEditInfo(posts)
        return
    }
    const handleDeletePost = async() => {
        try {
           console.log(userProfileInfo._id)
           const deleteRes = await deletePost(posts._id, {userId: userProfileInfo._id})
           setNewPostCountByUser(prev => prev - 1)
          setValorASaltar(prev => prev - 1)
            console.log(deleteRes)
            return
        } catch (error) {
            console.log(error)
        }
       
    }
   
  return (

    <>

            <div style={rightbarInfo !== undefined ? {maxHeight:"auto", borderBottom:"none", marginTop:"10px"} : null}className="imgPlusPostsContainer">
            
            <div className="imgContainer">
                <img  className="profileImg" src={userRightbarInfo.profilePicture?.url || userInfo.profilePicture?.url || Profile} alt="" />
            </div>
            <div className="postsContainer">
                <div className="postsTop">
                    <div style={{display:"flex", alignItems:"center"}}className="nameplustimeago">
                    {rightbarInfo === undefined ?
                    <Link to={"/" + userInfo.username}>
                    <p className="nameontimeline">{userRightbarInfo.name || userInfo.name}</p>
                    </Link>
                    :
                    <Link to={"/" + userRightbarInfo.username }>
                    <p className="nameontimeline">{userRightbarInfo.name || userInfo.name}</p>
                    </Link>
                    }
                    <p style={{marginLeft: "15px", fontSize:"12px", color:"lightgray"}}><TimeAgo date={posts?.createdAt} minPeriod={30}/></p>

                    </div>
                    <div className="dotsplusedit">
                    {userInfo._id === userProfileInfo._id &&
                    <p onClick={() => setShowHover(true)} onMouseLeave={() => setShowHover(false)} className="dots"><MoreHorizIcon /></p>

                    }
                    {showHover &&
                    <div className="hoverEdit" onMouseOver={() => setShowHover(true)} onMouseLeave={() => setShowHover(false)} style={{display:"flex", gap:"4px", flexDirection:"column", position:"absolute", marginLeft:"-30px", padding:"5px", marginTop:"-6px", fontSize:"13px",  border:"1px solid lightgray", borderRadius:"10px"}}>
                        <p   style={{cursor: "pointer"}} onClick={handleEditPost}>Edit Post</p>
                        <p  style={{cursor: "pointer"}} onClick={handleDeletePost}>Delete Post</p>


                    </div>
                    }
                    </div>
                    
                    
                    
                </div>
                <div className="postsComment">
                    <p>{rightbarInfo ? rightbarInfo?.desc : posts?.desc}</p>
                </div>
                {(rightbarInfo?.video ? true : rightbarInfo?.img ? true : posts?.video ? true : posts?.img ? true : false) &&
                <div style={{height:rightbarInfo !== undefined ? "12rem" : null}}className="postsMedia"> 
                    
                    <div onClick={() => setMediaModular({img: rightbarInfo ? rightbarInfo?.img : posts?.img})} style={{width: rightbarInfo !== undefined ? (!rightbarInfo?.video ? "100%": rightbarInfo?.img ? "50%" : "0%") : posts !== undefined ? (!posts?.video ? "100%" : posts?.img ? "50%" : "0%") : null}}className="postMediaImg">
                        <img className="postsMediaImg"src={rightbarInfo ? rightbarInfo?.img : posts?.img} alt="" />
                    </div>
                    
                    
                    <div onClick={() => setMediaModular({video: posts?.video || rightbarInfo?.video })} style={{display:"flex", alignItems:"center", width: rightbarInfo !== undefined ? (!rightbarInfo?.img ? "100%": rightbarInfo?.video ? "50%" : "0%") : posts !== undefined ? (!posts?.img ? "100%" : posts?.video ? "50%" : "0%") : null}}className="postsMediaVideo">
                    <ReactPlayer onClick={e => e.stopPropagation()}url={posts?.video || rightbarInfo?.video} height={"90%"} width={"100%"}/>
                    </div>
                    
                </div>
}
{(rightbarInfo?.uploadVideo ? true : rightbarInfo?.uploadImg ? true : posts?.uploadVideo ? true : posts?.uploadImg ? true : false) &&
                <div style={{height:rightbarInfo !== undefined ? "12rem" : null}}className="postsMedia"> 
                    
                    <div onClick={() => setMediaModular({img: rightbarInfo ? rightbarInfo.uploadImg.url : posts?.uploadImg.url})} style={{width: rightbarInfo !== undefined ? (!rightbarInfo?.uploadVideo ? "100%": rightbarInfo?.uploadImg ? "50%" : "0%") : posts !== undefined ? (!posts?.uploadVideo ? "100%" : posts?.uploadImg ? "50%" : "0%") : null}}className="postMediaImg">
                        <img className="postsMediaImg"src={rightbarInfo ? rightbarInfo?.uploadImg?.url : posts?.uploadImg?.url} alt="" />
                    </div>
                    
                    <div onClick={() => setMediaModular({video: rightbarInfo?.uploadVideo?.url || posts?.uploadVideo?.url })}style={{display:"flex", alignItems:"center", width: rightbarInfo !== undefined ? (!rightbarInfo?.uploadImg ? "100%": rightbarInfo?.uploadVideo ? "50%" : "0%") : posts !== undefined ? (!posts?.uploadImg ? "100%" : posts?.uploadVideo ? "50%" : "0%") : null}}className="postsMediaVideo">
                    <video onClick={e => e.stopPropagation()}src={rightbarInfo?.uploadVideo?.url || posts?.uploadVideo?.url} controls={true} height={"90%"} width={"100%"}/>
                    </div>
                    
                </div>
}

                <div className="postsInteractions">
                    {!rightbarInfo && likedPost._id !== posts._id  && 
                    (posts?.likes?.includes(userProfileInfo._id) === true ? 
                        (<><p onClick={handleLike} className="heart"><FavoriteIcon/>
                        <p style={{position:"absolute",left:"24px", bottom:"-2px", fontSize:"11px", color:"white"}}>{posts?.likes?.length}</p></p>
                        
                        <p>Liked</p>
                        </>)
                        :
                        (
                        <><p onClick={handleLike} className="heartoutlined"><FavoriteBorderIcon />
                        <p style={{position:"absolute",left:"24px", bottom:"-2px", fontSize:"11px", color:"white"}}>{posts?.likes?.length}</p></p>
                        <p>Drop your like</p></>)
                    )
                    }
                    {rightbarInfo && likedPost._id !== rightbarInfo.postId &&
                    ( rightbarInfo?.likes?.includes(userProfileInfo._id) === true ? 
                    (<><p onClick={handleLike} className="heart"><FavoriteIcon/>
                    <p style={{position:"absolute",left:"24px", bottom:"-2px", fontSize:"11px", color:"white"}}>{rightbarInfo?.likes?.length}</p></p>
                    
                    <p>Liked</p>
                    </>)
                    :
                    (
                        <><p onClick={handleLike} className="heartoutlined"><FavoriteBorderIcon />
                        <p style={{position:"absolute",left:"24px", bottom:"-2px", fontSize:"11px", color:"white"}}>{rightbarInfo?.likes?.length}</p></p>
                        <p>Drop your like</p></>)
                    )
                    
                    }
                    {rightbarInfo && likedPost._id === rightbarInfo.postId &&
                    ( likedPost?.likes?.includes(userProfileInfo._id) === true ? 
                    (<><p onClick={handleLike} className="heart"><FavoriteIcon/>
                        <p style={{position:"absolute",left:"24px", bottom:"-2px", fontSize:"11px", color:"white"}}>{likedPost?.likes?.length}</p></p>
                        
                        <p>Liked</p>
                        </>)
                        :
                        (
                        <><p onClick={handleLike} className="heartoutlined"><FavoriteBorderIcon />
                        <p style={{position:"absolute",left:"24px", bottom:"-2px", fontSize:"11px", color:"white"}}>{likedPost?.likes?.length}</p></p>
                        <p>Drop your like</p></>)
                    )}
                    
                    {
                        posts?._id === likedPost?._id && Object.keys(likedPost).length > 0 && 
                        (likedPost?.likes?.includes(userProfileInfo._id) === true ? 
                        (<><p onClick={handleLike} className="heart"><FavoriteIcon/>
                        <p style={{position:"absolute",left:"24px", bottom:"-2px", fontSize:"11px", color:"white"}}>{likedPost?.likes?.length}</p></p>
                        
                        <p>Liked</p>
                        </>)
                        :
                        (
                        <><p onClick={handleLike} className="heartoutlined"><FavoriteBorderIcon />
                        <p style={{position:"absolute",left:"24px", bottom:"-2px", fontSize:"11px", color:"white"}}>{likedPost?.likes?.length}</p></p>
                        <p>Drop your like</p></>)
                      )
                    }
                </div>
            
             </div>
            </div>
        
        
    </>
  )
}

export default Posts