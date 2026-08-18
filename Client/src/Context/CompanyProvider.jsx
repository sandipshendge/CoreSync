import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const CompanyContext = createContext(null);
const API_URL = `${import.meta.env.VITE_API_URL}/Company`;
export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getCompanies = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("GET RESPONSE:", response.data);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.records || [];
      setCompanies(data);
      return {
        success: true,
        data: data,
      };
    } catch (err) {
      console.error("Company GET Error:", err);
      console.error("Backend:", err.response?.data);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      } else {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Failed to load companies",
        );
      }

      return {
        success: false,
        error:
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to load companies",
      };
    } finally {
      setLoading(false);
    }
  };

  const addCompany = async (companyData) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, companyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("ADD RESPONSE:", response.data);
      await getCompanies();

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Company ADD Error:", err);
      console.error("Backend:", err.response?.data);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      } else {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Failed to add company",
        );
      }

      return {
        success: false,
        error:
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "Failed to add company",
      };
    } finally {
      setLoading(false);
    }
  };
  const updateCompany = async (id, companyData) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}/${id}`, companyData, {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      });
      await getCompanies();

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Error:", err);
      console.error("Status:", err.response?.status);
      console.error("Backend Response:", err.response?.data);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");

        return {
          success: false,
          error: "Unauthorized. Please login again.",
        };
      }
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to update company";

      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const updateCompanyStatus = async (id) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      console.log("Company ID:", id);
      const response = await axios.get(`${API_URL}/activeDeactive/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("STATUS RESPONSE:", response.data);
      await getCompanies();

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      console.error("Status update error:", err);
      console.error("Backend:", err.response?.data);

      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to update status";

      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
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
        getCompanies,
        addCompany,
        updateCompany,
        updateCompanyStatus,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used inside CompanyProvider");
  }
  return context;
};
