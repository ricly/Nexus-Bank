import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const createTransaction = mutation({
  args: {
    user: v.id("users"),
    recepient: v.optional(v.id("users")), // Optional, for transfers
    type: v.union(
      v.literal("deposit"),
      v.literal("withdrawal"),
      v.literal("transfer"),
      v.literal("payment")
    ),
    amount: v.number(),
    currency: v.union(v.literal("kes"), v.literal("usd")),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
  },
  handler: async ({ db }, args) => {
    const { user, recepient, type, amount, currency, description, status } =
      args;

    const newTransactionId = await db.insert("transactions", {
      user,
      recepient,
      type,
      amount,
      currency,
      description,
      status,
    });

    return newTransactionId;
  },
});

export const updateTransaction = mutation({
  args: {
    id: v.id("transactions"),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
  },
  handler: async ({ db }, args) => {
    const { id, status, description } = args;

    const existingTransaction = await db.get(id);
    if (!existingTransaction) return null;

    await db.patch(id, {
      description: description ?? existingTransaction.description,
      status: status ?? existingTransaction.status,
    });
  },
});

export const getUsersTransactions = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async ({ db }, { userId }) => {
    if (!userId) return null;

    const transactions = await db
      .query("transactions")
      .filter((q) => q.eq(q.field("user"), userId))
      .collect();

    return transactions;
  },
});

export const getUsersTransactionsAdmin = query({
  args: { email: v.optional(v.string()) },
  handler: async ({ db }, { email }) => {
    const adminEmails = ["ericricky200@gmail.com", "wilsonligawa@gmail.com"];
    if (!email) return null;

    if (!adminEmails.includes(email)) return null;

    const transactions = await db.query("transactions").collect();

    const output = await Promise.all(
      transactions.map(async (transaction) => ({
        ...transaction,
        user: await db.get(transaction.user),
      }))
    );

    return output;
  },
});
