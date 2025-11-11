import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", { name: /learn react/i });
  expect(linkElement).toBeInTheDocument();
});

test("does not render an learn angular link", () => {
  render(<App />);
  const linkElement = screen.queryByRole("link", { name: /learn angular/i });
  expect(linkElement).not.toBeInTheDocument();
});
