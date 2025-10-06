import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

 
const Dashboard = () => {
  const { setToken , token } = useContext(AppContext)
  const navigate = useNavigate()
const logout = () =>{
  setToken(false)
  localStorage.removeItem("token")
  navigate("/login");
}
  return (
<div>
  {token ? 
   <div onClick={logout} className="text-red-800 cursor-pointer">hello dashboard</div>   : <div>login first</div>
}
</div>
  )
};

export default Dashboard;
