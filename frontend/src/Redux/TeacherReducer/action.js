
import axios from "axios"
import { ADD_PRODUCT_SUCCESS, ADD_User_SUCCESS, ADD_Video_SUCCESS, GET_PRODUCT_SUCCESS, GET_User_SUCCESS, GET_Video_SUCCESS, PATCH_PRODUCT_SUCCESS, PATCH_User_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST } from "./actionType"


const token = JSON.parse(localStorage.getItem('user'))?.token || "";



export const changeRole = (data,userId) => (dispatch) => {
    dispatch({ type: PRODUCT_REQUEST });
    fetch(`http://localhost:7890/users/Teachme/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      // GET requests don't have a body, so no need to stringify data
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
};

export const getCourse = (data,userId) => (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });
  fetch(`http://localhost:7890/courses/a/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    // GET requests don't have a body, so no need to stringify data
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((e) => console.log(e));
};

export const addProduct=(data)=>(dispatch)=>{
  dispatch({type:PRODUCT_REQUEST})
  fetch("http://localhost:7890/courses/add",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(data)
  }).then(res=>res.json()).then((res)=>{console.log(res);
      dispatch({type:ADD_PRODUCT_SUCCESS,payload:res.data})
  }).catch(e=>console.log(e))
}

export const addUser=(data)=>(dispatch)=>{
  dispatch({type:PRODUCT_REQUEST})
  fetch("http://localhost:7890/users/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(data)
  }).then(res=>res.json()).then((res)=>{console.log("userData",res);
      dispatch({type:ADD_User_SUCCESS,payload:res.data})
  }).catch(e=>console.log(e))
}
export const addVideo=(data,courseId)=>(dispatch)=>{
  dispatch({type:PRODUCT_REQUEST})
  delete data.courseId
  fetch(`http://localhost:7890/videos/add/${courseId}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(data)
  }).then(res=>res.json()).then((res)=>{console.log("userData",res);
      dispatch({type:ADD_Video_SUCCESS,payload:res.data})
  }).catch(e=>console.log(e))
}


export const getProduct=(page,limit,search,order)=>(dispatch)=>{
    dispatch({type:PRODUCT_REQUEST})
    axios.get(`http://localhost:7890/courses?page=${page}&limit=${limit}&q=${search}&sortBy=price&sortOrder=${order}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{console.log("getProduct",res);
    dispatch({type:GET_PRODUCT_SUCCESS,payload:res.data.course})
    }).catch(e=>dispatch({type:PRODUCT_FAILURE}))
   
}
export const getUser=(page,limit,search,order)=>(dispatch)=>{
    dispatch({type:PRODUCT_REQUEST})
    axios.get(`http://localhost:7890/users?page=${page}&limit=${limit}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{console.log("getUsers",res);
    dispatch({type:GET_User_SUCCESS,payload:res.data.users})
    }).catch(e=>dispatch({type:PRODUCT_FAILURE}))
   
}
export const getvideo=(page,limit,user)=>(dispatch)=>{
    dispatch({type:PRODUCT_REQUEST})
    axios.get(`http://localhost:7890/videos?page=${page}&limit=${limit}&user=${user}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{console.log("getVideos",res.data);
    dispatch({type:GET_Video_SUCCESS,payload:res.data})
    }).catch(e=>dispatch({type:PRODUCT_FAILURE}))
   
}

export const patchProduct=(id,data)=>(dispatch)=>{
  dispatch({type:PRODUCT_REQUEST})
  fetch(`http://localhost:7890/courses/update/${id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(data)
  }).then(res=>res.json()).then((res)=>{console.log("patch data is",res.course);
      dispatch({type:PATCH_PRODUCT_SUCCESS,payload:res.course})
  }).catch(e=>console.log(e))
}
export const patchUser=(id,data)=>(dispatch)=>{
  dispatch({type:PRODUCT_REQUEST})
  fetch(`http://localhost:7890/users/update/${id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(data)
  }).then(res=>res.json()).then((res)=>{console.log("patch data is",res);
      dispatch({type:PATCH_User_SUCCESS,payload:res})
  }).catch(e=>console.log(e))
}


export const deleteProduct=(id)=>(dispatch)=>{
    dispatch({type:PRODUCT_REQUEST});
    axios.delete(`http://localhost:7890/courses/delete/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{console.log(res,"deleted");
    dispatch(getProduct(4,3))}).catch(e=>dispatch({type:PRODUCT_FAILURE}))
}
export const deleteUsers=(id)=>(dispatch)=>{
    dispatch({type:PRODUCT_REQUEST});
    axios.delete(`http://localhost:7890/users/delete/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{console.log(res,"deleted");
    dispatch(getUser(4,3))}).catch(e=>dispatch({type:PRODUCT_FAILURE}))
}


export default function convertDateFormat(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${day}/${month}/${year}`;

  if(isNaN(day)){
    return 'No Date Found'
  }

  return formattedDate;
}