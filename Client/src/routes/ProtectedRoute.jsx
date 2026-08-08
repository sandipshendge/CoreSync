import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Mobile Trigger */}
          <div className="fixed right-3 top-3 z-50 md:hidden">
            <SidebarTrigger className="h-9 w-9 rounded-md border bg-background shadow-sm" />
          </div>

          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedRoute;
