import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    uid: v.string(),
    firstName: v.string(),
    middleName: v.optional(v.string()),
    surname: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    country: v.optional(v.string()),
    gender: v.union(v.literal("male"), v.literal("female"), v.literal("other")),
    isVerified: v.boolean(),
    isVerificationPending: v.optional(v.boolean()),
    balance: v.number(),
    accountNumber: v.string()
  }).index("by_email", ["email"]),

  accounts: defineTable({
    user: v.id("users"),
    accountType: v.union(v.literal("savings"), v.literal("checking")),
    accountNumber: v.string(),
    balance: v.number(),
    currency: v.union(v.literal("kes"), v.literal("usd")),
  }).index("by_user", ["user"]),

  transactions: defineTable({
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
  }),
});
