import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Combobox } from "./ui/Combobox";
import { Currency } from "@/types/types";
import { Input } from "./ui/Input";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "./ui/Button";
import { getConversionRate } from "../services/api";
import { roundNumber } from "../lib/utils";
import { CurrenciesList } from "../constants/constants";

export const Converter = () => {
  const [firstCurrency, setFirstCurrency] = useState<Currency>(
    CurrenciesList[0].value
  );
  const [secondCurrency, setSecondCurrency] = useState<Currency>(
    CurrenciesList[1].value
  );
  const [firstAmount, setFirstAmount] = useState<number>(1);
  const [secondAmount, setSecondAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>();
  const [error, setError] = useState(null);

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
    setError(null);
    getConversionRate({
      baseCurrency: firstCurrency,
      targetCurrency: secondCurrency,
    })
      .then((data) => {
        setRate(data.rate);
        setSecondAmount(roundNumber(firstAmount * data.rate));
      })
      .catch((e) => setError(e));
  }, [firstCurrency, secondCurrency]);

  return (
    <section className="py-8 px-4 max-w-xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Currency Converter</CardTitle>
          <CardDescription>
            Fill in currency and amount to convert.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 justify-center items-center">
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <div>
                <div className="mb-4">
                  <Combobox
                    items={CurrenciesList}
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
                    items={CurrenciesList}
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
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
