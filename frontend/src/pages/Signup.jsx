import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { AppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom"




const Signup = () => { 
    const [name , setName] = useState( )
    const [email , setEmail] = useState( )
    const [password , setPassword] = useState( ) 

   const { backendUrl , token , setToken } = useContext(AppContext)
   const navigate = useNavigate()


    const HandleDefault = async (e) => {
        e.preventDefault();

    
    const {data} = await axios.post( backendUrl + `/api/user/register` , {name , email , password})
    console.log(data)
    if(data.success){
        localStorage.setItem("token" , data.token);
        setToken(data.token)
    } else {
        toast.error(data.message)
    }
  }



useEffect(()=>{
if(token){
    navigate('/')
} 
} , [token])

  return (
    <section>
            <form onSubmit={HandleDefault} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border border-blue-700 rounded-xl text-zinc-600 text-sm shadow-lg">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <p>
          Please Sign Up to create unlimited Notes
        </p>

       
          <div>
            <label htmlFor="name">Name</label>{" "}
            <input className="border border-blue-700 rounded w-full p-2 mt-1"
            id="name"
              type="text"
              name=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        
         
        <div>
          <label htmlFor="email">Email</label>
          <input className="border border-blue-700 rounded w-full p-2 mt-1"
          id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input className="border border-blue-700 rounded w-full p-2 mt-1"
          id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="bg-blue-700 text-orange-50 w-full py-2 rounded-md text-base hover:scale-105 active:scale-105 transition-all duration-300 ease-in-out" type="submit">
           Create Account 
        </button>
        
          <p>
            Already have an account?
            <span className="text-blue-700 underline cursor-pointer" onClick={()=>navigate("/login")}>login</span>
          </p>
        
      </div>
    </form>
    </section>
  )
}
     

export default Signup