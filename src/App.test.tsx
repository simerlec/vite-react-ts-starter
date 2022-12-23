import * as React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { expect, test } from "vitest";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("does not render an learn angular link", () => {
  const { queryByText } = render(<App />);
  const linkElement = queryByText(/learn angular/i);
  expect(linkElement).not.toBeInTheDocument();
});
