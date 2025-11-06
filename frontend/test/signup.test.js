import React from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Signup from "../src/pages/Signup";
import { AppContext } from "../src/context/AppContext";

// ✅ mock axios
jest.mock("axios");

// ✅ mock toast
jest.mock("react-toastify", () => ({
  toast: { error: jest.fn() }
}));

const mockSetToken = jest.fn();
const mockNavigate = jest.fn();

// ✅ mock react-router useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderSignup = () =>
  render(
    <BrowserRouter>
      <AppContext.Provider
        value={{
          backendUrl: "http://localhost:5000",
          token: "",
          setToken: mockSetToken,
        }}
      >
        <Signup />
      </AppContext.Provider>
    </BrowserRouter>
  );

describe("Signup Component", () => {
  test("renders input fields and submit button", () => {
    renderSignup();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  test("successful signup stores token and calls setToken", async () => {
    axios.post.mockResolvedValueOnce({
      data: { success: true, token: "abc123" },
    });

    renderSignup();

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/api/user/register",
        { name: "Test User", email: "user@test.com", password: "123456" }
      );

      expect(mockSetToken).toHaveBeenCalledWith("abc123");
    });
  });

  test("shows toast on failed signup", async () => {
    axios.post.mockResolvedValueOnce({
      data: { success: false, message: "Email already exists" },
    });

    const { toast } = require("react-toastify");

    renderSignup();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "already@test.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Email already exists");
    });
  });
});
