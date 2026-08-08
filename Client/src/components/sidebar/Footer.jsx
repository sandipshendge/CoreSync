import React from "react";
import { useTheme } from "next-themes";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";

import {
  FaChevronUp,
  FaSignOutAlt,
  FaEnvelope,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useAuth } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { user, logout } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const toggleTheme = () => {
    console.log(resolvedTheme);
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <SidebarFooter className="bg-slate-100 border-t   dark:bg-zinc-900">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="text-white hover:bg-slate-200 dark:hover:bg-zinc-800 hover:text-white"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden  text-black dark:text-white  ">
                  <span className="truncate font-semibold">{user.firm}</span>

                  <span className="truncate text-xs text-slate-500">
                    {user.email}
                  </span>
                </div>

                <FaChevronUp className="ml-auto h-3.5 w-3.5 shrink-0 opacity-60 group-data-[collapsible=icon]:hidden text-black dark:text-white" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-1.5 shadow-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 p-2 text-left text-sm">
                  <Avatar className="h-9 w-9 rounded-lg">
                     <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-foreground">
                      {user.firm}
                    </span>

                    <span className="truncate text-xs text-muted-foreground flex items-center gap-1">
                      <FaEnvelope className="h-3 w-3 shrink-0" />
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center justify-between cursor-pointer py-2"
                onSelect={(e) => {
                  e.preventDefault();
                  toggleTheme();
                }}
              >
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <FaMoon className="h-4 w-4 text-indigo-400" />
                  ) : (
                    <FaSun className="h-4 w-4 text-amber-500" />
                  )}

                  <span className="text-sm font-medium">
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                </div>

                <Switch
                  checked={isDarkMode}
                  onClick={toggleTheme}
                  aria-label="Toggle Theme"
                />
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer font-medium"
              >
                <FaSignOutAlt className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default Footer;
