"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { formatAccountNumber } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { CheckCircle, Users2, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PendingApprovalsProps {
  activeUser: Doc<"users">;
}

const PendingApprovals = ({ activeUser }: PendingApprovalsProps) => {
  const pendingUsers = useQuery(api.users.getUsersPendingApproval, {
    email: activeUser.email,
  });

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Pending Approvals</h3>
      <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {pendingUsers &&
          (!pendingUsers.length ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Users2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                No users pending approval
              </p>
            </div>
          ) : (
            pendingUsers.map((user, index) => (
              <UserCard key={user._id} user={user} index={index} />
            ))
          ))}
      </div>
    </Card>
  );
};

export default PendingApprovals;

const UserCard = ({ user, index }: { user: Doc<"users">; index: number }) => {
  const updateUser = useMutation(api.users.updateUser);
  const [loading, setLoading] = useState(false);

  const onApproveUser = async () => {
    const toastId = "approving";

    try {
      toast.loading("Approving user...", { id: toastId });
      setLoading(true);

      await updateUser({
        id: user._id,
        isVerificationPending: false,
        isVerified: true,
      });

      toast.success("User approved!", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key={user._id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
    >
      <div>
        <p className="font-medium">
          {user.firstName} {user.surname}
        </p>
        <p className="text-sm text-muted-foreground mt-4 border p-1.5 rounded-md border-gray-300">
          {formatAccountNumber(user.accountNumber)}
        </p>
      </div>

      <TooltipProvider>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                disabled={loading}
                onClick={onApproveUser}
                className="text-green-500"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Approve account</p>
            </TooltipContent>
          </Tooltip>

          <Button size="sm" variant="ghost" className="text-red-500">
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      </TooltipProvider>
    </motion.div>
  );
};
