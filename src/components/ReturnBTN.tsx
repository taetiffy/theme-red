'use client'
import React, {useState, useEffect} from 'react'
import {Button} from '@heroui/react'
import { useRouter } from "next/navigation";
import { isLightColor } from "@/utils/lightColor";

export function ReturnBTN() {
  const router = useRouter()
  const [color1, setColor1] = useState('');
  useEffect(() => {
      const navbarColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-color')
          .trim();
      setColor1(navbarColor);
  }, []);
  return(
    <Button
        radius="full"
        onPress={() => router.push("/")}
        isIconOnly
        className={`${isLightColor(color1) && 'mini_navbar_bgColor_light'} flex items-center justify-center`}
    >
        <i className="fa-solid fa-chevron-left text-(--text-color)"></i>
    </Button>
  )
}
