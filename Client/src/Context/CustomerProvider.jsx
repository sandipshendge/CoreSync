import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const CustomerContext = createContext(null);
const API_URL = `${import.meta.env.VITE_API_URL}/Customer`;
export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getCustomers = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Customer GET Response:", response.data);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setCustomers(data);
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("Get Customers Error:", error);
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to fetch customers",
      );
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message,
      };
    } finally {
      setLoading(false);
    }
  };
  const addCustomer = async (customerData) => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, customerData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      await getCustomers();
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Add Customer Error:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to add customer",
      };
    } finally {
      setLoading(false);
    }
  };
  const updateCustomer = async (id, customerData) => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/${id}`,
      customerData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("UPDATE RESPONSE:", response.data);
    await getCustomers();
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.response?.data?.message);
    console.error("Error:", error.message);

    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        JSON.stringify(error.response?.data) ||
        error.message,
    };
  } finally {
    setLoading(false);
  }
};
  const updateCustomerStatus = async (id) => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/activeDeactive/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    await getCustomers();
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Customer Status Error:", error);
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);

    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message,
    };
  } finally {
    setLoading(false);
  }
};
  return (
    <CustomerContext.Provider
      value={{
        customers,
        loading,
        error,
        getCustomers,
        addCustomer,
        updateCustomer,
        updateCustomerStatus,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomer must be used inside CustomerProvider",
    );
  }
  return context;
};