import React from 'react'
import { Card, CardBody, Image, Button } from "@heroui/react"

interface Game{
    image:string
    name:string
}
interface CameCardInterFace{
    game:  Game
    isTop?: boolean
}

export const GameCard = ({
        game,
        isTop = false,
    }: CameCardInterFace) => (
        <Button className='h-full w-full hover:scale-105' radius='lg' isIconOnly variant='light'>
            <Image 
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover"
            />
        </Button>
    );