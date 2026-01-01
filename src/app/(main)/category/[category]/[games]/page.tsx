import { Suspense } from "react";
import React from "react";

let Client = React.lazy(() => import("./client"))

type Params = Promise<{ category: string, games: string }>

export default async function Page ({ params }: { params: Params }) {

    const { category, games } = await params;
    return (
        <Suspense fallback={<p>Loading...</p>}>                
            <Client params={category} game={games} />
        </Suspense>
    );

}
