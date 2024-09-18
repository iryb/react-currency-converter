import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Combobox } from "./ui/Combobox";
import { Currency } from "@/types/types";
import { Input } from "./ui/Input";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "./ui/Button";
import { getConversionRate } from "../services/api";
import { roundNumber } from "../lib/utils";

const currencies: {
  value: Currency;
  label: string;
}[] = [
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "EUR",
    label: "EUR",
  },
  {
    value: "UAH",
    label: "UAH",
  },
];

export const Converter = () => {
  const [firstCurrency, setFirstCurrency] = useState<Currency>(
    currencies[0].value
  );
  const [secondCurrency, setSecondCurrency] = useState<Currency>(
    currencies[1].value
  );
  const [firstAmount, setFirstAmount] = useState<number>(0.1);
  const [secondAmount, setSecondAmount] = useState<number>(0.1);
  const [rate, setRate] = useState<number>();

  const getRate = useMemo(
    () =>
      getConversionRate({
        baseCurrency: firstCurrency,
        targetCurrency: secondCurrency,
      }),
    [firstCurrency, secondCurrency]
  );

  const handleValuesSwitch = () => {
    const firstValue = firstCurrency;
    setFirstCurrency(secondCurrency);
    setSecondCurrency(firstValue);
  };

  const handleFirstAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstAmount(+e.target.value);
    if (rate) {
      setSecondAmount(roundNumber(+e.target.value * rate));
    }
  };

  const handleSecondAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondAmount(+e.target.value);
    if (rate) {
      setFirstAmount(roundNumber(+e.target.value / rate));
    }
  };

  useEffect(() => {
    getRate.then((data) => {
      setRate(data.rate);
      setSecondAmount(roundNumber(firstAmount * data.rate));
    });
  }, [firstCurrency, secondCurrency]);

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      <Card>
        <CardContent className="pt-6 flex gap-4 justify-center items-center">
          <div>
            <div className="mb-4">
              <Combobox
                items={currencies}
                selectedValue={firstCurrency}
                setSelectedValue={(value: string) =>
                  setFirstCurrency(value as Currency)
                }
              />
            </div>
            <Input
              type="number"
              min={0}
              value={firstAmount}
              onChange={handleFirstAmountChange}
            />
          </div>
          <Button variant={"ghost"} onClick={handleValuesSwitch}>
            <ArrowRightLeft />
          </Button>
          <div>
            <div className="mb-4">
              <Combobox
                items={currencies}
                selectedValue={secondCurrency}
                setSelectedValue={(value: string) =>
                  setSecondCurrency(value as Currency)
                }
              />
            </div>
            <Input
              type="number"
              min={0}
              value={secondAmount}
              onChange={handleSecondAmountChange}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
