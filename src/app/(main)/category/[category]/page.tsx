import { Suspense } from "react";
import React from "react";

const Client = React.lazy(() => import("./client"))

export default async function ({ params }: { params: Promise<{ category: string }> }) {

    const xparams = await params;
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Client params={xparams}/>
        </Suspense>
    );

}
