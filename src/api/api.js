import *  as axios from "axios"


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers:{
        "API-KEY": "69c734ce-3a54-41ee-9ff9-b678093c29de"
    }

})

export const userAPI = {
    getUsers(currentPage = 1, pageSize =10){ 
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    followUser(id){
        return instance.post(`follow/${id}`).then(response => response.data)
     },
    unfollowUser(userId){
   return instance.delete(`follow/${userId}`).then(response => response.data)
}}

export const getProfileApi = (userId) => {
    return   instance.get(`profile/${userId}`).then(response =>  response.data)
}
export const getAuthApi =  {
   getLogin(){
       return instance.get(`auth/me`).then(response => response.data)}
        
    
}
