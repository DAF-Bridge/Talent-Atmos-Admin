"use client";

import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import OrgSwitcher from "./org-switcher";
import NavUser from "./nav-user";
import { NavMain } from "./nav-main";
import { mainLabel, mainMenu } from "./config/main-config";
import { adminLabel, adminMenu } from "./config/admin-config";

export function AppSidebar() {
  const { state } = useSidebar();
  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="border-none">
        <SidebarHeader className="flex items-end gap-4 mt-2">
          <OrgSwitcher orgName="Acme Inc." role="Admin" state={state} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={mainMenu} label={mainLabel} />
          <NavMain items={adminMenu} label={adminLabel} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser state={state} />
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
