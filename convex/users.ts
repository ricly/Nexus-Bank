import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
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
    accountNumber: v.string(),
  },
  handler: async ({ db }, args) => {
    const {
      uid,
      firstName,
      middleName,
      surname,
      gender,
      email,
      phone,
      avatarUrl,
      country,
      isVerified,
      isVerificationPending,
      balance,
      accountNumber,
    } = args;

    const newUserId = await db.insert("users", {
      uid,
      firstName,
      middleName,
      surname,
      gender,
      email,
      phone,
      avatarUrl,
      country,
      isVerified,
      isVerificationPending,
      balance,
      accountNumber,
    });

    return newUserId;
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    firstName: v.optional(v.string()),
    middleName: v.optional(v.string()),
    surname: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    country: v.optional(v.string()),
    gender: v.optional(
      v.union(v.literal("male"), v.literal("female"), v.literal("other"))
    ),
    isVerified: v.optional(v.boolean()),
    isVerificationPending: v.optional(v.boolean()),
    balance: v.optional(v.number()),
  },
  handler: async ({ db }, args) => {
    const {
      id,
      firstName,
      middleName,
      surname,
      gender,
      email,
      phone,
      avatarUrl,
      country,
      isVerified,
      isVerificationPending,
      balance,
    } = args;

    const existingUser = await db.get(id);
    if (!existingUser) return null;

    await db.patch(id, {
      firstName: firstName || existingUser.firstName,
      middleName: middleName || existingUser.middleName,
      surname: surname || existingUser.surname,
      gender: gender || existingUser.gender,
      email: email || existingUser.email,
      phone: phone || existingUser.phone,
      avatarUrl: avatarUrl || existingUser.avatarUrl,
      country: country || existingUser.country,
      isVerified: isVerified || existingUser.isVerified,
      isVerificationPending:
        isVerificationPending || existingUser.isVerificationPending,
      balance: balance || existingUser.balance,
    });
  },
});

export const getUserByEmail = query({
  args: { email: v.optional(v.string()) },
  handler: async ({ db }, { email }) => {
    if (!email) return null;
    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .unique();

    return user;
  },
});

export const getUsersPendingApproval = query({
  args: { email: v.optional(v.string()) },
  handler: async ({ db }, { email }) => {
    const adminEmails = ["ericricky200@gmail.com", "wilsonligawa@gmail.com"];
    if (!email) return null;

    if (!adminEmails.includes(email)) return null;

    const users = await db
      .query("users")
      .filter((q) =>
        q.and(
          q.eq(q.field("isVerificationPending"), true),
          q.eq(q.field("isVerified"), false)
        )
      )
      .collect();

    return users;
  },
});

export const getAllUsersAdmin = query({
  args: { email: v.optional(v.string()) },
  handler: async ({ db }, { email }) => {
    const adminEmails = ["ericricky200@gmail.com", "wilsonligawa@gmail.com"];
    if (!email) return null;

    if (!adminEmails.includes(email)) return null;

    const users = await db.query("users").collect();

    return users;
  },
});
