
import React,{createContext, useEffect, useReducer, useState} from 'react'
export const Context= createContext()

export const ContextProvider = (props) => {
    const [selected, setSelected] = useState(1)
    const [userProfileInfo, setUserProfileInfo] = useState({})
    const [filterbyLikeOrMyPosts, setFilterByLikeOrMyPosts] = useState(0)
    const [postEditInfo, setPostEditInfo] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [showRight, setShowRight] = useState(true)
    const [noShow, setNoShow] = useState(false)
    const [newPostCount, setNewPostCount] = useState(0)
    const [valorASaltar, setValorASaltar] = useState(0)
    const [newPostCountByUser, setNewPostCountByUser] = useState(0)
    const [rightbarNewPost,setRightbarNewPost] = useState({})
    const [likedPost, setLikedPost] = useState({})
    const [mobileRightbar, setMobileRightbar] = useState(false)
    const [mediaModular, setMediaModular] = useState("")
    const [toaster, setToaster] = useState(false)
    const [mensaje, setMensaje] = useState(false)
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        console.log(JSON.parse(loggedInUser))
        if (loggedInUser) {
            setUserProfileInfo(JSON.parse(loggedInUser))
            
        }
      },[userInfo]);
    useEffect(()=>{
        
        console.log(window.innerWidth)
    },[])
    useEffect(() => {
        if(userInfo.username !== userProfileInfo.username){
            setSelected(0)
            window.scrollTo(0, 0)
        }else if(userInfo.username === userProfileInfo.username){
            setSelected(3)
            window.scrollTo(0, 0)
        }
    },[userInfo])
    return(
        <Context.Provider
                value={{
                    selected,
                    userInfo, 
                    setUserInfo,
                    setSelected,
                    userProfileInfo,
                    setUserProfileInfo,
                    filterbyLikeOrMyPosts,
                    setFilterByLikeOrMyPosts,
                    postEditInfo,
                    setPostEditInfo,
                    showRight,
                    setShowRight,
                    noShow, setNoShow,
                    newPostCount, setNewPostCount,
                    valorASaltar, setValorASaltar,
                    newPostCountByUser, setNewPostCountByUser,
                    rightbarNewPost,setRightbarNewPost,
                    setLikedPost, likedPost,
                    mobileRightbar, setMobileRightbar,
                    mediaModular, setMediaModular,
                    toaster, setToaster,
                    mensaje, setMensaje
                }}
            >
            {props.children}
        </Context.Provider>
    )
}