import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../src/pages/Dashboard";
import { AppContext } from "../src/context/AppContext";
import React from "react";
import { useNavigate } from "react-router-dom";

// ✅ Mock Sidebar & Navbar (avoid rendering full UI)
jest.mock("../src/components/Sidebar.jsx", () => () => <div>Sidebar</div>);
jest.mock("../src/components/Navbar.jsx", () => () => <div>Navbar</div>);
jest.mock("../src/components/EmptyState.jsx", () => () => <div>No Notes</div>);

// ✅ Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Dashboard Component", () => {
  const mockDelete = jest.fn();

  const renderDashboard = (notes) =>
    render(
      <AppContext.Provider
        value={{
          notes,
          deleteNote: mockDelete,
        }}
      >
        <Dashboard />
      </AppContext.Provider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows EmptyState when no notes", () => {
    renderDashboard([]);

    expect(screen.getByText(/no notes/i)).toBeInTheDocument();
  });

  test("renders note cards when notes exist", () => {
    const mockNotes = [
      { _id: "1", content: "First Note" },
      { _id: "2", content: "Second Note" },
    ];

    renderDashboard(mockNotes);

    expect(screen.getByText(/first note/i)).toBeInTheDocument();
    expect(screen.getByText(/second note/i)).toBeInTheDocument();
  });

  test("clicking note navigates to note details page", () => {
    const mockNotes = [{ _id: "1", content: "Test Note" }];

    renderDashboard(mockNotes);

    const noteDiv = screen.getByText(/test note/i);
    fireEvent.click(noteDiv);

    expect(mockNavigate).toHaveBeenCalledWith("/note/read-one/1");
  });

  test("clicking delete icon calls deleteNote", () => {
    const mockNotes = [{ _id: "1", content: "Delete me" }];

    renderDashboard(mockNotes);

const trashIcon = screen.getByTestId("delete-icon");
fireEvent.click(trashIcon);
expect(mockDelete).toHaveBeenCalledWith("1");

  });
});
