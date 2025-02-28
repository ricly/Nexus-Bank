import React, { PropsWithChildren } from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
