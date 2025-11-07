import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../src/pages/Login";       // <-- adjust path if needed
import axios from "axios";
import { AppContext } from "../src/context/AppContext";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router-dom";

// ✅ Mock axios & toast
jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// ✅ Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {

  test("successful login", async () => {
    axios.post.mockResolvedValue({
      data: { success: true, token: "abc123" },
    });

    const setToken = jest.fn();

    render(
      <AppContext.Provider value={{ backendUrl: "http://localhost:5000", token: "", setToken }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AppContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/api/user/login",
        { email: "test@gmail.com", password: "123456" }
      );

      expect(localStorage.getItem("token")).toBe("abc123");
      expect(setToken).toHaveBeenCalledWith("abc123");
      expect(toast.success).toHaveBeenCalledWith("login successful");
    });
  });

  test("failed login", async () => {
    axios.post.mockResolvedValue({
      data: { success: false },
    });

    render(
      <AppContext.Provider value={{ backendUrl: "http://localhost:5000", token: "", setToken: jest.fn() }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please log in to continue");
    });
  });
});
