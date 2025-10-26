import { FilePlus, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 border-b bg-gray-400 sticky top-0 w-full z-10 pl-10">
      {/* pl-20 adds left padding so navbar doesn’t overlap with sidebar */}
      
      <h1 className="sm:text-4xl text-3xl font-bold app-name">My Notes</h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/note/create')}
          className="bg-blue-700 text-white sm:px-4 px-2 flex py-2 rounded hover:bg-blue-600 gap-2 hover:scale-105 active:scale-105 transition-all duration-300 ease-in-out cta-btn bounce"
        >
          <FilePlus /> Create Note
        </button>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white sm:px-4 px-2 flex py-2 rounded gap-2 hover:scale-105 transition-all duration-300 ease-in-out shadow-md shadow-black/30"
        >
          <LogOut /> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
