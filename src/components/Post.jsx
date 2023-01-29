import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import "../styles/post.css"
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ShareIcon from '@mui/icons-material/Share';

import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { Context } from '../context/context';
import { CreatePost } from '../API/posts';
import io from "socket.io-client"
import { socket } from '../routes/Home'
import ClipLoader from "react-spinners/ClipLoader";



const Post = ({doapost, setDoapost}) => {
    const { setRightbarNewPost, userProfileInfo, setUserProfileInfo, setNewPostCountByUser, setValorASaltar} = useContext(Context)
    const [wordCount, setWordCount] = useState("")
    const [show, setShow] = useState(false)
    const ref = useRef(1)
    const [showUploadDiv, setShowUploadDiv] = useState(0)
    const [uploadVideo, setUploadVideo] = useState("")
    const [uploadImg, setUploadImg] = useState("")
    const [spinner, setSpinner] = useState(false)

 const handleUploadVideo = async(e) => {
      if(e.target.files[0].size <= 15000000){
        console.log(e.target.files[0])
        setUploadVideo(e.target.files[0])
      
      }else if(e.target.files[0].size > 15000000){
        alert("The video size mush be lighter than 10mb")
      }
        
      }
    const handleUploadImg = async(e) => {
      if(e.target.files[0]){
        setUploadImg(e.target.files[0])
      }
    }


    useEffect(() => {
        if(showUploadDiv !== 0){
          const timer = setTimeout(() => {
            setShow(true)
          }, 700);
          return () => clearTimeout(timer);
        }
        
      }, [showUploadDiv]);

    useEffect(() => {
        ref.current.focus()
    },[])
    const showPost = () => {
        if(doapost) setDoapost(false)
        return
    }
    
    const handlePost = async () => {
      try {
        if(wordCount.trim() !== ""){
        setSpinner(true)
        const PostRes = await CreatePost({desc: wordCount, username:userProfileInfo.username, userId:userProfileInfo._id,  uploadVideo: uploadVideo !== "" ? uploadVideo : null, uploadImg: uploadImg !== "" ? uploadImg : null})
        socket.emit("mensaje al usuario", userProfileInfo._id, {post:"yes"})
          setNewPostCountByUser(prev => prev + 1)
          setValorASaltar(prev => prev + 1)
          setRightbarNewPost(PostRes.data)
        return setDoapost(false), setSpinner(false)}
      } catch (error) {
    
        setSpinner(false)
      }
    }
  return (
    <div onClick={showPost}className="postContainer">
        <div onClick={(e) => e.stopPropagation()}className="postWrapper">
            <div  className="x">
                <div onClick={() => setDoapost(!doapost)} className="xbutton">
                <CancelIcon />
                </div>
            
            <p>Make a post</p>
            
            </div>
            <textarea onChange={(e) => setWordCount(e.target.value)} ref={ref} className="posttextarea" placeholder="Remember, be nice!" name="" id="" cols="30" rows="10"></textarea>
            <div className="charactercountandlimit">
                <p className="characterCount">Characters: {wordCount.length}{wordCount.length >= 500 && " (Limit reached)"}</p>
                <p className="characterLimit">Limit: 500</p>
            </div>
            
            <div className="buttonandicons">
                <div className="uploaders">
                  <input onChange={handleUploadImg}type="file" id="imgUploader" hidden/>
                  <label onMouseOver={() => setShowUploadDiv(1)} onMouseLeave={() => {setShow(false)
                    setShowUploadDiv(0)}}htmlFor='imgUploader'><p><AddPhotoAlternateIcon /></p></label>
                  <input onChange={handleUploadVideo} type="file" id="videoUploader" hidden/>
                  <label onMouseEnter={() => setShowUploadDiv(2)} onMouseLeave={() => {setShow(false)
                    setShowUploadDiv(0)}}htmlFor='videoUploader'><p><VideoCameraBackIcon fontSize='medium' /></p></label>
                  
                </div>
                

              <button disabled={wordCount.length >= 500} onClick={handlePost}className="postpostbutton"><ClipLoader 
         
          color={"white"}
          loading={spinner}
          
          size={"12"}
          aria-label="Loading Spinner"
          data-testid="loader"
          />{spinner === false && "POST"}</button>
              {
                show && showUploadDiv === 1 &&
                <div className="shareImgDiv">Share image</div>

              }
              {
                show && showUploadDiv === 2 &&
                <div className="shareVideoDiv">Share video</div>

              }
              
              </div>
              
        </div>

    </div>
  )
}

export default Post