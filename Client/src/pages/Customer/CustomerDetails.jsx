import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Pencil,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCustomer } from "@/Context/CustomerProvider";
const CustomerDetails = () => {
  const navigate = useNavigate();
  const { getCustomers, customers, updateCustomerStatus } = useCustomer();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    loadCustomers();
  }, []);
  const loadCustomers = async () => {
    try {
      await getCustomers();
    } catch (error) {
      console.error("Failed to load customers:", error);
    }
  };
  const filteredCustomers = useMemo(() => {
    const value = search.toLowerCase().trim();
    if (!value) {
      return customers;
    }
    return customers.filter((customer) => {
      const name = customer.name ?? customer.nm ?? customer.customerName ?? "";
      const mobile = customer.mobile ?? customer.mob ?? "";
      const gstin = customer.gstin ?? "";
      const address = customer.address ?? "";
      return (
        String(name).toLowerCase().includes(value) ||
        String(mobile).toLowerCase().includes(value) ||
        String(gstin).toLowerCase().includes(value) ||
        String(address).toLowerCase().includes(value)
      );
    });
  }, [search, customers]);
  const totalRecords = filteredCustomers.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  const handleAdd = () => {
    navigate("/master/customer/add");
  };
  const handleEdit = (customer) => {
    if (!customer) {
      console.error("NO CUSTOMER RECEIVED");
      return;
    }
    navigate("/master/customer/add", {
      state: {
        customer,
        isEdit: true,
      },
    });
  };
  const handleStatusChange = async (id) => {
    console.log("Updating customer status:", id);
    try {
      const result = await updateCustomerStatus(id);
      console.log("Customer status result:", result);
      await getCustomers();
    } catch (error) {
      console.error("Customer status error:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Customer Details</h1>
              <p className="text-sm text-muted-foreground">
                Manage your customer profiles and details
              </p>
            </div>
          </div>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
        <div className="mb-4 flex flex-col gap-3 rounded-lg border bg-card p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={handleSearch}
              placeholder="Search customer..."
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="w-[65px] px-4 py-3 text-left text-xs font-semibold">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    IS ACTIVE
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    CUSTOMER NAME
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    MOBILE
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    GSTIN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    ADDRESS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer) => {
                    const name =
                      customer.name ??
                      customer.nm ??
                      customer.customerName ??
                      "-";
                    const mobile = customer.mobile ?? customer.mob ?? "-";
                    return (
                      <tr
                        key={customer.id}
                        className="transition-colors hover:bg-muted/50"
                      >
                        <td className="px-4 py-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(customer)}
                            className="h-8 w-8 text-primary hover:bg-primary/10"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(customer.id)}
                            className="focus:outline-none"
                          >
                            {customer.isActive ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400">
                                YES
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400">
                                NO
                              </span>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm">{name}</span>
                        </td>
                        <td className="px-4 py-3 text-sm">{mobile}</td>
                        <td className="px-4 py-3 text-sm">
                          {customer.gstin ?? "-"}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {customer.address ?? "-"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <UserRound className="h-10 w-10 text-muted-foreground/40" />
                        <div>
                          <p className="font-medium">No customers found</p>
                          <p className="text-sm text-muted-foreground">
                            Add your first customer to see it here.
                          </p>
                        </div>
                        <Button size="sm" onClick={handleAdd}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Customer
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-3 border-t bg-muted/20 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {totalRecords === 0 ? 0 : startIndex + 1}
              </span>
              {" - "}
              <span className="font-medium text-foreground">
                {endIndex}
              </span> of{" "}
              <span className="font-medium text-foreground">
                {totalRecords}
              </span>{" "}
              customers
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex h-8 items-center rounded-md border bg-background px-3 text-sm">
                Page
                <span className="mx-1 font-medium">{currentPage}</span>
                of
                <span className="ml-1 font-medium">{totalPages}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerDetails;
