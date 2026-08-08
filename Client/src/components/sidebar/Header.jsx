import React from "react";
import { FaShieldAlt } from "react-icons/fa";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import logoImg from "@/assets/CoreSync.png";

const Header = () => {
  return (
    <SidebarHeader  className="bg-gray-100 dark:bg-zinc-800" >
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 min-w-0 w-full  ">
            <img
              src={logoImg}
              alt="CoreSync Logo"
              className="h-9 w-9 rounded-md object-contain shrink-0"
            />
            <div className="grid text-left text-sm leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
              <span className="truncate font-bold text-sidebar-foreground flex items-center gap-1.5">
                CoreSync
                <FaShieldAlt className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
              </span>

              <span className="truncate text-[11px] text-sidebar-foreground/60 font-medium">
                Enterprise Suite
              </span>
            </div>
            <div className="ml-auto flex items-center">
              <SidebarTrigger className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground" />
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default Header;