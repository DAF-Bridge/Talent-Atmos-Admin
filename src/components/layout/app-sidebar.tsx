"use client";

import * as React from "react";
import {
  Box,
  Building,
  ChevronDown,
  ChevronUp,
  Plus,
  User2,
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/routing";

const data = {
  versions: ["1.0.0", "1.1.0", "2.0.0-beta"],
  navMain: [
    {
      title: "Management",
      items: [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        {
          title: "Employee Management",
          url: "/employee-management",
          icon: Users,
        },
        { title: "Career Management", url: "/job-management", icon: Briefcase },
        { title: "Event Management", url: "/event-management", icon: Calendar },
      ],
    },
    {
      title: "Admin",
      items: [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Org Management", url: "/org-management", icon: Building },
        { title: "Job Management", url: "/job-management", icon: Briefcase },
        { title: "Event Management", url: "/event-management", icon: Calendar },
      ],
    },
  ],
};

export function AppSidebar() {
  const { state } = useSidebar();
  return (
    <TooltipProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white">
                      <Box className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold truncate">Acme Inc</span>
                      <span className="text-xs text-muted-foreground truncate">
                        Enterprise
                      </span>
                    </div>
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`${
                    state === "collapsed"
                      ? "w-fit"
                      : "w-[--radix-dropdown-menu-trigger-width]"
                  }`}
                  align="start"
                >
                  <Link href="/org-list">
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <Building className="mr-2 h-4 w-4" />
                      <span>Switch Organization</span>
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/org-register">
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Create Organization</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {data.navMain.map((section) => (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton asChild>
                            <Link href={item.url} className="flex items-center">
                              {item.icon && (
                                <item.icon className="mr-2 h-4 w-4 shrink-0" />
                              )}
                              <span className="truncate">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          className={` ${
                            state === "collapsed" ? "block" : "hidden"
                          }`}
                        >
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 className="mr-2 h-4 w-4 shrink-0" />
                    <span className="truncate">Username</span>
                    <ChevronUp className="ml-auto h-4 w-4 shrink-0" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className={`w-[--radix-popper-anchor-width] ${
                    state === "collapsed" ? "ml-4" : ""
                  }`}
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Setting</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
