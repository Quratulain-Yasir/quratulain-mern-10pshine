import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RichTextEditor from "../src/pages/RichTextEditor";
import axios from "axios";
import { AppContext } from "../src/context/AppContext";
import { toast } from "react-toastify";
import React from "react";

// ✅ mock axios
jest.mock("axios");

// ✅ mock react-quill (we don't need real editor)
jest.mock("react-quill", () => {
  return function MockQuill(props) {
    return (
      <textarea
        data-testid="quill-editor"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    );
  };
});

// ✅ mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// ✅ mock toast
jest.mock("react-toastify", () => ({
  toast: { error: jest.fn(), success: jest.fn() },
}));

describe("RichTextEditor Component", () => {
  const mockContext = {
    backendUrl: "http://localhost:5000",
    token: "testtoken",
    getNotesData: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render and submit note successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(
      <AppContext.Provider value={mockContext}>
        <RichTextEditor />
      </AppContext.Provider>
    );

    // ✅ Type note in fake Quill
    fireEvent.change(screen.getByTestId("quill-editor"), {
      target: { value: "My new note" },
    });

    // ✅ Click Save Note
    fireEvent.click(screen.getByText(/save note/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockContext.getNotesData).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("should show toast error when API fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("failed"));

    render(
      <AppContext.Provider value={mockContext}>
        <RichTextEditor />
      </AppContext.Provider>
    );

    fireEvent.change(screen.getByTestId("quill-editor"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText(/save note/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("write something to save note");
    });
  });

  test("should navigate back when clicking Back button", () => {
    render(
      <AppContext.Provider value={mockContext}>
        <RichTextEditor />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText(/back to dashboard/i));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
