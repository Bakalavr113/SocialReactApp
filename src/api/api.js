import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "4dba9424-3002-4163-aeae-ea2aae11fd01",
  },
});

export const userAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  getFriends(currentPage = 1, pageSize = 10, friend= true) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}&friend=${true}`)
      .then((response) => response.data);
  },
  followUser(id) {
    return instance.post(`follow/${id}`).then((response) => response.data);
  },
  unfollowUser(userId) {
    return instance
      .delete(`follow/${userId}`)
      .then((response) => response.data);
  },
};

// export const getProfileApi = (userId) => {
//     return   instance.get(`profile/${userId}`).then(response =>  response.data)
// }
export const getAuthApi = {
  getLogin() {
    return instance.get(`auth/me`).then((response) => response.data);
  },
  LoginUser(email, password, rememberMe) {
    return instance.post(`auth/login`, {email, password, rememberMe});
  },
  LogOutUser(){
    return instance.delete(`auth/login`);
    
  }
};
export const ProfileeAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getSatus(userId) {
    return instance.get(`profile/status/${userId}`).then((response) => response.data);
  },
  setStatus(status) {
    return instance.put(`profile/status/`, {status});
  },
  UpdateProfileData(values){
    return instance.put(`profile`, values);
  }

  ,

  setUserAvatar(photo) {
    const formData = new FormData()
    formData.append("image", photo)
    return instance.put(`profile/photo`, formData,{
      headers: {
        'content-type': 'multipart/form-data' // do not forget this 
       }
    }
     
    );
  },
};
