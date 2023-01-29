import React, { useContext, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Context } from '../context/context'
import "../styles/mediamodular.css"
const MediaModular = () => {
    const {mediaModular, setMediaModular, setNewPostCountByUser, setValorASaltar, likedPost, setLikedPost, userProfileInfo, setUserProfileInfo, postEditInfo, setPostEditInfo} = useContext(Context)
    useEffect(() => {
        console.log(mediaModular)
    },[mediaModular])
  return (
    <div onClick={() => setMediaModular("")}className="mediaModularContainer">
        {mediaModular.img !== undefined ? 
                <img style={{maxWidth:"80%"}} onClick={(e) => e.stopPropagation()}src={mediaModular.img} alt="" />: 
                <ReactPlayer url={mediaModular.video} controls={true} height={"50%"} width={"80%"}/>
                //<video onClick={(e) => e.stopPropagation()} url={mediaModular.video} controls={true} height={"50%"} width={"80%"} />
         }
    </div>
  )
}

export default MediaModular