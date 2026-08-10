import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const CompanyContext = createContext(null);

const API_URL = `${import.meta.env.VITE_API_URL}/Company`;

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const addCompany = async (formData) => {
    try {
      setLoading(true);
      setError("");
      if (!token) {
        return {
          success: false,
          error: "Authentication token not found. Please login again.",
        };
      }

      const payload = {
        nm: formData.companyName,
        pf: Number(formData.pf),
        mlwf: Number(formData.mlwf),
        address: formData.address,
        gstin: formData.gstin,
        state: formData.state,
        serviceCharge: Number(formData.serviceCharge),
        employeeStartCode: Number(formData.employeeStartCode),
        isActive: true,
      };

      console.log("Company Payload:", payload);

      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Company saved:", response.data);

      setCompanies((prev) => [...prev, response.data]);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Company API Error:", error);

      if (error.response?.status === 401) {
        return {
          success: false,
          error: "Unauthorized. Please login again.",
        };
      }

      const message = error.response?.data?.message || "Failed to save company";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };
  const getCompanies = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setCompanies(response.data);

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Get Companies Error:", err);

      const message = err.response?.data?.message || "Failed to get companies";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        companies,
        loading,
        error,
        addCompany,
        getCompanies,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);

  if (context === null) {
    throw new Error("useCompany must be used inside CompanyProvider");
  }

  return context;
};

export default CompanyProvider;
