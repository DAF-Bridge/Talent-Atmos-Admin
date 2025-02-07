import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/i18n/routing";
import React from "react";
import { FiBox, FiPlus } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import { LuBuilding } from "react-icons/lu";

interface OrgSwitcherProps {
  orgName: string;
  role: string;
  state: "collapsed" | "expanded";
}

export default function OrgSwitcher({
  orgName,
  role,
  state,
}: Readonly<OrgSwitcherProps>) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-black text-white">
                <FiBox className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold truncate">{orgName}</span>
                <span className="text-xs text-muted-foreground truncate">
                  {role}
                </span>
              </div>
              <IoChevronDown className="ml-auto h-4 w-4 shrink-0" />
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
            <Link href="/my-organizations">
              <DropdownMenuItem className="hover:cursor-pointer">
                <LuBuilding className="mr-2 h-4 w-4" />
                <span>Switch Organization</span>
              </DropdownMenuItem>
            </Link>

            <Link href="/org-register">
              <DropdownMenuItem className="hover:cursor-pointer">
                <FiPlus className="mr-2 h-4 w-4" />
                <span>Create Organization</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
