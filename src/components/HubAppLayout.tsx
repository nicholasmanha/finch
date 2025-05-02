import HubHeader from "@/components/HubHeader";
import HubMainContent from "@/components/HubMainContent";
import HubSidebar from "@/components/HubSidebar";
import { cn } from "@/lib/utils";

import { RouteItem } from "@/types/navigationRouterTypes";

export type HubAppLayoutProps = {
    routes: RouteItem[];
    headerTitle?: string;
    headerLogoUrl?: string;
    mainContentClassName?: string;
    headerClassName?: string;
    sidebarClassName?: string;
    }
export default function HubAppLayout ( {
    routes,
    headerTitle,
    headerLogoUrl,
    mainContentClassName, 
    headerClassName,
    sidebarClassName
  }: HubAppLayoutProps) {

return (
    <div className="grid grid-cols-[6rem_1fr] grid-rows-[auto_1fr] h-screen">
        <HubSidebar 
            routes={routes}
            className={sidebarClassName} 
        />
        <HubHeader 
            title={headerTitle} 
            logoUrl={headerLogoUrl}
            className={headerClassName}
        />
        <HubMainContent 
            routes={routes}
            className={cn("h-[calc(100vh-4rem)]", mainContentClassName)} 
        />
    </div>
)
  }
