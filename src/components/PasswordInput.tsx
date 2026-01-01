'use client'
import React, { useState } from 'react'
import { Input } from '@heroui/input'

interface PasswordInterFace {
    name?:string;
    title?:string;
    isRequired?:boolean
}

export function PasswordInput({ name = "password", title= 'รหัสผ่าน', isRequired = true }:PasswordInterFace) {
    const [ seePass, setSeePass ] = useState<boolean>(true)
    return (
        <>
            <Input
                isRequired={isRequired}
                type={seePass ? 'password': 'text'}
                minLength={6}
                endContent={
                    <div onClick={() => setSeePass(!seePass)} className=' cursor-pointer'>
                        {seePass ? (
                            <i className="fa-solid fa-eye"></i>
                        ):
                        (
                            <i className="fa-solid fa-eye-slash"></i>
                        )
                        }
                    </div>
                }
                errorMessage={({validationDetails}) => {
                    if(validationDetails.tooShort){
                        return "รหัสผ่านอย่างน้อย 6 ตัว"
                    }
                }}
                label = {title}
                name={name}
                placeholder={`กรอก${title}`}
                variant='faded'
                labelPlacement='outside'
            />
        </>
    )
}
