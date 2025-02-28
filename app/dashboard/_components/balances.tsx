import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import Image from "next/image";

const currencies = [
  {
    name: "United States Dollar",
    code: "USD",
    symbol: "$",
    flag: "/placeholder.svg",
    amount: "0.00",
  },
  {
    name: "British Pound",
    code: "GBP",
    symbol: "£",
    flag: "/placeholder.svg",
    amount: "0.00",
  },
  {
    name: "Euro",
    code: "EUR",
    symbol: "€",
    flag: "/placeholder.svg",
    amount: "0.00",
  },
  {
    name: "Kenya Shilling",
    code: "KSH",
    flag: "/placeholder.svg",
    amount: "0.00",
  },
];

export function Balances() {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">Your Balances</h2>
        <Button variant="ghost" size="icon">
          <InfoIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currencies.map((currency) => (
          <div
            key={currency.code}
            className="p-4 border rounded-lg bg-white space-y-3"
          >
            <div className="flex items-center gap-2">
              <Image
                src={currency.flag}
                alt={currency.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm text-gray-600">{currency.name}</span>
            </div>
            <div className="text-2xl font-semibold">
              {currency.symbol}
              {currency.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
