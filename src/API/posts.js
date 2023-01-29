import axios from "axios" 


axios.defaults.baseURL = "https://socialmedia-back.onrender.com/api";

export const getTimeline = async(userId, valor, limit) => await axios.get(`/posts/timeline/${userId}/?valor=${valor}&limit=${limit}`)

export const CreatePost2 = async(info) => await axios.post(`/posts`, info)

export const CreatePost = async(info) => {
  const form = new FormData()
  for (let key in info) {
      form.append(key, info[key])
  }
  return await axios.post(`/posts/`, form, {
      headers: {
          "Content-Type": "multipart/form-data"
      }
  })
}

export const LikePost = async(postid, myid) => await axios.put(`/posts/${postid}/like`, myid)

export const getMyPosts = async(username) => await axios.get(`/posts/profile/${username}`)

export const getMyLikedPosts = async(userId) => await axios.get(`/posts/profile/${userId}/liked`)

export const getMostLikedFriendPost = async(userId) => await axios.get(`/posts/mostliked/${userId}`)

export const editMyPost = async(postid, info) => await axios.put(`/posts/${postid}`, info)

export const deletePost = async(postid, info) => await axios({
    method: 'delete',
    url: `/posts/${postid}`,
    data: info
    
  });

export const getAPost = async(postId) => await axios.get(`/posts/${postId}`)