import { Routes, Route } from "react-router";

import { RouteItem } from "@/types/navigationRouterTypes";

type HubMainContentProps = {
    routes: RouteItem[];
}
export default function HubMainContent({routes}: HubMainContentProps) {
    return (
        <main className="bg-sky-900">
            <Routes>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </main>
    )
}