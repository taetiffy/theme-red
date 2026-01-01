import {Reward, Credit, Cash} from '@/types/shop'
export const rewardItems: Reward[] = [
    {
        id: 1,
        title: "150 เครดิต",
        price: "1,499 แต้ม",
        image: "https://d3v6iwqdidgccc.cloudfront.net/PLAY97/shop-item/1739277959015074524ghOpu5MdHY/4.png",
        description: "SPECIAL OFFER",
        buttonText: "แลกแต้ม",
    },
];

export const creditItems:Credit[] = [
    {
        id: 1,
        title: "100 เครดิต",
        price: "500 แต้ม",
        buttonText: "แลกแต้ม",
    },
    {
        id: 2,
        title: "500 เครดิต", 
        price: "2,000 แต้ม",
        buttonText: "แลกแต้ม",
    },
    {
        id: 3,
        title: "1,000 เครดิต",
        price: "3,500 แต้ม", 
        buttonText: "แลกแต้ม",
    }
];

export const cashItems:Cash[] = [
    {
        id: 1,
        title: "1,000 บาท",
        price: "10,000 แต้ม",
        buttonText: "แลกแต้ม",
    },
    {
        id: 2,
        title: "5,000 บาท",
        price: "45,000 แต้ม",
        buttonText: "แลก", 
    },
    {
        id: 3,
        title: "10,000 บาท",
        price: "80,000 แต้ม",
        buttonText: "แลกแต้ม",
    }
];