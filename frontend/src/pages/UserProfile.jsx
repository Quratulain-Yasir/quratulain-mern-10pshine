import { useContext } from "react";

import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const UserProfile = () => {
  const [edit, setEdit] = useState(false); 
  const navigate = useNavigate();

  const { backendUrl, fetchProfile , token, user, setUser } =
    useContext(AppContext);

  //  function to make api call
  const updateUserProfileData = async () => {
    try {
    
      //  update api call
      const { data } = await axios.post(
        backendUrl + "/api/user/update-user-profile",
        {
            name: user.name,
            email:user.email
        },
       {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
},
        
      );
      if (data.success) {
        toast.success(data.message);
        // refetch stdData
        await fetchProfile();
        setEdit(false); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-500 text-white p-8">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md mb-8 flex items-center gap-2 transition-all shadow-md shadow-black/30"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-3xl mx-auto bg-gray-400 rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center border-b border-gray-700 pb-6 mb-6">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-5xl font-bold">
            <User size={64} />
          </div>

          {/* ✅ DYNAMIC NAME */}
          <h2 className="text-3xl font-semibold mt-4">{user.name}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-gray-700 p-6 rounded-xl">
            <div className="inline-flex gap-17">
              <h3 className="text-lg font-semibold mb-3">
                Personal Information
              </h3>
              {
                edit ? (
                     <button onClick={updateUserProfileData} className="bg-red-600 hover:bg-red-500 px-2tin py-1 rounded-md transition-all shadow-md shadow-black/30 text-sm">
                Save
              </button>
                ) :
                 <button onClick={() => setEdit(true)} className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md transition-all shadow-md shadow-black/30 text-sm">
                Edit
              </button>
              }
             
            </div>
            <div className="text-gray-300 space-y-2">
                {edit ? (  <input
            type="text"
            className="bg-gray-50 text-xl font-medium max-w-60 mt-4"
            value={user.name || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />) :
                ( <p>
                <span className="text-gray-400">Name:</span> {user.name}
              </p>)
            }
             {edit ? (  <input
            type="text"
            className="bg-gray-50 text-xl font-medium max-w-60 mt-4"
            value={user.email || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />) :
                (  <p>
                <span className="text-gray-400">Email:</span> {user.email}
              </p>)
            }
            </div>
          </div>

          {/* Security */}
          <div className="bg-gray-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">Security</h3>
            <div className="text-gray-300 space-y-2">
              <p className="text-purple-400 font-semibold">
                🔒 Password Protected
              </p>
              <p>Your account is secured with a strong password.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
