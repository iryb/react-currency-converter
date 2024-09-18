import { Currency } from "../types/types";

export const fetchRates = async ({
  baseCurrency,
  currencies,
}: {
  baseCurrency: Currency;
  currencies: Currency[];
}) => {
  return fetch(
    `/v6/${process.env.REACT_APP_CURRENCY_API}/latest/${baseCurrency}`
  )
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
