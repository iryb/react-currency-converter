import { Currency } from "../types/types";

export const fetchRates = async ({
  baseCurrency,
  currencies,
}: {
  baseCurrency: Currency;
  currencies: Currency[];
}) => {
  return fetch(`/v6/4f4d9613275c27b11c5ca347/latest/${baseCurrency}`)
    .then((res) => res.json())
    .then(
      (result) => {
        const rates = result.conversion_rates;
        let selectedRates: { [key: string]: number } = {};

        currencies.forEach((cur) => {
          selectedRates[cur] = rates[cur];
        });

        return {
          selectedRates,
        };
      },
      (error) => {
        throw new Error(error);
      }
    );
};
