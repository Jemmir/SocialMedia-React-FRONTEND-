import React from 'react'
import "../styles/foundusers.css"
import Perfil from "../assets/perfil.png"
import { Link } from 'react-router-dom'
const FoundUsers = ({i}) => {
    
  return (
    <Link className="profileImagePlusNameFoundUser" to={"/" + i.username}>
    
        <img className="profilephoto" src={i.profilePicture?.url || Perfil} />
        <p>{i.name}</p>
    
    </Link>
  )
}

export default FoundUsers