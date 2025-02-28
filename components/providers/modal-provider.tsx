"use client";

import { useConvexAuth } from "convex/react";
import { useIsMounted } from "usehooks-ts";
import AccountActivationModal from "../modals/account-activation-modal";
import PaymentModal from "../modals/payment-modal";

const ModalProvider = () => {
  const { isAuthenticated } = useConvexAuth();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  if (!isAuthenticated) return null;

  return (
    <>
      <AccountActivationModal />
      <PaymentModal />
    </>
  );
};

export default ModalProvider;
