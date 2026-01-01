"use client"
import React from 'react'
import { motion } from 'framer-motion';

export function OnStartAnimate({ children }: { children: React.ReactNode }) {
    return (
        <motion.div initial={{y:60, opacity:0}} animate={{y:0, opacity:1}} transition={{duration:1}}>
            {children}
        </motion.div>
    )
}