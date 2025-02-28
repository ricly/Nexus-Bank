import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrencyUSD(amount?: number): string {
  if (amount === undefined) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatAccountNumber(
  accountNumber: string,
  groupSize: number = 4
): string {
  return (
    accountNumber.match(new RegExp(`.{1,${groupSize}}`, "g"))?.join(" ") ||
    accountNumber
  );
}

/**
 * Generates a unique account number with a checksum.
 * @param bankCode - A unique code identifying the bank (e.g., 3 digits).
 * @param branchCode - A code identifying the branch (e.g., 4 digits).
 * @param length - Total length of the account number (default is 12).
 * @returns A string representing the generated account number.
 */
export function generateAccountNumber(
  bankCode: string,
  branchCode: string,
  length: number = 12
): string {
  if (bankCode.length + branchCode.length >= length) {
    throw new Error(
      "Bank code and branch code lengths exceed the total account number length."
    );
  }

  const randomDigitsLength = length - bankCode.length - branchCode.length - 1; // Reserve 1 digit for checksum
  const randomDigits = Array.from({ length: randomDigitsLength }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const baseAccountNumber = `${bankCode}${branchCode}${randomDigits}`;
  const checksum = calculateChecksum(baseAccountNumber);

  return `${baseAccountNumber}${checksum}`;
}

/**
 * Calculates a simple checksum for the account number.
 * Uses a modulus-10 algorithm to ensure basic integrity.
 * @param accountNumber - The account number without the checksum.
 * @returns A single digit checksum.
 */
function calculateChecksum(accountNumber: string): number {
  const sum = accountNumber
    .split("")
    .map(Number)
    .reduce((acc, digit, index) => {
      const weightedDigit = index % 2 === 0 ? digit * 2 : digit; // Double every second digit
      return acc + (weightedDigit > 9 ? weightedDigit - 9 : weightedDigit); // Adjust for digits > 9
    }, 0);

  return (10 - (sum % 10)) % 10; // Return the checksum digit
}
