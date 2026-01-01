import React from "react";
import Image from 'next/image'
import { Button } from "@heroui/react";
import { PopularProvider, CategoryProvider } from "@/types/games";
import { redirect } from "next/navigation";
import { useMemberStore } from "@/stores/member";
import { toast } from 'sonner'
import { useShareStore } from "@/stores/share";

interface CameCardInterFace {
    game: PopularProvider;
    isTop?: boolean;
}

interface TopCameCardInterFace {
    game: PopularProvider;
    isTop?: boolean;
    amount: number;
}

interface CardInterFace {
    game: CategoryProvider;
    category: string;
    isTop?: boolean;
    amount?: number;
    topGame?: string[]
}

export const ProviderCard = ({ game }: CameCardInterFace) => {
  const { state } = useShareStore()

  const handleClick = () => {
    redirect(`/category/${game.category}/${game.product_id}`)
  }
  return(
      <Button
          // className="h-[180px] max-w-[150px] w-full hover:scale-105 relative !p-0"
          className="h-full w-full hover:scale-105 relative !p-0"
          radius="lg"
          isIconOnly
          variant="light"
          onPress={handleClick}
      >
          {state?.gameStat?.game_name && (
              <>
                  <div className="absolute z-21 bottom-2 text-xs w-full line-clamp-1 text-center">
                      {game.product_name}
                  </div>
                  <div className="absolute z-20 bottom-0 w-full h-1/2 bg-linear-to-t from-black to-transparent rounded-b-xl"></div>
              </>
          )}
          <Image src={game.img} alt={game.product_name} width={150} height={180} className="w-full h-full object-contain" />
      </Button>
  )
};

export const TopProviderCard = ({ game, amount }: TopCameCardInterFace) => {
  const { state } = useShareStore()

  const handleClick = () => {
    redirect(`/category/${game.category}/${game.product_id}`)
  }
  return(
      <Button
          // className="h-[180px] max-w-[150px] w-full hover:scale-105 relative !p-0"
          className="h-full w-full hover:scale-105 relative !p-0"
          radius="lg"
          isIconOnly
          variant="light"
          onPress={handleClick}
      >
          {state?.gameStat?.game_name && (
              <>
                  <div className="absolute z-21 bottom-2 text-xs w-full line-clamp-1 text-center">
                      {game.product_name}
                  </div>
                  <div className="absolute z-20 bottom-0 w-full h-1/2 bg-linear-to-t from-black to-transparent rounded-b-xl"></div>
              </>
          )}
          <div className={' absolute top-0 right-0 Btn2 text-white px-1 py-1 flex flex-col items-center *:text-xs'}>
            <span>Top</span>
            <span>{ amount }</span>
          </div>
          <Image src={game.img} alt={game.product_name} width={150} height={180} className="w-full h-full object-contain" />
      </Button>
  )
};

export const CategoryProviderCard = ({ game, category, amount, topGame }: CardInterFace) => {
  const { isAuthenticated } = useMemberStore()
  const { state } = useShareStore()
  const handleClick = () => {
    if(isAuthenticated){
      redirect(`/category/${category}/${game.product_id}`)
    }else{
      toast.error("กรุณาเข้าสู่ระบบก่อนทำรายการ");
    }
  }
  const gg = topGame?.map(h => h.toUpperCase())
  return(
    <Button
        // className="h-[170px] max-w-[140px] w-full hover:scale-105 relative"
        className="h-full w-full hover:scale-105 relative"
        radius="none"
        isIconOnly
        variant="light"
        onPress={handleClick}
    >
        {state?.gameStat?.game_name && (
            <>
                <div className="absolute z-21 bottom-2 text-xs w-full line-clamp-1 text-center">
                    {game.product_name}
                </div>
                <div className="absolute z-20 bottom-0 w-full h-1/2 bg-linear-to-t from-black to-transparent rounded-b-xl"></div>
            </>
        )}
        {amount && gg?.includes(game.product_id) && (
          <div className={'absolute top-0 right-0 Btn2 text-white px-1 py-1 flex flex-col items-center *:text-xs'}>
            <span>Top</span>
            <span>{amount}</span>
          </div>
        )}
        <Image src={game.img} alt={game.product_name} width={140} height={190} className="w-full h-full object-cover" />
    </Button>
)
};
