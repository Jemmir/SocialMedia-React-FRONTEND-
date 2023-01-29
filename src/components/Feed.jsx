import React, { useContext, useEffect, useState } from 'react'
import { getMyLikedPosts, getMyPosts, getTimeline } from '../API/posts'
import { Context } from '../context/context'
import "../styles/feed.css"
import PostEditer from './PostEditer'
import PostOnTop from './PostOnTop'
import Posts from './Posts'
import ProfileInfo from './ProfileInfo'
import ClipLoader from "react-spinners/ClipLoader";
const Feed = ({param, profile, home}) => {
  const [feed, setFeed] = useState(true)
  const {valorASaltar, setValorASaltar, newPostCountByUser, setNewPostCountByUser, newPostCount, setNewPostCount, userInfo, setUserInfo, userProfileInfo, filterbyLikeOrMyPosts, setFilterByLikeOrMyPosts, postEditInfo, setPostEditInfo} = useContext(Context)
  const [valor, setValor] = useState(5)
  const [timeline, setTimeline] = useState([])
  const [pointer, setPointer] =useState(false)
  const [valorLimite, setValorLimite] = useState(5)


  
  const handleNewPosts = async () => {
    try {
      const resPosts = await getTimeline(userProfileInfo._id, 0, (newPostCount + newPostCountByUser))
      setTimeline(prev => ([...resPosts.data, ...prev]))
      setNewPostCount(0)
      setNewPostCountByUser(0)
    } catch (error) {
     
    }
    
  }

  const handleAsd = async() => {
    try {
      const resPosts = await getTimeline(userProfileInfo._id, (valor + valorASaltar), valorLimite)
      return setTimeline(prev => ([...prev, ...resPosts.data])), setValor(valor + 5)
      
    } catch (error) {
     
    }
    
    
   
  }
 

  useEffect(() => {
    if(filterbyLikeOrMyPosts === 0){
      
      const getPostsTimeline = async() => {
        try {
          const resPosts = await getTimeline(userProfileInfo._id, 0, valorLimite)
          console.log(resPosts.data)
          
        return setTimeline(prev => (prev, resPosts.data))
        } catch (error) {
         
          
        }
         }

      getPostsTimeline()
    }
    
  },[filterbyLikeOrMyPosts, userInfo])

  useEffect(() => {
    if(filterbyLikeOrMyPosts === 1){
      const getMyOwnTimeline = async () => {
        try {
          const resMyPosts = await getMyPosts(param.username)
          setTimeline(resMyPosts.data)
        } catch (error) {
         
        }
        
      }
      getMyOwnTimeline()
    }else if(filterbyLikeOrMyPosts === 2){
      const getMyOwnTimelineByLikes = async () => {
        try {
          const resMyLikedPosts = await getMyLikedPosts(userInfo._id)
          setTimeline(resMyLikedPosts.data)
        } catch (error) {
          
        }
      }
      getMyOwnTimelineByLikes()
    }
   
  },[filterbyLikeOrMyPosts, userInfo])

  

  return (
    
    <div className="feed">
      {postEditInfo.desc !== undefined &&
      <>
      
      <PostEditer />
      </>
      }
      <div className="feed1"></div>
      <div className="insidefeed">

        <div className="posttopfeed">
          {
            profile === true && 
            <ProfileInfo 
           
             param={param} 
            />
                       
          }
          {
            home && 
            <PostOnTop />
          }
          
        </div>
        {newPostCount !== 0 && filterbyLikeOrMyPosts === 0 &&
        <button  onPointerLeave={()=> setPointer(false)}onPointerEnter={()=> setPointer(true)} style={{borderBottom:"1px solid white", backgroundColor:"transparent", fontSize:"1rem", color: pointer ? "red" : "white", width:"100%", padding:"0.8rem", border:"none", }} onClick={handleNewPosts}>There are {newPostCount} new posts</button>
}
        {timeline.length > 0 &&
        <div className="postsfeed">
          {
            timeline?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map((posts) => <Posts key={posts._id} posts={posts} feed={feed}/>)
          }
          
          
        </div>
}
        {filterbyLikeOrMyPosts === 0 &&
        <button  onPointerLeave={()=> setPointer(false)}onPointerEnter={()=> setPointer(true)} style={{backgroundColor:"transparent", fontSize:"1rem", color: pointer ? "red" : "white", width:"100%", padding:"0.8rem", border:"none", }} onClick={handleAsd}>Display more posts</button>
        }
        
      </div>
      <div className="feed2"></div>
    </div>
  )
}

export default Feed