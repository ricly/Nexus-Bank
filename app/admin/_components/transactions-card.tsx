"use client";

import LoadingComponent from "@/components/loading-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { TransactionAdmin } from "@/lib/types";
import { formatAccountNumber } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import {
  ArrowDownRight,
  ArrowRightLeft,
  ArrowUpRight,
  Copy,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const transactions1 = [
  {
    id: 1,
    user: "John Doe",
    type: "deposit",
    amount: 5000,
    status: "completed",
    date: "2024-03-07 14:30",
  },
  {
    id: 2,
    user: "Jane Smith",
    type: "withdrawal",
    amount: 1200,
    status: "pending",
    date: "2024-03-07 14:25",
  },
  {
    id: 3,
    user: "Mike Johnson",
    type: "transfer",
    amount: 3500,
    status: "completed",
    date: "2024-03-07 14:20",
  },
];

interface TransactionsCardProps {
  activeUser: Doc<"users">;
}

const TransactionsCard = ({ activeUser }: TransactionsCardProps) => {
  const transactions = useQuery(api.transactions.getUsersTransactionsAdmin, {
    email: activeUser.email,
  });

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      {!transactions && <LoadingComponent />}

      {transactions && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!transactions.length ? (
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
              transactions?.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell className="font-medium">
                    <p className="flex items-center text-sm text-muted-foreground mt-4 border p-1.5 rounded-md border-gray-300 max-w-fit">
                      {formatAccountNumber(transaction.user?.accountNumber!)}

                      <Copy
                        className="size-4 cursor-pointer ml-4"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            activeUser.accountNumber
                          );
                          const toastId = toast.success(
                            "Account number copied to clipboard",
                            {
                              id: "account_number_copied_1",
                              style: {
                                color: "black",
                              },
                            }
                          );
                          setTimeout(() => {
                            toast.dismiss(toastId);
                          }, 2000);
                        }}
                      />
                    </p>
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.user?.firstName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {transaction.type === "deposit" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      {transaction.type}
                    </div>
                  </TableCell>
                  <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                  <TableCell className="truncate">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(transaction._creationTime, "PPP")}
                  </TableCell>
                  <TableCell>
                    <TableAction transaction={transaction} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};

export default TransactionsCard;

const TableAction = ({ transaction }: { transaction: TransactionAdmin }) => {
  const updateTransaction = useMutation(api.transactions.updateTransaction);
  const updateUser = useMutation(api.users.updateUser);

  const [loading, setLoading] = useState(false);

  const onMarkComplete = async () => {
    if (!transaction.user) return;

    const transactionType = transaction.type;
    const isMinus =
      transactionType === "payment" ||
      transactionType === "transfer" ||
      transactionType === "withdrawal";

    const balance = isMinus
      ? transaction.user.balance - transaction.amount
      : transaction.user.balance + transaction.amount;

    if (balance <= 0)
      return toast.error("Insufficient balance.", {
        id: "transaction_update_1",
      });

    try {
      toast.loading("Updating transaction...", {
        id: "transaction_update_1",
      });

      await updateTransaction({
        id: transaction._id,
        status: "completed",
      });

      await updateUser({
        id: transaction.user._id,
        balance,
      });

      toast.dismiss("transaction_update_1");
      setLoading(true);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", { id: "transaction_update_1" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={loading || transaction.status === "completed"}
          onClick={onMarkComplete}
        >
          Mark as completed
        </DropdownMenuItem>
        {/* <DropdownMenuItem>View Details</DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
