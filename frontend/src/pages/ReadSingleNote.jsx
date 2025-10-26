import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { SquarePen, Trash } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ReadSingleNote = () => {
  const [content, setContent] = useState("");
  
  const { backendUrl, token , getNotesData } = useContext(AppContext);
  const { id } = useParams();
 const navigate = useNavigate()
  const [note, setNote] = useState([]);
  // function to fetch one note data from backend
  const getNoteData = async () => {
    try {
      // send GET request to backend API
      const { data } = await axios.get(
        backendUrl + `/api/note/read-one/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        setNote(data.data.content);
        setContent(data.data.content);
      } else {
        // show error toast if backend returns failure
        toast.error(data.message);
      }
    } catch (error) {
      // log error in console and show toast
      console.log(error);
    }
  };

  const updateNote = async () => {
    axios
      .post(
        backendUrl + `/api/note/update/${id}`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("note is updated");
        getNotesData();  
        navigate("/");
      });
  };

  //fetch note when component first loads
  useEffect(() => {
    if (id) getNoteData();
  }, [id]);

  if (!note) return <p>Loading...</p>;

  return (
    <section>
      <div className="w-full min-h-screen py-6 bg-zinc-800">
        <div className="sm:p-10 p-5 mx-4 max-w-2xl sm:mx-auto bg-stone-200 rounded-lg shadow-lg hover:shadow-stone-600 duration-400 ease-in-out  active:shadow-stone-600 duration-400 ease-in-out">
          <ReactQuill value={content} onChange={setContent} />
          <button
            className="inline-flex gap-2 mt-5 px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={updateNote}
          >
            <SquarePen
              onClick={updateNote}
              className="text-blue-700 cursor-pointer"
            />
            Update Note
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReadSingleNote;
