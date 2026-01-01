import { Suspense, lazy } from "react";
const Client = lazy(() => import('./client'))

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
        <Client/>
    </Suspense>
  );
}
