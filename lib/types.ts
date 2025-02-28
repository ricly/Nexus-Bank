import { Doc, Id } from "@/convex/_generated/dataModel";

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
}

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer",
  PAYMENT = "payment",
}

export interface TransactionAdmin {
  user: Doc<"users"> | null;
  _id: Id<"transactions">;
  _creationTime: number;
  amount: number;
  currency: "kes" | "usd";
  status: "pending" | "completed" | "failed";
  type: "deposit" | "withdrawal" | "transfer" | "payment";
  description?: string;
  recepient?: string;
}
