import { useState } from "react";
import { Menu, X, LayoutDashboard, PlusSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      }  fixed top-0 h-screen bg-gray-500 text-zinc-900 flex flex-col p-5 transition-all duration-300 z-20 overflow-y-auto shadow-[-4px_0_10px_rgba(0,0,0,0.8)]`}
    >
      <div className="flex items-center justify-between mb-9">
        <h1
          className={`text-2xl font-bold transition-all duration-300 ${
            !isOpen && "hidden"
          }`}
        >
          Note-Nest
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-zinc-400 rounded p-1">
          {isOpen ? <X size={24} /> : <Menu size={24} /> }
        </button>
      </div>

      <nav className="flex flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-3 hover:bg-zinc-400 rounded p-1"
        >
          <LayoutDashboard />
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link
          to="/note/create"
          className="flex items-center gap-3 hover:bg-zinc-400 rounded p-1"
        >
          <PlusSquare />
          {isOpen && <span>Create Note</span>}
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-3 hover:bg-zinc-400 rounded p-1"
        >
          <User />
          {isOpen && <span>Profile</span>}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
