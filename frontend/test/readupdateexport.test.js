import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReadSingleNote from "../src/pages/ReadSingleNote";
import { AppContext } from "../src/context/AppContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Mock axios
jest.mock("axios");
// ✅ Mock toast
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() }
}));

jest.mock("../src/components/ExportNote", () => {
  return function MockExportNote() {
    return <div>Export Mock</div>;
  };
});

describe("ReadSingleNote Component", () => {
  const mockNote = {
    _id: "123",
    content: "<p>Hello World</p>"
  };

  const mockContextValue = {
    backendUrl: "http://localhost:5000",
    token: "testtoken",
    getNotesData: jest.fn(),
  };

  test("should fetch and display note content", async () => {
    axios.get.mockResolvedValue({
      data: { success: true, data: mockNote }
    });

    render(
      <AppContext.Provider value={mockContextValue}>
        <MemoryRouter initialEntries={["/read/123"]}>
          <Routes>
            <Route path="/read/:id" element={<ReadSingleNote />} />
          </Routes>
        </MemoryRouter>
      </AppContext.Provider>
    );

    // Loading should appear first
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // ✅ Wait for note content to load
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:5000/api/note/read-one/123",
        { headers: { Authorization: `Bearer testtoken` } }
      );
    });
  });

  test("should update the note when clicking Update Note", async () => {
    axios.get.mockResolvedValue({
      data: { success: true, data: mockNote }
    });

    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <AppContext.Provider value={mockContextValue}>
        <MemoryRouter initialEntries={["/read/123"]}>
          <Routes>
            <Route path="/read/:id" element={<ReadSingleNote />} />
            <Route path="/" element={<p>Home</p>} />
          </Routes>
        </MemoryRouter>
      </AppContext.Provider>
    );

    // Wait for note fetched
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    // ✅ Click "Update Note"
    fireEvent.click(screen.getByRole("button", { name: /update note/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("note is updated");
      expect(mockContextValue.getNotesData).toHaveBeenCalled();
    });
  });
});
