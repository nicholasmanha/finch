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
        {/* Sidebar extends vertically the full height of the page */}
        <HubSidebar routes={routes} />
        {/* Header is to the right of the sidebar, extends to the right end of the page */}
        <HubHeader title={headerTitle} logoUrl={headerLogoUrl}/>
        {/* Main fills out the bottom right area remaining on the page */}
        <HubMainContent routes={routes} />
    </div>
)
  }
