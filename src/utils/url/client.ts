"use client"

import { parse } from "tldts";

export function getClientBaseUrl() {
    const url = new URL(window.location.href);
    const { protocol, port, hostname } = url;
    if (["3000", "3001"].includes(port)) {
        return "http://localhost:5000";
    }
    const parsed = parse(hostname);
    const apiHost = `${parsed.subdomain}-api.${parsed.domainWithoutSuffix}.${parsed.publicSuffix}`;
    return `${protocol}//${apiHost}`;
}

export function getHostname() {
    const url = new URL(window.location.href);
    const { port, hostname } = url;
    if (["3000", "3001"].includes(port)) {
        return "localhost:5000";
    }
    const parsed = parse(hostname);
    return `${parsed.domainWithoutSuffix}.${parsed.publicSuffix}`;
}