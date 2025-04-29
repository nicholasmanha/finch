import HubHeader from "@/components/HubHeader";
import HubMainContent from "@/components/HubMainContent";
import HubSidebar from "@/components/HubSidebar";

import { RouteItem } from "@/types/navigationRouterTypes";

export type HubAppLayoutProps = {
    routes: RouteItem[];
    headerTitle?: string;
    headerLogoUrl?: string;
    }
export default function HubAppLayout ( {
    routes,
    headerTitle,
    headerLogoUrl,
  }: HubAppLayoutProps) {

return (
    <div className="grid grid-cols-[6rem_1fr] grid-rows-[auto_1fr] h-screen">
        <HubSidebar routes={routes} />
        <HubHeader title={headerTitle} logoUrl={headerLogoUrl}/>
        <HubMainContent 
            routes={routes}
            className="h-[calc(100vh-4rem)]" 
        />
    </div>
)
  }
