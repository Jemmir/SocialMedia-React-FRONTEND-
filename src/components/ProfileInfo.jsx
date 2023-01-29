import React, { useContext, useState } from 'react'
import "../styles/profileinfo.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect } from 'react';
import { FollowRequest, getUserProfile, UnfollowRequest, UpdateUser } from '../API/users';
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../context/context';
import Perfil from "../assets/perfil.png"
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ClipLoader from "react-spinners/ClipLoader";
import toasto, { Toaster } from 'react-hot-toast';
import EmailIcon from '@mui/icons-material/Email';
import { createConversation } from '../API/conversation';
const ProfileInfo = ({param}) => {
    const {toast,setRightbarNewPost, setSelected, setShowRight, userInfo, setUserInfo, userProfileInfo, setUserProfileInfo, filterbyLikeOrMyPosts, setFilterByLikeOrMyPosts} = useContext(Context)

    
    const [show, setShow] = useState(0)
    const [followShow, setFollowShow] = useState(false)
    const [changes, setChanges] = useState(false)
    const [showTextInput, setShowTextInput] = useState(false)
    const [showTextInput2, setShowTextInput2] = useState(false)
    const [showTextInput3, setShowTextInput3] = useState(false)
    const [allInfoObject, setAllInfoObject] = useState({})
    const [descText, setDescText] = useState(userProfileInfo.desc)
    const [profileNameText, setProfileNameText] = useState(userProfileInfo.name)
    const [profileCountryText, setProfileCountryText] = useState(userProfileInfo.from)
    const [img, setImg] = useState(userProfileInfo.profilePicture)
    const [cover, setCover] = useState(userProfileInfo.coverPicture)
    const [newMedia, setNewMedia] = useState({})
    const {username} = param
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        toast && toasto.success("Edited successfully")
    },[toast])
    const handleFollow = async() => {
        try {
            const res = await FollowRequest(userProfileInfo._id, userInfo._id)
            const array = userProfileInfo
            array.following.push(userInfo._id)
            setUserProfileInfo(array)
            
            localStorage.setItem("user", JSON.stringify(userProfileInfo))
            return setFollowShow(true)
        } catch (error) {
            
        }
        
    }

    const handleUnfollow = async() => {
        try {
            const res = await UnfollowRequest(userProfileInfo._id, userInfo._id)
            const array = userProfileInfo
            const filtrado = array.following.filter(i => i !== userInfo._id)
            array.following = filtrado
            setUserProfileInfo(prev => ({...prev, following: filtrado}))
           
            localStorage.setItem("user", JSON.stringify(array))
            return setFollowShow(false)
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleChanges = async() => {
        setSpinner(true)
        try {
           
            const updateRes = await UpdateUser(userProfileInfo._id, {userId: userProfileInfo._id, name: profileNameText !== "" ? profileNameText : userProfileInfo.name, from: profileCountryText !== "" ? profileCountryText : userProfileInfo.from, desc:descText !== "" ? descText : userProfileInfo.desc, image: img?.url !== "" ? img : userProfileInfo.profilePicture, cover: cover?.url !== "" ? cover : userProfileInfo.coverPicture})
            console.log(updateRes.data)
            let sustituto = userProfileInfo
            userProfileInfo.profilePicture !== undefined && (sustituto.profilePicture = userProfileInfo.profilePicture?.url !== updateRes.data.profilePicture.url ? updateRes.data?.profilePicture : userProfileInfo.profilePicture)   
            userProfileInfo.coverPicture !== undefined && (sustituto.coverPicture = userProfileInfo.coverPicture?.url !== updateRes.data?.coverPicture?.url ? updateRes.data?.coverPicture : userProfileInfo.coverPicture)       
            userProfileInfo.profilePicture === undefined && updateRes.data?.profilePicture !== undefined && (sustituto.profilePicture = updateRes?.data?.profilePicture)
            userProfileInfo.coverPicture === undefined && updateRes?.data?.coverPicture !== undefined && (sustituto.coverPicture = updateRes?.data?.coverPicture)

         
            sustituto.name = profileNameText !== "" ? profileNameText : userProfileInfo.name
            sustituto.from = profileCountryText !== "" ? profileCountryText : userProfileInfo.from
            sustituto.desc = descText !== "" ? descText : userProfileInfo.desc
            localStorage.setItem("user", JSON.stringify(sustituto))
            userProfileInfo.profilePicture !== undefined &&  userProfileInfo.profilePicture.url !== updateRes.data?.profilePicture?.url && setNewMedia(prev => ({...prev, profileImg: updateRes.data.profilePicture.url}))
            userProfileInfo.coverPicture !== undefined &&  userProfileInfo.coverPicture.url !== updateRes.data?.coverPicture?.url && setNewMedia(prev => ({...prev, coverImg: updateRes.data?.coverPicture?.url}))

         
            setShowTextInput(false)
            setShowTextInput2(false)
            setShowTextInput3(false)
            setChanges(false)
            return setSpinner(false)
        } catch (error) {
            console.log(error)
            setSpinner(false)
        }
       
    }

    useEffect(() => {
        setShowRight(true)
        
            setFilterByLikeOrMyPosts(1)
       
            
        
        
    },[userInfo, username])

    useEffect(() => {
        userInfo.username === userProfileInfo.username && setSelected(3)
        setRightbarNewPost({})
    },[userInfo])

    useEffect(() => {
        setShow(0)
        const getUserInfo = async() => {
            try {
                const profileInfoRes = await getUserProfile(username, "full")
                setShow(1)
                return setUserInfo(profileInfoRes.data)
            } catch (error) {
                console.log(error)
                if(error.response.status === 500) return setShow(2)
            }         
                               
                
        }
        
        getUserInfo()
        
    },[username])

    const handleConversation = async() => {
        try {
            const resConversation = await createConversation(userProfileInfo.username, userInfo.username)
            console.log(resConversation)
            return navigate("/chats")
        } catch (error) {
            console.log(error.response.data)
            error.response.data === "Conversation already exists" && navigate("/chats")
            return
        }
       
    }

    if(Object.keys(userInfo).length === 0 && show === 2) 
    
    return (
        <div style={{fontSize:"50px", fontWeight:"bold", display:"flex", justifyContent:"center", alignItems:"center"}}>
           {setShowRight(false)}
            User not found
        </div>
    )
    
    else if(Object.keys(userInfo).length !== 0 && show === 1) return (
    
    <div className="profileInfoContainer">
        <Toaster/>
        <div className="profileCoverImgPlusEdit"> 
            <img  style={{}}className="profileCoverImg" src={userInfo._id === userProfileInfo._id ? (newMedia?.coverImg !== undefined ? newMedia.coverImg : userProfileInfo?.coverPicture?.url !== undefined ? userProfileInfo.coverPicture?.url : "https://p4.wallpaperbetter.com/wallpaper/238/702/429/abstract-texture-hd-4k-wallpaper-preview.jpg") : (userInfo?.coverPicture?.url ? userInfo.coverPicture?.url : "https://p4.wallpaperbetter.com/wallpaper/238/702/429/abstract-texture-hd-4k-wallpaper-preview.jpg")} alt="" />
            {changes &&
            <><input onChange={(e) => setCover(e.target.files[0])} type="file" name="coverphoto" id="coverphoto" hidden />
            <label style={{position:"absolute", top:"0px", right:"0px", cursor:"pointer"}} htmlFor='coverphoto'><EditIcon /></label>
            </>}

            
            <div className="profileImgProfilePlusEditingOption">
                <div style={{position:"relative"}}className="photoplusedit">
                    <img className="profileImgProfile" src={userInfo._id === userProfileInfo._id ? (newMedia?.profileImg !== undefined ? newMedia.profileImg : userProfileInfo?.profilePicture?.url !== undefined ? userProfileInfo.profilePicture?.url : Perfil) : (userInfo?.profilePicture?.url ? userInfo?.profilePicture?.url : Perfil)} />
                    {changes &&
                    <>
                    <input type="file" onChange={(e) => setImg(e.target.files[0])} name="profilephoto" id="profilephoto" hidden />
                    <label style={{position:"absolute", top:"30%", right:"0px", cursor:"pointer", color:"white"}} htmlFor='profilephoto'><EditIcon /></label>
                    </>
                    }
                    

                </div>
                {
                    changes === false && userProfileInfo?._id === userInfo._id && <button className="editProfileButton" onClick={() => setChanges(true)}>Edit Profile</button>
                    
                }
                {
                    changes &&  <button className="editProfileButton confirmChanges" onClick={handleChanges}><ClipLoader 
                    
                    color={"white"}
                    loading={spinner}
                    
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    />{spinner === false && <CheckIcon />}</button> 
                    
                }
                {!followShow && !userProfileInfo?.following?.includes(userInfo._id) && Object.keys(userProfileInfo).length > 0 && userProfileInfo._id !== userInfo._id &&
                    <button onClick={handleFollow} style={{backgroundColor: "rgb(219, 12, 53)", padding:"10px 15px 10px 15px",  cursor:"pointer"}} className="editProfileButton">Follow</button>

                }
                {(followShow ? true : true) && userProfileInfo?.following?.includes(userInfo._id) && Object.keys(userProfileInfo).length > 0 && userProfileInfo._id !== userInfo._id &&
                    <button onClick={handleUnfollow} style={{backgroundColor: "rgb(219, 12, 53)", padding:"10px 15px 10px 15px", cursor:"pointer"}} className="editProfileButton">Unfollow</button>

                }
                
            </div>
            
        </div>
        <div className="profileNamePlusDescriptionPlusOptions">
            <div style={{display:"flex", flexDirection:"column"}}className="nameplususername">
                <div className="nameplusedit" style={{display:"flex", gap:"3px"}}>
                
                {!showTextInput ?
                <p className="profileName">{allInfoObject.name !== undefined ? allInfoObject.name : userInfo.name}</p> : 
                <input style={{color:"white",width:"auto", backgroundColor:"transparent", outline:"none", marginLeft:"20px"}} value={allInfoObject.name !== undefined ? allInfoObject.name : profileNameText} onChange={e => {setProfileNameText(e.target.value)
                setAllInfoObject(prev => ({...prev, name: e.target.value}))}} type="text" />}
                {
                    changes && <p style={{cursor:"pointer"}}onClick={() => {setShowTextInput(!showTextInput)
                    }}><EditIcon /></p>
                }
               
                </div>
                
                <p style={{fontSize:"14px", marginLeft:"20px", color:"gray"}}className="profileUsername">@{userInfo.username}</p>

            </div>
            <div style={{display: "flex", alignItems:"center"}}className="profileDescriptionplusEdit">
            {!showTextInput3 ?
            <p className="profileDescription">{allInfoObject.desc !== undefined ? allInfoObject.desc : userInfo.desc}</p>:
            <input value={allInfoObject.desc !== undefined ? allInfoObject.desc : descText} onChange={e => {setDescText(e.target.value)
            setAllInfoObject(prev => ({...prev, desc: e.target.value}))}}type="text" style={{color:"white",width:"auto", backgroundColor:"transparent", outline:"none", marginLeft:"20px"}} />}
            {changes &&
                <p style={{color:"white", cursor:"pointer"}} onClick={() => {setShowTextInput3(!showTextInput3)
                }}><EditIcon /></p>
                }
            </div>
            
            <div className="living">
                <p><LocationOnIcon /></p>
                
                <p>Currently Living in {showTextInput2 ? null : allInfoObject.from !== undefined ? allInfoObject.from : userInfo.from}</p>
                {showTextInput2 && <input value={allInfoObject.from !== undefined ? allInfoObject.from : profileCountryText} onChange={(e) => {setProfileCountryText(e.target.value)
                setAllInfoObject(prev => ({...prev, from: e.target.value}))}} style={{color:"white",width:"auto", backgroundColor:"transparent", outline:"none", }} type="text" />}
                {changes &&
                <p style={{color:"white", cursor:"pointer"}} onClick={() => {setShowTextInput2(!showTextInput2)
                }}><EditIcon /></p>
                }
                
            </div>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}className="followingfollowers">
                <div style={{display:"flex", gap:"0.4rem"}}className="followingfollowerwithoutmessageicon">
                <p style={{fontWeight:600}}>{userInfo.following?.length - 1} <span style={{fontWeight:300}}>Following</span></p>
                <p style={{fontWeight:600}}>{userInfo.followers?.length} <span style={{fontWeight:300}}>Followers</span></p>
                </div>
                {(followShow ? true : true) && userProfileInfo?.following?.includes(userInfo._id) && Object.keys(userProfileInfo).length > 0 && userProfileInfo._id !== userInfo._id &&
                <p onClick={handleConversation} style={{marginRight:"2.6rem", cursor:"pointer"}}><EmailIcon fontSize='large' /></p>
                }

            </div>
            
            <div style={{}} className="profileOptions">
                <p style={{textDecoration: filterbyLikeOrMyPosts === 1 && "2px solid gray", color:filterbyLikeOrMyPosts === 1 && "white", backgroundColor:filterbyLikeOrMyPosts === 1 && "rgb(54, 51, 51)" }}onClick={() => setFilterByLikeOrMyPosts(1)}className="myPosts">{userProfileInfo._id === userInfo._id ? "My Posts" : "Posts"}</p>
                <p style={{textDecoration: filterbyLikeOrMyPosts === 2 && "2px solid gray", color:filterbyLikeOrMyPosts === 2 && "white", backgroundColor:filterbyLikeOrMyPosts === 2 && "rgb(54, 51, 51)"  }} onClick={() => setFilterByLikeOrMyPosts(2)}className="likedPosts">Liked Posts</p>
                

            </div>
            
        </div>
        
    </div>
    
  )
}

export default ProfileInfo