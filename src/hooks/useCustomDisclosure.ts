"use client";

import { useDisclosure, UseDisclosureProps } from "@heroui/react";
import { useRef, useState } from "react";

export type UseCustomDisclosureReturn<T = undefined, C = {}> = {
    state: UseDisclosureProps;
    data: T;
    setData: React.Dispatch<React.SetStateAction<T>>;
    closure: C; // เอาไว้ inject props (variable, fucn, etc...) นะจ๊ะ
    setClosure: (updater: React.SetStateAction<C>) => void;
};

export default function useCustomDisclosure<T = undefined, C = {}>(
    init?: T,
    initialClosure?: C
): UseCustomDisclosureReturn<T, C> {
    const state = useDisclosure();
    const [data, setData] = useState<T>(init ?? undefined as T);

    // ใช้ ref เก็บ closure ทั้งหมด
    const closureRef = useRef<C>((initialClosure ?? {}) as C);

    // ฟังก์ชันอัปเดต closure (ไม่ trigger re-render)
    const setClosure = (updater: React.SetStateAction<C>) => {
        if (typeof updater === 'function') {
            closureRef.current = (updater as (prev: C) => C)(closureRef.current);
        } else {
            closureRef.current = updater;
        }
    };

    return { state, data, setData, closure: closureRef.current, setClosure };
}

