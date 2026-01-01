"use client"

import { Spinner } from "@heroui/react";

export default function CommonLoading({ index = 0 }: { index?: number }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            style={{ zIndex: 50 + index }}
        >
            <Spinner size="lg" color="primary" />
        </div>
    );
}