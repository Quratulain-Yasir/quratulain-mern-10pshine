import React, { useContext,  useState } from 'react' 
import axios from "axios"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SquarePen , Trash } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const RichTextEditor = () => {
    const [content , setContent] = useState("") 
    const { backendUrl , token , getNotesData } = useContext(AppContext)
 
    const navigate = useNavigate()

const saveNote = async () => {
    try {
         await axios.post( backendUrl + "/api/note/create" , {content} , {headers: { Authorization: `Bearer ${token}`}} ).then(()=>{
     getNotesData();  
     navigate("/");
        } )  
    } catch (error) {
              // log error in console and show toast
              console.log(error.message);
              toast.error("write something to save note");
    }
}



  return (
     <section>
<div className='w-full min-h-screen py-6 px-7 bg-zinc-800'>
          <button onClick={() => navigate("/")}
        className="bg-gray-400 hover:bg-gray-300 px-4 py-2 rounded-md mb-8 flex items-center gap-2 transition-all shadow-md shadow-black/30"
      >
        ← Back to Dashboard
      </button>
     <div className="sm:p-10 p-5 mx-4 max-w-2xl sm:mx-auto bg-stone-200 rounded-lg shadow-lg hover:shadow-stone-600 duration-400 ease-in-out  active:shadow-stone-600 duration-400 ease-in-out" >
        <ReactQuill value={content} onChange={setContent} />
            <button className="px-6 py-3 font-semibold text-white bg-green-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 mt-5" onClick={saveNote}>
            Save Note
        </button> 
     </div>
</div>
     </section>
  )
}

export default RichTextEditor