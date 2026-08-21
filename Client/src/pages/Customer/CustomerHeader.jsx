import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PlusCircle, FileText, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
const CustomerHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeView = location.pathname.includes("/master/customer/add")
    ? "add"
    : "details";
  const handleToggle = (value) => {
    if (value === "add") {
      navigate("/master/customer/add");
    } else {
      navigate("/master/customer/details");
    }
  };
  return (
    <header className=" left-0 right-0 top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
        </Link>
        <Tabs
          value={activeView}
          onValueChange={handleToggle}
          className="hidden sm:block"
        >
          <TabsList className="grid h-9 w-[220px] grid-cols-2">
            <TabsTrigger value="add" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Details</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-3">
          <div className="hidden text-xs text-muted-foreground md:block">
            Status:
            <span className="ml-1 font-medium capitalize text-foreground">
              {activeView} Mode
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        </div>
      </div>
      <div className="border-t px-4 py-2 sm:hidden">
        <Tabs
          value={activeView}
          onValueChange={handleToggle}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add
            </TabsTrigger>
            <TabsTrigger value="details" className="gap-2">
              <FileText className="h-4 w-4" />
              Details
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};
export default CustomerHeader;
