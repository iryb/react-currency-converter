import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import { fetchRates } from "../services/api";
import { getExchangePrice } from "../lib/utils";

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

test("displays correct exchange rate", async () => {
  const rates = {
    selectedRates: {
      USD: 1.2,
      EUR: 0.9,
    },
  };

  (fetchRates as jest.Mock).mockResolvedValue(rates);

  render(<Header />);

  const expectedUsdValue = getExchangePrice(rates.selectedRates.USD);
  const usdValue = await screen.findByText(expectedUsdValue);
  expect(usdValue).toBeInTheDocument();

  const expectedEurValue = getExchangePrice(rates.selectedRates.EUR);
  const eurValue = await screen.findByText(expectedEurValue);
  expect(eurValue).toBeInTheDocument();
});
