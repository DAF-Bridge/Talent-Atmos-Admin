import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminConsoleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1 min-w-0 p-2 bg-sidebar">
          <div className="relative flex flex-col h-full rounded-xl bg-white drop-shadow-sm p-4 border">
            <SidebarTrigger className="absolute top-2 left-2" />
            <section className="mt-8 flex-1 min-h-0">
              <div className="w-full break-words h-full">{children}</div>
            </section>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
