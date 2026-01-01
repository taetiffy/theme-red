"use client";

import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { useMemberStore } from "@/stores/member";
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

const PageContent = () => {
    const searchParams = useSearchParams();
    const ref = searchParams.get('ref');
    const router = useRouter();
    const { isAuthenticated } = useMemberStore();
    const { signup } = useModal();

    useEffect(() => {
        if (typeof window !== "undefined") {
            Cookies.set('ref', ref ? ref : "", { expires: 7 });
            if (signup.state.onOpen) signup.state.onOpen();
            router.replace("/");
        }
    }, [ref, isAuthenticated, signup, router]);

    return null;
};

export default PageContent;
