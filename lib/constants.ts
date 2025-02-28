export const BANKCODE = "127";
export const BRANCHCODE = Math.floor(Math.random() * 9000 + 1000).toString();
export const BACKACCOUNTLENGTH = 10;
export const VERIFICATION_FEE = 1000; // Amount in cents (KES 10.00)
export const CURRENCY = "KES";
export const REGISTRATION_AMOUNT = 20;

export const ADMINS = ["ericricky200@gmail.com", "wilsonligawa@gmail.com"];

export const PAYMENT_METHODS = [
  {
    id: "mpesa",
    name: "M-Pesa",
    description: "Pay using M-Pesa mobile money",
    icon: "phone",
  },
  {
    id: "card",
    name: "Card",
    description: "Pay using credit or debit card",
    icon: "credit-card",
  },
] as const;
