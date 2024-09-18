import { useEffect, useState } from "react";
import { fetchRates } from "../services/api";

export const Header = () => {
  const [eur, setEur] = useState<number>();
  const [usd, setUsd] = useState<number>();
  const [error, setError] = useState();

  useEffect(() => {
    fetchRates({ baseCurrency: "UAH", currencies: ["EUR", "USD"] })
      .then((data) => {
        setUsd(+(1 / data.selectedRates.USD).toFixed(2));
        setEur(+(1 / data.selectedRates.EUR).toFixed(2));
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
        {usd && (
          <div>
            <span className="font-semibold pr-2">USD</span>
            <span>{usd}</span>
          </div>
        )}
        {eur && (
          <div>
            <span className="font-semibold pr-2">EUR</span>
            <span>{eur}</span>
          </div>
        )}
      </div>
    </header>
  );
};
