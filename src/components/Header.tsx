import { useEffect, useState } from "react";
import { fetchRates } from "../services/api";
import { HeaderBaseCurrency, HeaderCurrencies } from "../constants/constants";
import { getExchangePrice } from "../lib/utils";

type HeaderCurrency = {
  name: string;
  value: number;
};

export const Header = () => {
  const [error, setError] = useState(null);

  const [currencies, setCurrencies] = useState<HeaderCurrency[] | null>(null);

  useEffect(() => {
    setError(null);
    fetchRates({
      baseCurrency: HeaderBaseCurrency,
      currencies: HeaderCurrencies,
    })
      .then((data) => {
        const transformedCurrencies: HeaderCurrency[] = Object.entries(
          data.selectedRates
        ).map(([name, value]) => ({
          name,
          value: getExchangePrice(value),
        }));

        setCurrencies(transformedCurrencies);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <header className="p-4 border-b bg-slate-100 flex gap-2 justify-between">
      <div className="uppercase font-extrabold text-left">
        <span className="block tracking-widest leading-none">Currency</span>
        <span className="block tracking-wide leading-none">Converter</span>
      </div>
      <div className="flex gap-4">
        {error}
        {currencies &&
          currencies.length > 0 &&
          currencies.map(({ name, value }) => (
            <div key={name}>
              <span className="font-semibold pr-2">{name}</span>
              <span>{value}</span>
            </div>
          ))}
      </div>
    </header>
  );
};
