import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders todo app header", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { name: /to-do/i });
  expect(heading).toBeInTheDocument();
});
