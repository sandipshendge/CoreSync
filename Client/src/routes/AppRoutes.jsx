import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Employee from "@/pages/Employee";
import Rawmaterial from "@/pages/Rawmaterial";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Customer from "@/pages/Customer/Customer";
import Attendance from "@/pages/transcation/Attendance";
import EmployeeInvoice from "@/pages/transcation/EmployeeInvoice";
import Tendor from "@/pages/transcation/Tendor";
import SaleInvoice from "@/pages/transcation/SaleInvoice";
import AttendanceReport from "@/pages/report/AttendanceReport";
import CompanyDetails from "@/pages/Company/CompanyDetails";
import CompanyAdd from "@/pages/Company/CompanyAdd";
import CompanyLayout from "@/pages/Company/CompanyLayout";



const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/master">
          <Route path="employee" element={<Employee />} />
          <Route path="company" element={<CompanyLayout />}>
            <Route
              index
              element={<Navigate to="/master/company/details" replace />}
            />
            <Route path="details" element={<CompanyDetails />} />
            <Route path="add" element={<CompanyAdd />} />
          </Route>
          <Route path="Customer" element={<Customer />} />
          <Route path="raw_material" element={<Rawmaterial />} />
        </Route>
        <Route path="/transaction">
          <Route path="attendance" element={<Attendance />} />
          <Route path="employee_invoice" element={<EmployeeInvoice />} />
          <Route path="tendor" element={<Tendor />} />
          <Route path="sale_invoice" element={<SaleInvoice />} />
        </Route>
        <Route path="/report">
          <Route path="attendance" element={<AttendanceReport />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
