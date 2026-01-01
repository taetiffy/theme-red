"use client"
import React from 'react'
import { InputOtp } from '@heroui/react';

export function InputOTP() {
    return (
        <div className='flex justify-center w-full'>
            <InputOtp length={6} size='lg' color='warning' variant='bordered' isRequired name="phoneOTP" />
        </div>
    )
}