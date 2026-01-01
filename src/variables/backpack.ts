import { BackpackItem } from "@/types/backpack";

export const mockBackpackItems: BackpackItem[] = [
  {
    id: "1",
    name: "เพชร",
    image: "/icons/diamond.gif",
    quantity: 7,
    rarity: "legendary",
    description: "รับเพชรฟรีทุกวัน",
    category: "currency",
    value: 1000
  },
  // {
  //   id: "2", 
  //   name: "ทอง",
  //   image: "/icons/gold.png",
  //   quantity: 2500,
  //   rarity: "epic",
  //   description: "ทองคำแท้สำหรับซื้อไอเทม ใช้เป็นสกุลเงินหลักในเกม",
  //   category: "currency",
  //   value: 100
  // },
  // {
  //   id: "3",
  //   name: "กุญแจมหาสมบัติ",
  //   image: "https://cdn-icons-png.flaticon.com/512/1076/1076875.png",
  //   quantity: 5,
  //   rarity: "rare",
  //   description: "กุญแจสำหรับเปิดหีบสมบัติลึกลับ อาจได้ไอเทมหายาก",
  //   category: "consumable",
  //   value: 500
  // },
  // {
  //   id: "4",
  //   name: "โอเวอร์โลด",
  //   image: "https://cdn-icons-png.flaticon.com/512/2913/2913465.png",
  //   quantity: 3,
  //   rarity: "epic",
  //   description: "ไอเทมเพิ่มพลังพิเศษ เพิ่มความแรงในการต่อสู้เป็นเวลา 1 ชั่วโมง",
  //   category: "consumable",
  //   value: 750
  // },
  // {
  //   id: "5",
  //   name: "เหรียญทอง",
  //   image: "https://cdn-icons-png.flaticon.com/512/2904/2904947.png",
  //   quantity: 10,
  //   rarity: "common",
  //   description: "เหรียญสำหรับใช้ในเกม สามารถแลกสินค้าทั่วไปได้",
  //   category: "currency",
  //   value: 50
  // },
  // {
  //   id: "6",
  //   name: "ดาบเวทมนตร์",
  //   image: "https://cdn-icons-png.flaticon.com/512/2909/2909937.png",
  //   quantity: 1,
  //   rarity: "legendary",
  //   description: "ดาบที่มีพลังเวทมนตร์แฝง เพิ่มพลังโจมตี +50",
  //   category: "equipment",
  //   value: 2000
  // },
  // {
  //   id: "7",
  //   name: "ยาฟื้นฟู",
  //   image: "https://cdn-icons-png.flaticon.com/512/2913/2913642.png",
  //   quantity: 25,
  //   rarity: "common",
  //   description: "ยาสำหรับฟื้นฟูพลังชีวิต เพิ่ม HP +100",
  //   category: "consumable",
  //   value: 25
  // },
  // {
  //   id: "8",
  //   name: "คริสตัลมานา",
  //   image: "https://cdn-icons-png.flaticon.com/512/2909/2909998.png",
  //   quantity: 15,
  //   rarity: "rare",
  //   description: "คริสตัลที่เต็มไปด้วยพลังเวทมนตร์ เพิ่ม MP +200",
  //   category: "material",
  //   value: 300
  // }
];

export const backpackConfig = {
  totalSlots: 25,
  maxStackSize: 999,
  categories: ["all", "consumable", "equipment", "material", "currency"]
};

export const rarityColors = {
  common: "border-gray-400 bg-gray-400/10 text-gray-300",
  rare: "border-blue-400 bg-blue-400/10 text-blue-400",
  epic: "border-purple-400 bg-purple-400/10 text-purple-400",
  legendary: "border-yellow-400 bg-yellow-400/10 text-yellow-400"
};