import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Converter } from "./Converter";

beforeAll(() => {
  // Mocking ResizeObserver
  global.ResizeObserver = class {
    constructor(_callback: any) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // Mocking scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = function () {};
});

test("displays 2 select elements", async () => {
  render(<Converter />);
  const selectElements = screen.getAllByRole("combobox");
  expect(selectElements).toHaveLength(2);
});

test("displays 2 input elements", async () => {
  render(<Converter />);
  const inputElements = screen.getAllByRole("spinbutton");
  expect(inputElements).toHaveLength(2);
});

test("each select has 3+ options", async () => {
  render(<Converter />);
  const selectElements = screen.getAllByRole("combobox");
  for (const select of selectElements) {
    // Click the select to trigger option rendering
    fireEvent.click(select);

    const options = await screen.findAllByRole("option");
    expect(options.length).toBeGreaterThanOrEqual(3);
  }
});

test("each select has USD, EUR, UAH options", async () => {
  render(<Converter />);
  const selectElements = screen.getAllByRole("combobox");

  for (const select of selectElements) {
    fireEvent.click(select);

    const options = await screen.findAllByRole("option");
    for (const option of options) {
      expect(option).toHaveTextContent(/^USD|EUR|UAH$/);
    }
  }
});
