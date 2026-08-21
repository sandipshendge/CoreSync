import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "next-themes";
import { CompanyProvider } from "./Context/CompanyProvider";
import { CustomerProvider } from "./Context/CustomerProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <CompanyProvider>
            <CustomerProvider>
              <TooltipProvider>
                <App />
              </TooltipProvider>
            </CustomerProvider>
          </CompanyProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
