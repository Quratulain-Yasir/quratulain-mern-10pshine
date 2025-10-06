import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// create a Context object (a shared "data space" for the app)
export const AppContext = createContext();

// This component wraps the app and provides shared state to all children
const AppContextProvider = (props) => {

// backend API baseURL (taken from .env)
const backendUrl = import.meta.env.VITE_BACKEND_URL;

 // Notes data state (will store list of Notes fetched from backend)
const [notes , setNotes] = useState([]);


 // token state (check if token is already in localStorage, else false)
const [token , setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false )

   // user profile data (for storing user details from backend)
   const [userData , setUserData] = useState(null);



    // function to fetch all notes data from backend
// const getNotesData = async () => {
//     try {
//                       // send GET request to backend API
//                       const {data} = await axios.get(backendUrl , "/api/notes/read")
// if(data.success) {
//     setNotes(data.notes);
// } else {
    
//           // show error toast if backend returns failure
//         toast.error(data.message);
// }

//     } catch (error) {
//         // log error in console and show toast
//       console.log(error);
//       toast.error(error.message);
//     }
// }

    // function to load logged-in user profile data
    // const loadUserProfileData = async () => {
    //     try {
    //         const {data} = await axios.get(backendUrl , "/api/user/profiledata" , { headers : { token } })
    //         if(data.success){
    //             setUserData({ ...data.userData })
    //         } else {
    //              toast.error(data.message);
    //         }
    //     } catch (error) { 
    //   toast.error(error.message);
    //     }
    // }

//object that contains all the states and functions
//this object will be shared with all components using AppContext

const value = {
    notes , 
    // getNotesData , 
    token , 
    setToken , 
    backendUrl , 
    userData , 
    setUserData , 
    // loadUserProfileData 
}

//fetch notes list when component first loads
// useEffect(()=>{
//     getNotesData();
// } , [])


 // whenever token changes, decide whether to load user profile or clear it
//  useEffect(()=>{
//     if(token) {
//         loadUserProfileData()
//     } else{
//         setUserData(null)
//     }
//  } , [token])



 // wrap all child components with AppContext provider
    // this makes "value" object accessible to them
  return (
     <AppContext.Provider value={value} >
        {props.children}
     </AppContext.Provider>
  );

}
// export provider so it can wrap the app in main.jsx
export default AppContextProvider;


