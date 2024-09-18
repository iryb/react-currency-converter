import React, { useState } from "react";
import { Card, CardContent } from "./ui/Card";
import { Combobox } from "./ui/Combobox";
import { Currency } from "@/types/types";

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
  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <Combobox items={currencies} defaultValue={currencies[0]} />

          <Combobox items={currencies} defaultValue={currencies[1]} />
        </CardContent>
      </Card>
    </section>
  );
};
