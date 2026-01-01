import { Suspense } from "react";
import React from "react";

let Client = React.lazy(() => import("./client"))

export default async function ({ params }: { params: Promise<{ category: string }> }) {

    const { category } = await params;
    return (
        <Suspense fallback={<p>Loading...</p>}>                
            <Client params={category}/>
        </Suspense>
    );

}
