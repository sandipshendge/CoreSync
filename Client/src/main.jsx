import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { TooltipProvider } from "./components/ui/tooltip";
import { AuthProvider } from "./Context/AuthContext";
import { ThemeProvider } from "next-themes";
import { CompanyProvider } from "./Context/CompanyProvider";

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
            <TooltipProvider>
              <App />
            </TooltipProvider>
          </CompanyProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
