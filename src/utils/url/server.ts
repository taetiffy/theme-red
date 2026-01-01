"use server";

import { headers } from "next/headers";
import { parse } from "tldts";

export async function getServerBaseUrl() {
    try {
        const header = await headers();

        const host = header.get("host") || "localhost:3000";
        const protocol = header.get("x-forwarded-proto") || "http";
        const port = host.split(":")[1] || "";

        if (["3000", "3001"].includes(port)) {
            return "http://localhost:5000";
        }
        const parsed = parse(host);
        if (!parsed.subdomain) {
            return `${protocol}://${parsed.domainWithoutSuffix}.${parsed.publicSuffix}`;
        }
        const apiHost = `${parsed.subdomain}-api.${parsed.domainWithoutSuffix}.${parsed.publicSuffix}`;
        return `${protocol}://${apiHost}`;
    } catch (error) {
        throw new Error("Unable to determine server base URL");
    }
}