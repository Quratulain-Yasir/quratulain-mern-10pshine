import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RichTextEditor from "./pages/RichTextEditor";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "../src/components/ProtectedRoute.jsx";
import ReadNote from "./pages/ReadSingleNote.jsx";
import ReadSingleNote from "./pages/ReadSingleNote.jsx";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/note/create"
          element={
            <ProtectedRoute>
              <RichTextEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/note/read-one/:id"
          element={
            <ProtectedRoute>
              <ReadSingleNote />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
