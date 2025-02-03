"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobDisplay from "@/features/job-manage/components/job-display";
import JobList from "@/features/job-manage/components/job-list";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@/i18n/routing";
import { Search } from "lucide-react";
import React from "react";
import { BiEdit } from "react-icons/bi";

export default function JobManagementPage() {
  const defaultLayout = [35, 65];
  const isMobile = useIsMobile();
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel
        className="min-w-[250px]"
        defaultSize={defaultLayout[0]}
        minSize={25}
      >
        <div className="h-full overflow-y-auto px-2">
          <Tabs defaultValue="all">
            <div className="flex flex-col justify-start items-start gap-2 pt-4 mb-2">
              <div className="flex justify-between items-center gap-2 w-full">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8 " />
                </div>
                <Link href={`/job-management/add`}>
                  <Button>
                    <BiEdit />
                    Create
                  </Button>
                </Link>
              </div>

              <TabsList>
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="live"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Live
                </TabsTrigger>
                <TabsTrigger
                  value="unpublished"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Draft
                </TabsTrigger>
                <TabsTrigger
                  value="Past"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Past
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="m-0">
              <JobList />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <JobList />
            </TabsContent>
          </Tabs>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className={isMobile ? "hidden" : ""} />
      <ResizablePanel
        defaultSize={defaultLayout[1]}
        minSize={30}
        className={isMobile ? "hidden" : ""}
      >
        <div className="h-full overflow-y-auto p-2">
          <JobDisplay />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
