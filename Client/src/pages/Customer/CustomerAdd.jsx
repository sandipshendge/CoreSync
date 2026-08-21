import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UserRound,
  MapPin,
  ReceiptText,
  Phone,
  Save,
  Loader2,
  Users,
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
import { useCustomer } from "@/Context/CustomerProvider";
const CustomerAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addCustomer, updateCustomer, loading } = useCustomer();
  const editCustomer = location.state?.customer;
  const isEdit = location.state?.isEdit === true;
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    gstin: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isEdit && editCustomer) {
      setFormData({
        name:
          editCustomer.name ??
          editCustomer.nm ??
          editCustomer.customerName ??
          "",
        mobile: editCustomer.mobile ?? editCustomer.mob ?? "",
        address: editCustomer.address ?? "",
        gstin: editCustomer.gstin ?? "",
      });
    }
  }, [isEdit, editCustomer]);
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
    if (!String(formData.name ?? "").trim()) {
      newErrors.name = "Customer Name is required.";
    }
    if (!String(formData.mobile ?? "").trim()) {
      newErrors.mobile = "Mobile Number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile number.";
    }
    if (!String(formData.address ?? "").trim()) {
      newErrors.address = "Address is required.";
    }
    if (formData.gstin && formData.gstin.trim()) {
      const gstinRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

      if (!gstinRegex.test(formData.gstin.toUpperCase())) {
        newErrors.gstin = "Enter valid GSTIN.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Customer validation failed");
      return;
    }
    try {
      const payload = {
        nm: formData.name.trim(),
        mobile: formData.mobile.trim(),
        address: formData.address.trim(),
        gstin: formData.gstin.trim().toUpperCase(),
      };
      if (isEdit && editCustomer) {
        const result = await updateCustomer(editCustomer.id, payload);
        if (result?.success) {
          alert("Customer updated successfully!");

          navigate("/master/customer/details", {
            replace: true,
          });
        } else {
          alert(result?.error || "Failed to update customer.");
        }
        return;
      }
      const result = await addCustomer(payload);
      if (result?.success) {
        alert("Customer added successfully!");
        navigate("/master/customer/details", {
          replace: true,
        });
      } else {
        alert(result?.error || "Failed to add customer.");
      }
    } catch (error) {
      console.error("Customer submit error:", error);
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
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  {isEdit ? "Edit Customer" : "Add Customer"}
                </CardTitle>
                <CardDescription>
                  {isEdit
                    ? "Update customer information and contact details."
                    : "Enter customer information and contact details."}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Customer Information</h3>
                    <p className="text-xs text-muted-foreground">
                      Enter basic customer details.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <FormField
                    label="Customer Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter customer name"
                    icon={<UserRound />}
                    error={errors.name}
                    required
                  />
                  <FormField
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter 10 digit mobile number"
                    icon={<Phone />}
                    error={errors.mobile}
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              <div className="border-t pt-6">
                <div className="mb-5 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Address Details</h3>
                    <p className="text-xs text-muted-foreground">
                      Enter complete customer address.
                    </p>
                  </div>
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
                      placeholder="Enter complete customer address"
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
              </div>
              <div className="border-t pt-6">
                <div className="mb-5 flex items-center gap-2">
                  <ReceiptText className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Tax Details</h3>
                    <p className="text-xs text-muted-foreground">
                      Enter GST information if applicable.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <FormField
                    label="GSTIN"
                    name="gstin"
                    type="text"
                    value={formData.gstin}
                    onChange={handleChange}
                    placeholder="Enter GSTIN"
                    icon={<ReceiptText />}
                    error={errors.gstin}
                    maxLength={15}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 border-t bg-muted/10">
              <Button
                type="button"
                variant="ghost"
                disabled={loading}
                onClick={() => navigate("/master/customer/details")}
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

                    {isEdit ? "Update Customer" : "Save Customer"}
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
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  error,
  maxLength,
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
          maxLength={maxLength}
          className={`h-11 pl-10 ${
            error ? "border-destructive focus-visible:ring-destructive" : ""
          }`}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default CustomerAdd;
