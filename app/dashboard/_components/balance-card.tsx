"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useActiveUser from "@/hooks/auth/use-active-user";
import { useAccountActivationModal } from "@/hooks/modal-state/use-account-activation-modal";
import { usePaymentModal } from "@/hooks/modal-state/use-payment-modal";
import { formatAccountNumber, formatCurrencyUSD } from "@/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCheck,
  Copy,
  Info,
  Plus,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const BalanceCard = () => {
  const { onOpen } = useAccountActivationModal();
  const { onOpen: onOpenPaymentModal } = usePaymentModal();
  const { activeUser } = useActiveUser();

  const [accountNumberCopied, setAccountNumberCopied] = useState(false);

  const onCopyAccountNumber = () => {
    if (!activeUser?.accountNumber) return;
    navigator.clipboard.writeText(activeUser.accountNumber);
    setAccountNumberCopied(true);
    const toastId = toast.success("Account number copied to clipboard", {
      id: "account_number_copied",
      style: {
        color: "black",
      },
    });
    setTimeout(() => {
      toast.dismiss(toastId);
      setAccountNumberCopied(false);
    }, 2000);
  };

  return (
    <TooltipProvider>
      <Card className="w-full p-2">
        <CardHeader className="flex flex-row items-center justify-center md:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Your Balance</h2>
            <Button variant="ghost" size="icon" className="h-4 w-4">
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex"
            onClick={() => {
              if (!activeUser) return;

              if (!activeUser.isVerified) {
                onOpen();
                return;
              }

              onOpenPaymentModal("deposit");
            }}
          >
            <Plus className="h-4 w-4" />
            Deposit
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 border rounded-lg p-2">
          <Tabs defaultValue="USD" className="w-full">
            <TabsList className="grid w-full max-w-[200px] mx-auto grid-cols-1 px-2.5 h-12">
              <TabsTrigger
                value="USD"
                className="flex items-center gap-1 !bg-white !shadow-2xl"
              >
                <Image
                  src={"/images/us-flag.png"}
                  alt="."
                  width={10}
                  height={10}
                  className="rounded-full"
                />
                USD
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col items-center space-y-2 mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Available USD balance
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Balance available for immediate use</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="text-3xl font-bold text-primary">
              {formatCurrencyUSD(activeUser?.balance)}
            </div>
          </div>

          <div className="pb-6 flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-1">Account Number</p>
            <div className="flex items-center text-xl font-mono text-gray-900 bg-gray-100 rounded-lg p-3">
              {formatAccountNumber(activeUser?.accountNumber!)}{" "}
              <Button
                size={"icon"}
                variant={"ghost"}
                disabled={accountNumberCopied}
                onClick={onCopyAccountNumber}
                className="ml-2"
              >
                {accountNumberCopied ? (
                  <CheckCheck className="size-4 text-primary" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 max-w-screen-md mx-auto pb-4">
            <Button
              onClick={() => {
                if (!activeUser) return;

                if (!activeUser.isVerified) {
                  onOpen();
                  return;
                }

                onOpenPaymentModal("deposit");
              }}
              variant="outline"
              className="flex-1 text-primary border-primary"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Money
            </Button>
            <Button
              onClick={() => {
                if (!activeUser) return;

                if (!activeUser.isVerified) {
                  onOpen();
                  return;
                }

                onOpenPaymentModal("withdrawal");
              }}
              variant="outline"
              className="flex-1 text-primary border-primary"
            >
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              Widthdraw Money
            </Button>
            <Button
              onClick={() => {
                if (!activeUser) return;

                if (!activeUser.isVerified) {
                  onOpen();
                  return;
                }

                onOpenPaymentModal("transfer");
              }}
              variant="outline"
              className="flex-1 text-primary border-primary"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Send Money
            </Button>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default BalanceCard;
