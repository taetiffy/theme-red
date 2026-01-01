import { Suspense, lazy } from "react";
const Client = lazy(() => import('./client'))

export const dynamic = "force-dynamic";

export default async function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Client />
        </Suspense>
    );
}
