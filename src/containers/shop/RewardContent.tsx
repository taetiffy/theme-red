"use client";

import React from "react";
import { Card, CardBody, Button, Image } from "@heroui/react";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchShopItemsService } from "@/services/shop";
import { useShop } from "@/hooks/shop";
import { ShopItem } from "@/types/shop";
import { formatCurrency } from "@/utils/format.utils";

function formatPriceWithType(data: ShopItem) {
  if (data.priceType === "CREDIT") {
    return `${formatCurrency(data.price)} เครดิต`;
  }
  return `${data.price} เพชร`;
}

export const RewardContent = () => {
  const { data } = useFetchData(fetchShopItemsService);
  const { buyItem } = useShop();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
      {data?.map((shop) => (
        <Card
          key={shop.id}
          className="group bg-[#0E0D0D] border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
        >
          <CardBody className="p-3 flex flex-col h-full">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/30">
              {shop.item.item_img && (
                <Image
                  src={shop.item.item_img}
                  alt={shop.item.name}
                  removeWrapper
                  className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                />
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-col flex-1 justify-between mt-3 gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-red-400 font-medium">
                  {formatPriceWithType(shop)}
                </span>

                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {shop.item.name}
                </h3>
              </div>

              <Button
                size="sm"
                className="Btn2 w-full mt-2"
                onPress={() => buyItem(shop.id, 1)}
              >
                แลกไอเทม
              </Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
