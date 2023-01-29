import React from 'react'
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Context } from '../context/context'


export const HomeMiddleware = ({children}) => {
    const {userProfileInfo, setUserProfileInfo} = useContext(Context)
    if(Object.keys(userProfileInfo).length === 0){
        return <Navigate to="/login" />
        
    }else return children
}

export default HomeMiddleware