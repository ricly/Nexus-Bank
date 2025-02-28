"use server";

import IntaSend from "intasend-node";

interface IPayload {
  first_name: string;
  last_name: string;
  email: string;
  amount: number;
  redirect_url?: string;
}

export const handlePayment = async (data: IPayload) => {
  const intasend = new IntaSend(
    // process.env.NEXT_PUBLIC_INTASEND_PUBLIC_KEY,
    // process.env.INTASEND_SECRET_KEY,
    "ISPubKey_live_52d9a4bb-d440-4d8a-9cd5-eb6ae2100e3b",
    "ISSecretKey_live_55f6dc0d-64c8-480f-a04a-9a1a81c54ed1",
    true
  );

  try {
    const collection = intasend.collection();
    const { amount, email, first_name, last_name, redirect_url } = data;
    const response = await collection.charge({
      first_name,
      last_name,
      email,
      host: `${process.env.NEXT_PUBLIC_ROOT_URL}`,
      amount,
      currency: "USD",
      api_ref: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
      redirect_url:
        redirect_url || `${process.env.NEXT_PUBLIC_ROOT_URL}/verify-account`,
    });

    console.log(`Charge Response:`, response);
    return response;
  } catch (error: any) {
    let errMsg = "something went wrong";

    if (Buffer.isBuffer(error)) {
      errMsg = error.toString();
    }

    console.error(`Charge Error:`, errMsg);
  }
};
