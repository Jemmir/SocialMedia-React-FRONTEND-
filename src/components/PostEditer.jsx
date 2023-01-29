import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/context'
import Posts from './Posts'
import "../styles/post.css"
import ReactPlayer from 'react-player'
import CancelIcon from '@mui/icons-material/Cancel';
import { editMyPost } from '../API/posts'


const PostEditer = () => {
    const {setToaster, postEditInfo, setPostEditInfo, userProfileInfo, setUserProfileInfo} = useContext(Context)
    const [descToBeEdit, setDescToBeEdit] = useState(postEditInfo.desc)

    

    const handleEdit = async() => {

        try {
            const editRes = await editMyPost(postEditInfo._id, {userId: userProfileInfo._id, desc:descToBeEdit})
            console.log(editRes)
            
            return setPostEditInfo({}), setToaster(true)
        } catch (error) {
          
        }
        
    }

  if(postEditInfo.desc !== undefined)return (
    <div className="postEditerContainer">
       
        <p onClick={() => setPostEditInfo({})} className="postEditCloseButton"><CancelIcon fontSize='large' /></p>
        <div className="postEditerWrapper">
            <textarea className="descEditTextarea"value={descToBeEdit} onChange={(e) => setDescToBeEdit(e.target.value)}type="text" />
            {(postEditInfo?.video ? true : postEditInfo.img ? true : false) &&
                <div className="postEditerVideoPlusImg">
                {postEditInfo.img !== undefined && postEditInfo.img !== "" &&
                <img style={{width: postEditInfo.video !== undefined && postEditInfo.video !== "" ? "50%" : "100%"}}className="imgOnEdit"src={postEditInfo.img} alt="" />
                }
                {postEditInfo.video !== undefined && postEditInfo.video !== "" &&
                <div  style={{width: postEditInfo.img !== undefined && postEditInfo.img !== "" ? "50%" : "100%"}} className="videoOnEdit">
                <ReactPlayer url={postEditInfo?.video && postEditInfo?.video} height={"100%"} width={"100%"}/>
                </div>
                }
                </div>
            }
            <button disabled={descToBeEdit === postEditInfo.desc ? true : descToBeEdit.length >= 500 ? true : false} onClick={handleEdit}className="editButton">Edit {descToBeEdit.length >= 500 && "(Max Reached)"}</button>
          
        </div>
    </div>
  )
}

export default PostEditer