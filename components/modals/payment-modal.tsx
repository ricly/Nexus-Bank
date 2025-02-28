"use client";

import { api } from "@/convex/_generated/api";
import useActiveUser from "@/hooks/auth/use-active-user";
import { usePaymentModal } from "@/hooks/modal-state/use-payment-modal";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const PaymentModal = () => {
  const { activeUser } = useActiveUser();
  const { isOpen, onClose, onOpenChange, type } = usePaymentModal();
  const [amount, setAmount] = useState("");
  const createTransaction = useMutation(api.transactions.createTransaction);

  const [isPaying, setIsPaying] = useState(false);

  const onPay = async () => {
    if (!activeUser || !type || !amount) return;

    const toastId = toast.loading("Processing payment...", {
      id: `Loading_${type}`,
    });

    try {
      setIsPaying(true);

      if (type === "payment" || type === "transfer" || type === "withdrawal") {
        const balance = activeUser.balance - +amount;

        if (balance <= 0)
          return toast.error("Insufficient balance.", { id: toastId });
      }

      await createTransaction({
        user: activeUser._id,
        type,
        amount: +amount,
        currency: "usd",
        description: "",
        status: "pending",
      });

      toast.success("Transaction created successfully.", { id: toastId });
      setAmount("");
      onClose();

      // const res = await handlePayment({
      //   first_name: firstName,
      //   last_name: surname,
      //   email,
      //   amount: +amount,
      //   redirect_url: `${process.env.NEXT_PUBLIC_ROOT_URL}/dashboard/transactions`,
      // });

      // console.log("RES ====>", res);
      // location.replace(res.url);
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.", { id: toastId });
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div>
      {/* Alert Dialog */}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold capitalize">
              {type} Amount
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              <p className="text-sm text-gray-600">
                Perform a {type} transaction on your account
              </p>
            </DialogDescription>

            <div className="space-y-4">
              <Label>Amount</Label>
              <Input
                type="number"
                min={1}
                max={1000000}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"outline"}
              onClick={() => onClose()}
              className="mt-4 md:mt-0"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isPaying || !amount}
              onClick={onPay}
            >
              {isPaying && <Loader2 className="size-4 mr-2 animate-spin" />}
              Complete transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentModal;
