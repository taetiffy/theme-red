import { NavInterFace } from "@/types/sidebar"

export const NavigateSideBar: NavInterFace[] = [
    // {
    //     icon: `fa-duotone fa-solid fa-coins` ,
    //     title:"เครดิตฟรี",
    //     link:"",
    //     modal: "creditFree"
    // },
    // {
    //     icon:"fa-regular fa-piggy-bank",
    //     title:"คืนยอดเสีย",
    //     link:"",
    //     modal:"cashback"
    // },
    // {
    //     icon:"fa-solid fa-badge-percent",
    //     title:"คอมมิชชั่น",
    //     link:"",
    //     modal:"commission"
    // },
    {
        icon: "fa-solid fa-user",
        title: 'โปรไฟล์',
        link: '/profile',
        modal: null,
        needAuthen: true
    },
    {
        icon: "fa-solid fa-treasure-chest",
        title: 'ภารกิจ',
        link: '/mission',
        modal: null,
        needAuthen: true
    },
    {
        icon: "fa-duotone fa-solid fa-user-group",
        title: "แนะนำเพื่อน",
        link: "/affiliates",
        modal: null,
        needAuthen: true
    },
    {
        icon: "fa-duotone fa-solid fa-dharmachakra",
        title: "กงล้อ",
        link: "/wheel",
        modal: null,
        needAuthen: true
    },
    {
        icon: "fa-solid fa-star",
        title: "รับเพชรฟรี",
        link: "",
        modal: "reward",
        needAuthen: true
    },
    {
        icon: "fa-solid fa-tickets-perforated",
        title: "กรอกโค้ด",
        link: "",
        modal: "coupon",
        needAuthen: true
    },
    {
        icon: "fa-solid fa-megaphone",
        title: "รับโปรโมชัน",
        link: "/promotion",
        modal: null,
        needAuthen: true
    },
    {
        icon: "fa-solid fa-gift",
        title: "กล่องสุ่ม",
        link: "/randombox",
        modal: null,
        needAuthen: true
    },
    {
        icon: "fa-duotone fa-solid fa-calendar-check",
        title: "เช็คอินประจำวัน",
        link: "",
        modal: "checkIn",
        needAuthen: true
    },
    {
        icon: "fa-solid fa-store",
        title: "ร้านค้า",
        link: "/shop",
        modal: null,
        needAuthen: true
    },
    {
        icon: "fa-solid fa-ranking-star",
        title: "Ranking",
        link: "/ranking",
        modal: null,
        needAuthen: true
    },
    {
        icon: "fa-solid fa-bag-shopping",
        title: "กระเป๋า",
        link: "",
        modal: "backpack",
        needAuthen: true
    },
]
