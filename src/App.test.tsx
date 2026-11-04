import { fireEvent, render, screen } from "@testing-library/react";
import AppComponent from "./App";

function getThemeToggle() {
  return screen.getByRole("button", { name: /switch to (light|dark) mode/i });
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("AppComponent", () => {
  test("renders the docs links", () => {
    render(<AppComponent />);

    expect(screen.getByRole("link", { name: /learn react/i })).toHaveAttribute(
      "href",
      "https://react.dev",
    );
    expect(
      screen.getByRole("link", { name: /vite docs/i }),
    ).toBeInTheDocument();
  });

  test("increments the counter on click", () => {
    render(<AppComponent />);
    const countButton = screen.getByRole("button", { name: /count is/i });

    expect(countButton).toHaveTextContent("Count is: 0");
    fireEvent.click(countButton);
    fireEvent.click(countButton);
    expect(countButton).toHaveTextContent("Count is: 2");
  });
});

describe("theme toggle", () => {
  test("starts in light mode when the document has no dark class", () => {
    render(<AppComponent />);

    expect(getThemeToggle()).toHaveAccessibleName("Switch to dark mode");
  });

  test("starts in dark mode when index.html already applied the dark class", () => {
    document.documentElement.classList.add("dark");
    render(<AppComponent />);

    expect(getThemeToggle()).toHaveAccessibleName("Switch to light mode");
  });

  test("switches to dark mode and persists the choice", () => {
    render(<AppComponent />);

    fireEvent.click(getThemeToggle());

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(getThemeToggle()).toHaveAccessibleName("Switch to light mode");
  });

  test("switches back to light mode and persists the choice", () => {
    render(<AppComponent />);

    fireEvent.click(getThemeToggle());
    fireEvent.click(getThemeToggle());

    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(getThemeToggle()).toHaveAccessibleName("Switch to dark mode");
  });

  test("still switches the theme when localStorage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "SecurityError");
    });
    render(<AppComponent />);

    fireEvent.click(getThemeToggle());

    expect(document.documentElement).toHaveClass("dark");
    expect(getThemeToggle()).toHaveAccessibleName("Switch to light mode");
  });
});
