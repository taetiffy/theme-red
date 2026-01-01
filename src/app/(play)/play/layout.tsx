import GameLayout from '@/components/layout/GameLayout';
import React from 'react'

export default function PLaylayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GameLayout>
            {children}
        </GameLayout>
    )
}
