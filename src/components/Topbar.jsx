import React, { useContext, useState } from 'react'
import "../styles/topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Perfil from "../assets/perfil.png"
import { Context } from '../context/context';
import { Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserInfoSearch } from '../API/users';
import FoundUsers from './FoundUsers';

const Topbar = ({renderingChat}) => {
  const [logOut, setLogOut] = useState(false)
  const {userProfileInfo, setUserProfileInfo, setSelected} = useContext(Context)
  const [userSearchValue, setUserSearchValue] = useState("")
  const [foundUsers, setFoundUsers] = useState([])
  const handleLogout = () => {
    localStorage.clear()
    setUserProfileInfo({})
    setSelected(0)
    return
  }

  useEffect(() => {
    if(userSearchValue.trim().length >= 3){
      const gettingUserInfoBySearch = async () => {
        const resSearch = await getUserInfoSearch(userSearchValue)
        
        setFoundUsers([...resSearch.data])
      }
      gettingUserInfoBySearch()
    }
  },[userSearchValue])
  useEffect(() => {
    if(userSearchValue.trim().length  < 3){
      setFoundUsers([])
    }
  },[userSearchValue])

  return (
    <div style={{position: renderingChat && "static", overflow:"visible"}}className="topbarContainer">

      <div className="topbarLeft">
        <p className="logo">
          Postium Media
        </p>
      </div>
      <div className="topbarCenter">
        
        <div className="searchinputpackage">
        
        <p className="searchIcon"><SearchIcon /></p>
        <input value={userSearchValue} onChange={e => setUserSearchValue(e.target.value)} placeholder="Search for a person" type="text" className="searchInput" />
        </div>
        {foundUsers.length > 0 &&
        <div className="searchResults">
        {foundUsers?.map((i) => (
          
          (<FoundUsers key={i._id} i={i} />
          
          )
          
        ))}
        </div>
        }
      </div>
      <div className="topbarRight">
        {window.innerWidth > 600 &&
                <p style={{fontSize:"1rem", fontWeight:"600", color:"lightgray"}}>{userProfileInfo.name}</p>

        }
        <div style={{overflow:"visible", position:"relative", padding:"30px 30px 30px 30px", display:"flex", flexDirection:"column", alignItems:"center"}}>
        <img onClick={() => setLogOut(!logOut)} style={{}}src={userProfileInfo.profilePicture?.url || Perfil} alt="" className="profilephoto" />
        {logOut && Object.keys(userProfileInfo).length > 0 &&
        <button onClick={handleLogout} style={{backgroundColor:"black", color:"white", cursor:"pointer", position:"absolute", bottom:3,  textAlign:"center", width:"80%", borderRadius:"5px", border: "1px solid gray"}}>Log Out</button>
        }
        {logOut && Object.keys(userProfileInfo).length === 0 &&
        <Link style={{backgroundColor:"black", color:"white", cursor:"pointer", position:"absolute", bottom:3,  textAlign:"center", width:"80%", borderRadius:"5px", border: "1px solid gray"}}to="/" >
        Log In
        </Link>
        }
        </div>


        
      </div>
    </div>

  )
}

export default Topbar