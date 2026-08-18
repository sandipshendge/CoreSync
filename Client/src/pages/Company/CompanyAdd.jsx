import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  ReceiptText,
  Users,
  Percent,
  ShieldCheck,
  HandCoins,
  Save,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/Context/CompanyProvider";

const CompanyAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addCompany, updateCompany, loading } = useCompany();
  const editCompany = location.state?.company;
  const isEdit = location.state?.isEdit === true;
  const [formData, setFormData] = useState({
    companyName: "",
    employeeStartCode: "",
    address: "",
    gstin: "",
    state: "MAHARASHTRA",
    serviceCharge: "",
    pf: "",
    mlwf: "",
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isEdit && editCompany) {
      setFormData({
        companyName: editCompany.nm ?? editCompany.companyName ?? "",
        employeeStartCode: editCompany.employeeStartCode ?? "",
        address: editCompany.address ?? "",
        gstin: editCompany.gstin ?? "",
        state: editCompany.state ?? "MAHARASHTRA",
        serviceCharge: editCompany.serviceCharge ?? "",
        pf: editCompany.pf ?? "",
        mlwf: editCompany.mlwf ?? "",
      });
    }
  }, [isEdit, editCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!String(formData.companyName ?? "").trim()) {
      newErrors.companyName = "Company Name is required.";
    }
    if (!String(formData.employeeStartCode ?? "").trim()) {
      newErrors.employeeStartCode = "Employee Start Code is required.";
    }
    if (!String(formData.address ?? "").trim()) {
      newErrors.address = "Address is required.";
    }
    if (!String(formData.gstin ?? "").trim()) {
      newErrors.gstin = "GSTIN is required.";
    }
    if (!String(formData.state ?? "").trim()) {
      newErrors.state = "State is required.";
    }
    if (
      formData.serviceCharge === "" ||
      formData.serviceCharge === null ||
      formData.serviceCharge === undefined
    ) {
      newErrors.serviceCharge = "Service Charge is required.";
    }
    if (
      formData.pf === "" ||
      formData.pf === null ||
      formData.pf === undefined
    ) {
      newErrors.pf = "PF is required.";
    }
    if (
      formData.mlwf === "" ||
      formData.mlwf === null ||
      formData.mlwf === undefined
    ) {
      newErrors.mlwf = "MLWF is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Validation failed");
      return;
    }
    try {
      if (isEdit && editCompany) {
        const payload = {
          nm: formData.companyName,
          employeeStartCode: Number(formData.employeeStartCode),
          address: formData.address,
          gstin: formData.gstin,
          state: formData.state,
          serviceCharge: Number(formData.serviceCharge),
          pf: Number(formData.pf),
          mlwf: Number(formData.mlwf),
        };

        console.log("UPDATE PAYLOAD:", payload);
        const result = await updateCompany(editCompany.id, payload);

        console.log("UPDATE RESULT:", result);
        if (result?.success) {
          alert("Company updated successfully!");

          navigate("/master/company/details", {
            replace: true,
          });
        } else {
          alert(result?.error || "Failed to update company.");
        }
        return;
      }
      const addPayload = {
        nm: formData.companyName,
        employeeStartCode: Number(formData.employeeStartCode),
        address: formData.address,
        gstin: formData.gstin,
        state: formData.state,
        serviceCharge: Number(formData.serviceCharge),
        pf: Number(formData.pf),
        mlwf: Number(formData.mlwf),
        isActive: true,
      };
      console.log("ADD PAYLOAD:", addPayload);
      const result = await addCompany(addPayload);
      console.log("ADD RESULT:", result);
      if (result?.success) {
        alert("Company added successfully!");

        navigate("/master/company/details", {
          replace: true,
        });
      } else {
        alert(result?.error || "Failed to add company.");
      }
    } catch (error) {
      console.error("Company submit error:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");

        return;
      }

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Something went wrong.",
      );
    }
  };
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <Card className="shadow-sm">
          {/* HEADER */}

          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <CardTitle className="text-xl">
                  {isEdit ? "Edit Company" : "Add Company"}
                </CardTitle>

                <CardDescription>
                  {isEdit
                    ? "Update company and payroll details."
                    : "Enter company and payroll details."}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  icon={<Building2 />}
                  error={errors.companyName}
                  required
                />

                <FormField
                  label="Employee Start Code"
                  name="employeeStartCode"
                  type="number"
                  value={formData.employeeStartCode}
                  onChange={handleChange}
                  placeholder="Enter employee start code"
                  icon={<Users />}
                  error={errors.employeeStartCode}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">
                  Address
                  <span className="ml-1 text-destructive">*</span>
                </Label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete company address"
                    rows={3}
                    className={`flex w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring ${
                      errors.address ? "border-destructive" : ""
                    }`}
                  />
                </div>

                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  label="GSTIN"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  placeholder="Enter GSTIN"
                  icon={<ReceiptText />}
                  error={errors.gstin}
                  required
                />

                <FormField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  icon={<MapPin />}
                  error={errors.state}
                  required
                />
              </div>
              <div className="border-t pt-6">
                <div className="mb-5 flex items-center gap-2">
                  <HandCoins className="h-5 w-5 text-primary" />

                  <div>
                    <h3 className="font-semibold">Payroll Details</h3>

                    <p className="text-xs text-muted-foreground">
                      Enter payroll charges and contributions.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <FormField
                    label="Service Charge"
                    name="serviceCharge"
                    type="number"
                    value={formData.serviceCharge}
                    onChange={handleChange}
                    placeholder="0"
                    icon={<Percent />}
                    error={errors.serviceCharge}
                    required
                  />

                  <FormField
                    label="PF"
                    name="pf"
                    type="number"
                    value={formData.pf}
                    onChange={handleChange}
                    placeholder="0"
                    icon={<ShieldCheck />}
                    error={errors.pf}
                    required
                  />

                  <FormField
                    label="MLWF"
                    name="mlwf"
                    type="number"
                    value={formData.mlwf}
                    onChange={handleChange}
                    placeholder="0"
                    icon={<HandCoins />}
                    error={errors.mlwf}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 border-t bg-muted/10">
              <Button
                type="button"
                variant="ghost"
                disabled={loading}
                onClick={() => navigate("/master/company/details")}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEdit ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {isEdit ? "Update Company" : "Save Company"}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
  type = "text",
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}

        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {React.cloneElement(icon, {
              className: "h-4 w-4",
            })}
          </div>
        )}

        <Input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-11 pl-10 ${
            error ? "border-destructive focus-visible:ring-destructive" : ""
          }`}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default CompanyAdd;
