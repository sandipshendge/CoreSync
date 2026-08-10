import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
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
import { useCompany } from "@/Context/CompanyProvider";

const CompanyDetails = () => {
  const navigate = useNavigate();
  const { getCompanies, companies } = useCompany();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    console.log("function called")
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    await getCompanies();
  };

  const filteredCompanies = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return companies;
    }

    return companies.filter((company) =>
      company.companyName?.toLowerCase().includes(value),
    );
  }, [search, companies]);

  
  const totalRecords = filteredCompanies.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalRecords);
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

 
  const handleSearch = (e) => {
    setSearch(e.target.value);

    setCurrentPage(1);
  };

  const handleEdit = (company) => {
    console.log("Edit Company:", company);

    navigate("/master/company/add");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto px-4 py-6">
      
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-semibold">Company Details</h1>

              <p className="text-sm text-muted-foreground">
                Manage your company profiles and payroll settings
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/master/company/add")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>
        <div className="mb-4 flex flex-col gap-3 rounded-lg border bg-card p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={handleSearch}
              placeholder="Search company..."
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
                    COMPANY NAME
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    PF
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    MLWF
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    SERVICE CHARGE
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    EMPLOYEE START CODE
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold">
                    STATE
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {currentCompanies.length > 0 ? (
                  currentCompanies.map((company) => (
                    <tr
                      key={company.id}
                      className="transition-colors hover:bg-muted/50"
                    >
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(company)}
                          className="h-8 w-8 text-primary hover:bg-primary/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </td>
                      <td className="px-4 py-3">
                        {company.isActive ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            YES
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            NO
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium">
                          {company.nm}
                        </span>
                      </td>
                     <td className="px-4 py-3 text-sm">{company.pf}</td>
                      <td className="px-4 py-3 text-sm">{company.mlwf}</td>
                      <td className="px-4 py-3 text-sm">
                        {company.serviceCharge}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {company.employeeStartCode}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {company.state}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Building2 className="h-10 w-10 text-muted-foreground/40" />

                        <div>
                          <p className="font-medium">No companies found</p>

                          <p className="text-sm text-muted-foreground">
                            Add your first company to see it here.
                          </p>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => navigate("/master/company/add")}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Company
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
              companies
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

export default CompanyDetails;
