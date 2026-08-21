import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";
const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomerHeader />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
