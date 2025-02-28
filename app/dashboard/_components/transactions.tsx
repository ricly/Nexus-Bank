"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { TransactionStatus } from "@/lib/types";
import { cn, formatCurrencyUSD } from "@/lib/utils";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import { ArrowDownRight, ArrowRightLeft, ArrowUpRight } from "lucide-react";

interface ITransaction {
  date: string;
  amount: number;
  type: string;
  description: string;
  status: TransactionStatus;
}

interface TransactionsProps {
  userId: Id<"users">;
}

const Transactions = ({ userId }: TransactionsProps) => {
  const transactions = useQuery(api.transactions.getUsersTransactions, {
    userId: userId,
  });

  return (
    <Card className="w-[284px] md:w-full bg-white rounded-xl shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">Transaction history</h2>
        </div>
      </CardHeader>

      <CardContent>
        <Table className="rounded-lg overflow-x-auto">
          <TableHeader className="bg-slate-100 rounded-t-xl">
            <TableRow>
              <TableHead className="text-muted-foreground text-sm">
                Date
              </TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground">
                Description
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions &&
              (transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-3 mb-3">
                        <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        No transaction to show
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <span className={cn("truncate")}>
                        {format(transaction._creationTime, "PPP")}
                      </span>
                    </TableCell>
                    <TableCell>
                      {formatCurrencyUSD(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 capitalize">
                        {transaction.type === "deposit" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        {transaction.type}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={transaction.status}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Transactions;
