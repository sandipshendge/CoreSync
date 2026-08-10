import React from "react";
import {
  Building2,
  Users,
  UserRound,
  Package,
  FileText,
  Receipt,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  CalendarDays,
  MoreHorizontal,
  Activity,
  IndianRupee,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto space-y-6 px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back! Here's an overview of your business.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              Today
            </Button>

            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Quick Add
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Companies"
            value="12"
            description="+2 this month"
            icon={<Building2 />}
            trend="up"
          />
          <StatCard
            title="Employees"
            value="248"
            description="+18 this month"
            icon={<Users />}
            trend="up"
          />
          <StatCard
            title="Customers"
            value="1,284"
            description="+124 this month"
            icon={<UserRound />}
            trend="up"
          />
          <StatCard
            title="Raw Materials"
            value="386"
            description="-12 this month"
            icon={<Package />}
            trend="down"
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Business Overview</CardTitle>

                <p className="mt-1 text-xs text-muted-foreground">
                  Revenue and transaction summary
                </p>
              </div>

              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </CardHeader>

            <CardContent>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>

                  <h2 className="mt-1 text-3xl font-bold">₹12,84,500</h2>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  12.5%
                </div>
              </div>
              <div className="flex h-52 items-end gap-2 border-b">
                {[35, 52, 42, 68, 55, 76, 62, 88, 72, 94, 82, 100].map(
                  (height, index) => (
                    <div key={index} className="group flex flex-1 items-end">
                      <div
                        style={{
                          height: `${height}%`,
                        }}
                        className="w-full rounded-t-md bg-primary/80 transition-all group-hover:bg-primary"
                      />
                    </div>
                  ),
                )}
              </div>
              <div className="mt-3 grid grid-cols-6 text-center text-[11px] text-muted-foreground">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <QuickAction
                icon={<Building2 />}
                title="Add Company"
                description="Create company profile"
              />

              <QuickAction
                icon={<Users />}
                title="Add Employee"
                description="Register new employee"
              />

              <QuickAction
                icon={<UserRound />}
                title="Add Customer"
                description="Create customer profile"
              />

              <QuickAction
                icon={<Receipt />}
                title="Create Invoice"
                description="Generate new invoice"
              />

              <QuickAction
                icon={<FileText />}
                title="View Reports"
                description="Check business reports"
              />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent Transactions</CardTitle>

                <p className="mt-1 text-xs text-muted-foreground">
                  Latest business activities
                </p>
              </div>

              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>

            <CardContent>
              <div className="space-y-1">
                <Transaction
                  name="Sales Invoice #INV-1024"
                  category="Sales"
                  amount="+₹24,500"
                  time="10 minutes ago"
                  positive
                />

                <Transaction
                  name="Employee Salary"
                  category="Payroll"
                  amount="-₹48,000"
                  time="1 hour ago"
                />

                <Transaction
                  name="Raw Material Purchase"
                  category="Purchase"
                  amount="-₹18,750"
                  time="3 hours ago"
                />

                <Transaction
                  name="Sales Invoice #INV-1023"
                  category="Sales"
                  amount="+₹32,800"
                  time="5 hours ago"
                  positive
                />

                <Transaction
                  name="Customer Payment"
                  category="Payment"
                  amount="+₹15,200"
                  time="Yesterday"
                  positive
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Overview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <StatusItem
                title="Active Employees"
                value="228"
                total="248"
                percentage={92}
              />

              <StatusItem
                title="Active Customers"
                value="1,142"
                total="1,284"
                percentage={89}
              />

              <StatusItem
                title="Stock Availability"
                value="82%"
                total=""
                percentage={82}
              />

              <StatusItem
                title="Pending Invoices"
                value="18"
                total=""
                percentage={34}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniCard
            icon={<Receipt />}
            title="Sales Invoice"
            value="156"
            description="This month"
          />

          <MiniCard
            icon={<FileText />}
            title="Purchase Invoice"
            value="84"
            description="This month"
          />

          <MiniCard
            icon={<Activity />}
            title="Attendance"
            value="94.8%"
            description="Current month"
          />

          <MiniCard
            icon={<IndianRupee />}
            title="Outstanding"
            value="₹2.48L"
            description="Receivable amount"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, description, icon, trend }) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <h2 className="mt-2 text-2xl font-bold">{value}</h2>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {React.cloneElement(icon, {
              className: "h-5 w-5",
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1 text-xs">
          {trend === "up" ? (
            <TrendingUp className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
          )}

          <span className="text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const QuickAction = ({ icon, title, description }) => {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {React.cloneElement(icon, {
          className: "h-4 w-4",
        })}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>

        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>

      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
};

const Transaction = ({ name, category, amount, time, positive }) => {
  return (
    <div className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
        {positive ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name}</p>

        <p className="text-xs text-muted-foreground">
          {category} • {time}
        </p>
      </div>

      <span
        className={`text-sm font-semibold ${
          positive
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {amount}
      </span>
    </div>
  );
};

const StatusItem = ({ title, value, total, percentage }) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>

          <p className="text-xs text-muted-foreground">
            {value}
            {total && ` / ${total}`}
          </p>
        </div>

        <span className="text-sm font-semibold">{percentage}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

const MiniCard = ({ icon, title, value, description }) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {React.cloneElement(icon, {
            className: "h-5 w-5",
          })}
        </div>

        <div>
          <p className="text-xs text-muted-foreground">{title}</p>

          <p className="mt-1 text-xl font-bold">{value}</p>

          <p className="text-[11px] text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
