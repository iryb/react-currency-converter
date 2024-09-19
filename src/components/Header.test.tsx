import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import { fetchRates } from "../services/api";

jest.mock("../services/api", () => ({
  fetchRates: jest.fn(),
}));

test("loads and displays exchange rate", async () => {
  (fetchRates as jest.Mock).mockResolvedValue({
    selectedRates: {
      USD: 1.2, // Mocked value for USD
      EUR: 0.9, // Mocked value for EUR
    },
  });

  render(<Header />);

  const usdLabel = await screen.findByText("USD");
  expect(usdLabel).toBeInTheDocument();
  const eurLabel = await screen.findByText("EUR");
  expect(eurLabel).toBeInTheDocument();
});
