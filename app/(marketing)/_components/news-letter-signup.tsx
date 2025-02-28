"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <div className="hidden sm:flex bg-zinc-900 py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-300">
          Stay Updated: Join Our Newsletter
        </p>
        <form onSubmit={handleSubmit} className="flex w-full sm:w-auto gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            className="bg-zinc-800 border-zinc-700 text-white max-w-xs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-emerald-400 text-zinc-950 hover:bg-emerald-500 whitespace-nowrap"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}
