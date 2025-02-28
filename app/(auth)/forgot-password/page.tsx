import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ResetPasswordCard from "./_components/content";

const ResetPassword = async () => {
  const user = await currentUser();

  if (user) redirect("/dashboard");

  return <ResetPasswordCard />;
};

export default ResetPassword;
