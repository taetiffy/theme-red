import { LootBoxCardProps } from "@/types/LootBoxcard";

export const lootBoxData: LootBoxCardProps[] = [
  {
    image: "/icons/gold.png",
    title: "กล่องทอง",
    subtitle: "รางวัลสุดพิเศษ",
    buttonText: "เปิดกล่อง",
    onOpen: () => {
      console.log("เปิดกล่องทอง");
    }
  },
  {
    image: "/icons/diamond.gif",
    title: "กล่องเพชร",
    subtitle: "รางวัลหายาก",
    buttonText: "เปิดกล่อง",
    onOpen: () => {
      console.log("เปิดกล่องเพชร");
    }
  },
  {
    image: "/icons/gold.png",
    title: "กล่องเงิน",
    subtitle: "รางวัลดี",
    buttonText: "เปิดกล่อง",
    onOpen: () => {
      console.log("เปิดกล่องเงิน");
    }
  }
];