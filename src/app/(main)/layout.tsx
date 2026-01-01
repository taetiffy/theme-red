import React from 'react'
import CommonLayout from '@/components/layout/CommonLayout'

export default function PLaylayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CommonLayout>
            {children}
        </CommonLayout>
    )
}
