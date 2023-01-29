
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import "../styles/post.css"
import Profile from "../assets/perfil.png"
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ShareIcon from '@mui/icons-material/Share';
import CheckIcon from '@mui/icons-material/Check';
import { Context } from '../context/context'
import { CreatePost } from '../API/posts'
import io from "socket.io-client"
import ClipLoader from "react-spinners/ClipLoader";
import { socket } from '../routes/Home'



      

const PostOnTop = () => {
    useEffect(() => {
      socket.on("mensaje usuario", (mensaje) => {if(userProfileInfo.following.includes(mensaje.userId)){
        setNewPostCount(prev => prev + 1)
        setValorASaltar(prev => prev + 1)
      }})

    },[])
 

    const {rightbarNewPost,setRightbarNewPost, userProfileInfo, setUserProfileInfo,setNewPostCountByUser, newPostCount, setNewPostCount, valorASaltar, setValorASaltar} = useContext(Context)
    const [wordCount, setWordCount] = useState("")
    const [showUploadDiv, setShowUploadDiv] = useState(0)
    const [show, setShow] = useState(false)
    const [showPostItems, setShowPostItems] = useState(false)
    const [coord, setCoord] = useState({})
    const [videoUrl, setVideoUrl] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [showShareVideo, setShowShareVideo] = useState(0)
    const [uploadVideo, setUploadVideo] = useState("")
    const [uploadImg, setUploadImg] = useState("")
    const ref = useRef(1)
    const ref2 = useRef(2)
    const [spinner, setSpinner] = useState(false)
    useEffect(() => {
      if(showUploadDiv !== 0){
        const timer = setTimeout(() => {
          setShow(true)
        }, 700);
        return () => clearTimeout(timer);
      }
      
    }, [showUploadDiv]);

    const handlePost = async () => {
      
      
      try {
        if(wordCount !== ""){
          setSpinner(true)
        if(videoUrl.trim() !== "" && videoUrl.startsWith("https://www.youtube.com/watch?v") && imgUrl.trim() !== ""){
          const PostRes = await CreatePost({desc: wordCount, name:userProfileInfo.name, userId:userProfileInfo._id, username:userProfileInfo.username, img:imgUrl, video:videoUrl, uploadVideo: uploadVideo !== "" ? uploadVideo : null, uploadImg: uploadImg !== "" ? uploadImg : null})
          socket.emit("mensaje al usuario", userProfileInfo._id, {post:"yes"})
          setRightbarNewPost(PostRes.data)
          setNewPostCountByUser(prev => prev + 1)
          setValorASaltar(prev => prev + 1)
          setImgUrl("")
        setVideoUrl("")
        setWordCount("")
        setSpinner(false)
        return
        }else if(videoUrl.trim() !== "" && videoUrl.startsWith("https://www.youtube.com/watch?v")) {
          const PostRes = await CreatePost({desc: wordCount, name:userProfileInfo.name, userId:userProfileInfo._id, username:userProfileInfo.username, video:videoUrl, uploadVideo: uploadVideo !== "" ? uploadVideo : null, uploadImg: uploadImg !== "" ? uploadImg : null})
           socket.emit("mensaje al usuario", userProfileInfo._id, {post:"yes"})
           setRightbarNewPost(PostRes.data)
                   
                              
           setNewPostCountByUser(prev => prev + 1)
          setValorASaltar(prev => prev + 1)
          setImgUrl("")
        setVideoUrl("")
        setWordCount("")
        setSpinner(false)
        return
        }else if(imgUrl.trim() !== ""){
          const PostRes = await CreatePost({desc: wordCount, name:userProfileInfo.name, username:userProfileInfo.username, img:imgUrl, userId:userProfileInfo._id, uploadVideo: uploadVideo !== "" ? uploadVideo : null, uploadImg: uploadImg !== "" ? uploadImg : null})
          socket.emit("mensaje al usuario", userProfileInfo._id, {post:"yes"})
          setRightbarNewPost(PostRes.data)
                   
                              
          setNewPostCountByUser(prev => prev + 1)
          setValorASaltar(prev => prev + 1)
          setImgUrl("")
        setVideoUrl("")
        setWordCount("")
        setSpinner(false)
        return
        }else if(videoUrl.trim() === "" && imgUrl.trim() === ""){
          const PostRes = await CreatePost({desc: wordCount,username:userProfileInfo.username, name:userProfileInfo.name, userId:userProfileInfo._id, uploadVideo: uploadVideo !== "" ? uploadVideo : null, uploadImg: uploadImg !== "" ? uploadImg : null})
          setRightbarNewPost(PostRes.data)
                   
                              
          
          socket.emit("mensaje al usuario", userProfileInfo._id, {post:"yes"})
          setNewPostCountByUser(prev => prev + 1)
          setValorASaltar(prev => prev + 1)
          setImgUrl("")
        setVideoUrl("")
        setWordCount("")
        setSpinner(false)
          return
        }
      


        }
        
        
        
      } catch (error) {
      
        setSpinner(false)
      }
    }

    const handleUploadVideo = async(e) => {
      if(e.target.files[0].size <= 15000000){
        console.log(e.target.files[0])
        setUploadVideo(e.target.files[0])
      
      }else if(e.target.files[0].size > 15000000){
        alert("The video size mush be lighter than 15mb")
      }
        
      }
    const handleUploadImg = async(e) => {
      if(e.target.files[0]){
        setUploadImg(e.target.files[0])
      }
    }
  return (
    <div className={showPostItems ? "postOnTopContainerOn" : "postOnTopContainer"}>
        
            <div>
              {
                showShareVideo === 1 &&
              <div style={{zIndex:2,position:"absolute",gap:"8px", backgroundColor:"rgb(43, 41, 41)", width:"38.3vw", display:"flex", flexDirection:"column", top:140, height:"10vh", borderTopLeftRadius:"20px", borderTopRightRadius:"20px"}}>
                <p><b style={{marginLeft:"10px", marginTop:"5px"}}>Paste the video's url</b></p>
              <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                <div style={{display:"flex", width:"92%", borderRadius:"10px", overflow:"hidden", border:""}}>
                  <input onChange={e => setVideoUrl(e.target.value)} style={{outline: "none", width:"90%", alignSelf:"center", padding:"8px"}} value={videoUrl} placeholder="Do you have a video url to share?" type="text" />
                  <button onClick={()=> setShowShareVideo(0)}style={{color:"white",border:"none", backgroundColor:"#DC143C", width:"calc(90%-10px)",cursor:"pointer"}}><CheckIcon /></button>
                </div>
              
              </div>
              </div>
              }
              {
                showShareVideo === 2 &&
              <div style={{zIndex:2,position:"absolute",gap:"8px", backgroundColor:"rgb(43, 41, 41)", width:"38.3vw", display:"flex", flexDirection:"column", top:140, height:"10vh", borderTopLeftRadius:"20px", borderTopRightRadius:"20px"}}>
                <b style={{marginLeft:"10px", marginTop:"5px"}}>Paste the image's url</b>
              <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
                <div style={{display:"flex", width:"92%", borderRadius:"10px", overflow:"hidden", border:""}}>
                  <input onChange={e => setImgUrl(e.target.value)} style={{outline: "none", width:"90%", alignSelf:"center", padding:"8px"}} value={imgUrl} placeholder="Do you have a image url to share?" type="text" />
                  <button ref={ref2} onClick={()=> setShowShareVideo(0)}style={{color:"white",border:"none", backgroundColor:"#DC143C", width:"calc(90%-10px)",cursor:"pointer"}}><CheckIcon /></button>
                </div>
              
              </div>
              </div>
              }
            
              <div className="postOnTopImg">
              
                <img className="profileImg" src={userProfileInfo.profilePicture?.url || Profile} alt='profile photo' />
             
                <textarea  value={wordCount} onFocus={() => setShowPostItems(true)} onChange={(e) => setWordCount(e.target.value)} ref={ref} className="postontoptextarea" placeholder="What's new?" name="" id="" cols="30" rows="10"></textarea>

              </div>
              {showPostItems &&
              <div className="buttonandicons">
                 
                <div className="uploaders">
                  {imgUrl === "" && videoUrl === ""  &&
                  <>
                  <input onChange={handleUploadImg}type="file" id="imgUploader" hidden/>
                  <label onMouseOver={() => setShowUploadDiv(1)} onMouseLeave={() => 
                    {setShow(false)
                    setShowUploadDiv(0)}}htmlFor='imgUploader'><p><AddPhotoAlternateIcon /></p></label>
                  
                  </>
                  }
                  {videoUrl === ""  && imgUrl === "" &&
                  <>
                  <input onChange={handleUploadVideo}type="file" id="videoUploader" hidden/>
                  <label onMouseEnter={() => setShowUploadDiv(2)} onMouseLeave={() => {setShow(false)
                    setShowUploadDiv(0)}}htmlFor='videoUploader'><p><VideoCameraBackIcon fontSize='medium' /></p></label>
                  </>
                  }
                  {
                    uploadImg === "" && uploadVideo === "" && window.innerWidth > 600 &&
                    <p style={{cursor:"pointer"}} onClick={() => setShowShareVideo(1)} onMouseEnter={(e) => {setCoord({X: e.clientX, Y: e.clientY})
                  setShowUploadDiv(3)
                  }} onMouseLeave={() => {setShow(false)
                    setShowUploadDiv(0)}}><ShareIcon /></p>
                  }
                 
                  {uploadVideo === "" &&  uploadImg === "" && window.innerWidth > 600 &&
                    <p style={{cursor:"pointer"}} onClick={() => setShowShareVideo(2)} onMouseEnter={(e) => {setCoord({X: e.clientX, Y: e.clientY})
                    setShowUploadDiv(4)
                    }} onMouseLeave={() => {setShow(false)
                      setShowUploadDiv(0)}}><ShareIcon /></p> 
                  }
                     
                
              
                </div>
                

              <button onClick={handlePost} disabled={wordCount.length >= 500} className="posttoppostbutton">
<ClipLoader 
       
          color={"white"}
          loading={spinner}
          
          size={"12"}
          aria-label="Loading Spinner"
          data-testid="loader"
          />{spinner === false && "POST"}</button>
              
              </div>
              
              }
              
              {
                show && showUploadDiv === 1 &&
                <div style={{ fontSize:"12px" ,position:"absolute", backgroundColor:"transparent",  right:"60%", color:"white", border:"1px solid gray"}}>Upload image</div>

              }
              {
                show && showUploadDiv === 2 &&
                <div style={{fontSize:"12px",position:"absolute", backgroundColor:"transparent",  right:"54%", color:"white", border:"1px solid gray"}}>Upload video</div>

              }
              {
                show && showUploadDiv === 3 &&
                <div style={{fontSize:"12px",position:"absolute", backgroundColor:"transparent",  right:coord.X+50 + "px", top:coord.Y+"px", color:"white", border:"1px solid gray"}}>Share existing video</div>
              }
              {
                show && showUploadDiv === 4 &&
                <div style={{fontSize:"12px",position:"absolute", backgroundColor:"transparent",  right:coord.X+50 + "px", top:coord.Y+"px", color:"white", border:"1px solid gray"}}>Share existing image</div>
              }
            </div>
            
            
            
    </div>

    
  )
}

export default PostOnTop