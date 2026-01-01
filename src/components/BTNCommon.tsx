import React, { useCallback } from 'react'
import { Button } from '@heroui/react'
import { useLoginStore } from '@/stores/login'
import { toast } from 'sonner'
import { useMemberStore } from '@/stores/member'

interface BTNLoginInterFace {
    needAuthen: boolean;
    children: React.ReactNode
    onPress?: () => void
    className: string
    startContent?: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    isIconOnly?: boolean
    Disable?: boolean,
    isLight?: boolean
}

export function BTNCommon({ children, onPress, className, startContent, size = 'md', isIconOnly,isLight = false,  Disable = false, needAuthen = false }: BTNLoginInterFace) {
    const { isAuthenticated } = useMemberStore()

    const handleClick = useCallback(() => {
        if (needAuthen) {
            if (isAuthenticated) {
                onPress?.()
            } else {
                toast.error("กรุณาเข้าสู่ระบบก่อนทำรายการ")
            }
        } else {
            onPress?.()
        }
    }, [isAuthenticated])

    return (
        <Button
            size={size}
            startContent={startContent}
            className={className}
            isDisabled={Disable}
            onPress={onPress ? handleClick : undefined}
            isIconOnly={isIconOnly}
            variant={isLight ? 'light': 'solid'}
        >
            {children}
        </Button>
    )
}
