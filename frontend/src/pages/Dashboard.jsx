import React from 'react';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const Dashboard = () => {
  const { notes, deleteNote } = useContext(AppContext);
   const navigate = useNavigate()
  return (
    <div className="flex min-h-screen bg-gray-300">
      
        <Sidebar />
      <main className="flex-1 pl-20">
        <Navbar />
        
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
          {notes.length === 0 ? (
             <EmptyState />
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all hover:scale-105 duration-300 ease-in-out "
              >
                <div
                  className="text-gray-700 text-sm cursor-pointer"
                  dangerouslySetInnerHTML={{
                    __html:
                      note.content.length > 300
                        ? note.content.substring(0, 300) + "..."
                        : note.content,
                  }}
                  onClick={()=>navigate(`/note/read-one/${note._id}`)}
                ></div>
                <div className="flex justify-end mt-3 gap-3">
                  <Trash
                   data-testid="delete-icon"
                    onClick={() => deleteNote(note._id)}
                    className="text-red-600 hover:scale-105 active:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
