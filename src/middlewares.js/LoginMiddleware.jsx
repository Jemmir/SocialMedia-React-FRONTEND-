import React from 'react'
import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { Context } from '../context/context'


export const LoginMiddleware = ({children}) => {
    const {userProfileInfo, setUserProfileInfo} = useContext(Context)
    if(Object.keys(userProfileInfo).length){
        return <Navigate to="/" />
    }else return children
}

export default LoginMiddleware