"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { formatAccountNumber } from "@/lib/utils";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import { Copy, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UserManagementProps {
  activeUser: Doc<"users">;
}

const UserManagement = ({ activeUser }: UserManagementProps) => {
  const users = useQuery(api.users.getAllUsersAdmin, {
    email: activeUser.email,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users?.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Account No.</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            {/* <TableHead className="w-[50px]"></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers?.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                {user.firstName} {user.surname}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-sm flex items-center">
                {formatAccountNumber(user.accountNumber!)}

                <Copy
                  className="size-4 cursor-pointer ml-4"
                  onClick={() => {
                    navigator.clipboard.writeText(user.accountNumber);
                    const toastId = toast.success(
                      "Account number copied to clipboard",
                      {
                        id: "account_number_copied_2",
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
              </TableCell>
              <TableCell>
                <Badge variant={user.isVerified ? "default" : "secondary"}>
                  {user.isVerified ? "verified" : "pending"}
                </Badge>
              </TableCell>
              <TableCell>{format(user._creationTime, "PPP")}</TableCell>
              {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Suspend
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UserManagement;
