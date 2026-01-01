'use client'
import React, { useState, useEffect } from 'react'
import { Switch } from '@heroui/react'
import { isLightColor } from '@/utils/lightColor'

export function BonusSwitch({ value, onPress }: { value: boolean, onPress: () => void }) {
    const [color1, setColor1] = useState('');

    useEffect(() => {
        const navbarColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-color')
            .trim();
        setColor1(navbarColor);
    }, []);

    return (
        <div className={`${isLightColor(color1) ? 'light' : 'dark'}`}>
            <Switch
                size='sm'
                classNames={{
                  wrapper: value
  ? 'bg-gradient-to-r from-green-300 to-green-600 shadow-[0_0_12px_rgba(34,197,94,0.7)]'
  : 'bg-white/20'

                }}
                className='text-base text-(--text-color) '
                isSelected={value}
                onValueChange={onPress}
            >
                โบนัส
            </Switch>
        </div>
    )
}
