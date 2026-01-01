'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import { IoIosArrowForward } from "react-icons/io";
import { MoneyBar } from '@/containers/MoneyBar';
import { MarqueeText } from '@/components/ui/MarqueeText';
import { useShareStore } from '@/stores/share';
import { useMemberStore } from '@/stores/member';
import { isLightColor } from '@/utils/lightColor';

export function Minibar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { state: { announcement } } = useShareStore()
    const { isAuthenticated } = useMemberStore()
    const [color1, setColor1] = useState('');

    useEffect(() => {
        const navbarColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-color')
            .trim();
        setColor1(navbarColor);
    }, []);
    return (
        <>
            {isAuthenticated && (
              <div className={` absolute ${isOpen ? `w-0` : `xl:w-1/2 lg:w-3/4 w-full`} md:flex z-9999 hidden right-[0] transition-all duration-800 top-20 px-10 ${isLightColor(color1) ? 'mini_navbar_bgColor_light':'bg-[#0E0D0D]'} items-center h-16 rounded-bl-2xl `}>
                  <div>
                      <Button isIconOnly radius="full" onPress={() => setIsOpen(!isOpen)} className="bg-black absolute left-4 top-3 text-white ">
                          <div className={`transition-all duration-800 ${isOpen ? `rotate-180` : `rotate-0`} `}>
                              <IoIosArrowForward size={20} />
                          </div>

                      </Button>
                  </div>
                  <div className='pl-10 w-full'>
                      <MoneyBar cols={3} commission lost invite />
                  </div>
              </div>
            )}
            {/* <div className={`${isAuthenticated ? 'top-30 md:top-20': 'top-[60px]'} absolute -z-1 hidden xl:flex left-0 w-full h-8 items-center ${isLightColor(color1) ? `ann_navbar_bgColor_light`:`ann_navbar_bgColor_dark`} text-(--text-color)`}>
                <MarqueeText
                    text={announcement}
                    speed="normal"
                    direction="left"
                    className="text-sm px-4 w-full"
                    pauseOnHover={true}
                />
            </div> */}
        </>
    )
}
