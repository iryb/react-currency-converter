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

export const getConversionRate = async ({
  baseCurrency,
  targetCurrency,
}: {
  baseCurrency: Currency;
  targetCurrency: Currency;
}) => {
  return fetch(
    `/v6/${process.env.REACT_APP_CURRENCY_API}/pair/${baseCurrency}/${targetCurrency}`
  )
    .then((res) => res.json())
    .then(
      (result) => {
        return {
          rate: result.conversion_rate,
        };
      },
      (error) => {
        throw new Error(error);
      }
    );
};
