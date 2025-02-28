import useActiveUser from "@/hooks/auth/use-active-user";
import { useAccountActivationModal } from "@/hooks/modal-state/use-account-activation-modal";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const AccountActivationModal = () => {
  const { isOpen, onClose, onOpenChange } = useAccountActivationModal();
  const { activeUser } = useActiveUser();

  return (
    <div>
      {/* Alert Dialog */}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            {!activeUser ? (
              <div className="max-w-md px-5 mx-auto grid place-items-center">
                <Loader className="size-5 animate-spin" />
              </div>
            ) : activeUser.isVerificationPending ? (
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Your verification is being processed...
              </h2>
            ) : (
              <>
                <DialogTitle className="text-xl font-bold">
                  Account Activation Required
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Your account is not yet activated. Please verify your account
                  to continue.
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          <DialogFooter>
            <Button variant={"outline"} onClick={() => onClose()}>
              Cancel
            </Button>
            {activeUser &&
              (activeUser.isVerificationPending ? (
                <Button onClick={() => onClose()} className="ml-2">
                  Close Modal
                </Button>
              ) : (
                <Button asChild className="ml-2">
                  <Link href={"/verify-account"} onClick={() => onClose()}>
                    Verify Account
                  </Link>
                </Button>
              ))}{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountActivationModal;
