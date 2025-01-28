import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import EventList from "@/features/event-manage/EventList";
import React from "react";

export default function JobManagementPage() {
  const defaultLayout = [35, 65];
  return (
    <ResizablePanelGroup direction="horizontal" className="border-t h-full">
      <ResizablePanel defaultSize={defaultLayout[0]} minSize={25}>
        <div className="h-full overflow-y-auto">
          <EventList />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <div>JobCard</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
