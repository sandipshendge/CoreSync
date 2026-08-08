import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Employee from "@/pages/Employee";
import Rawmaterial from "@/pages/Rawmaterial";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Company from "@/pages/Company/Company";
import Customer from "@/pages/Customer/Customer";
import Attendance from "@/pages/transcation/Attendance";
import EmployeeInvoice from "@/pages/transcation/EmployeeInvoice";
import Tendor from "@/pages/transcation/Tendor";
import SaleInvoice from "@/pages/transcation/SaleInvoice";
import AttendanceReport from "@/pages/report/AttendanceReport";

const PagePlaceholder = ({ title }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

        <p className="mt-2 text-sm text-gray-500">
          This page is under development.
        </p>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route element={<PublicRoute />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* ================= PROTECTED ROUTES ================= */}

      <Route element={<ProtectedRoute />}>
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ================= MASTER ================= */}

        <Route path="/master">
          <Route path="employee" element={<Employee />} />
          <Route path="Company" element={<Company />} />
          <Route path="Customer" element={<Customer />} />
          <Route path="raw_material" element={<Rawmaterial />} />
        </Route>

        {/* ================= TRANSACTION ================= */}

        <Route path="/transaction">
          <Route path="attendance" element={<Attendance />} />
          <Route path="employee_invoice" element={<EmployeeInvoice />} />
          <Route path="tendor" element={<Tendor />} />
          <Route path="sale_invoice" element={<SaleInvoice />} />
        </Route>

        {/* ================= REPORT ================= */}

        <Route path="/report">
          <Route path="attendance" element={<AttendanceReport />} />
        </Route>
      </Route>

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
