import { CurrenciesListItem, Currency } from "@/types/types";

export const API = "https://v6.exchangerate-api.com";
export const HeaderBaseCurrency: Currency = "UAH";
export const HeaderCurrencies: Currency[] = ["EUR", "USD"];
export const CurrenciesList: CurrenciesListItem[] = [
  {
    value: "USD",
    label: "USD",
    icon: "http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg",
  },
  {
    value: "EUR",
    label: "EUR",
    icon: "https://purecatamphetamine.github.io/country-flag-icons/3x2/EU.svg",
  },
  {
    value: "UAH",
    label: "UAH",
    icon: "https://purecatamphetamine.github.io/country-flag-icons/3x2/UA.svg",
  },
];
