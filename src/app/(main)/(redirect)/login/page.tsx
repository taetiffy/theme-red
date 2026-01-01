import React from "react";
import { Suspense } from "react";

// ป้องกัน error prerender-error
export const dynamic = "force-dynamic";

const Client = React.lazy(() => import("./client"));

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Client />
        </Suspense>
    );
}
