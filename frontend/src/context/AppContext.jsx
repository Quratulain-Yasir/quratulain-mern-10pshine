import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import { backendUrl } from "../utils/env";

// create a Context object (a shared "data space" for the app)
export const AppContext = createContext();

// This component wraps the app and provides shared state to all children
const AppContextProvider = (props) => {
 

  // Notes data state (will store list of Notes fetched from backend)
  const [notes, setNotes] = useState([]);
  // token state (check if token is already in localStorage, else false)
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  
  const [user, setUser] = useState(null);

  // user profile data (for storing user details from backend)
  const [userData, setUserData] = useState(null);
 

  // function to fetch all notes data from backend
  const getNotesData = async () => {
    try {
      // send GET request to backend API
      const { data } = await axios.get(backendUrl + "/api/note/read", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setNotes(data.data); 
      } else {
        // show error toast if backend returns failure
        toast.error(data.message);
      }
    } catch (error) {
      // log error in console and show toast
      console.log(error + "disscodanncer");
      toast.error(error.message);
    }
  };



// function to delete note
const deleteNote = async (noteId) => {
  try { 
    await axios.post( backendUrl + `/api/note/delete/${noteId}`, {}, {
  headers: { Authorization: `Bearer ${token}` },
    });
        // ✅ remove note instantly from UI
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    toast.success("Note deleted successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete note");
  }
};




  // function to load logged-in user profile data
      const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/user/user-profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          setUser(data.userData); // ✅ NOTE: use 'userData' (based on your backend JSON)
        }
      } catch (error) {
        console.log(error);
      }
    };

  //object that contains all the states and functions
  //this object will be shared with all components using AppContext

  const value = {
    notes, 
    getNotesData, 
    deleteNote , 
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    user, 
    setUser , 
    fetchProfile
  };

  //fetch notes list when component first loads
useEffect(() => {
  if (token && window.location.pathname === "/") {
    getNotesData();
  }
}, [token]);



  // whenever token changes, decide whether to load user profile or clear it
   useEffect(()=>{
      if(token) {
          fetchProfile()
      } else{
          setUser(null)
      }
   } , [token])

  // wrap all child components with AppContext provider
  // this makes "value" object accessible to them
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
// export provider so it can wrap the app in main.jsx
export default AppContextProvider;
