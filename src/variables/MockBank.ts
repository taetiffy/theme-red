import type { BankAccount } from "@/types/transaction";

export const bankAccounts: BankAccount[] = [
    {
      id: "1",
      bankName: "ธนาคารกสิกรไทย",
      bankCode: "KBANK",
      accountNumber: "1234567890",
      accountName: "นาย สมชาย ใจดี",
      isActive: true,
    },
    {
      id: "2", 
      bankName: "ธนาคารไทยพาณิชย์",
      bankCode: "SCB",
      accountNumber: "0987654321",
      accountName: "นาง สมหญิง ใจงาม",
      isActive: true,
    },
    {
      id: "3",
      bankName: "ธนาคารกรุงเทพ",
      bankCode: "BBL",
      accountNumber: "5555555555",
      accountName: "นาย ทดสอบ ระบบ",
      isActive: false,
    },

  ];

  
  export const trueAccounts: BankAccount[] = [
    {
      id: "1",
      bankName: "TrueMoney",
      bankCode: "TrueMoney",
      accountNumber: "0987654321",
      accountName: "นาง สมหญิง ใจงาม",
      isActive: true,
    },
    {
      id: "2", 
      bankName: "TrueMoney",
      bankCode: "TrueMoney",
      accountNumber: "0987654321",
      accountName: "นาง สมหญิง ใจงาม",
      isActive: true,
    },
    {
      id: "3",
      bankName: "TrueMoney",
      bankCode: "TrueMoney",
      accountNumber: "5555555555",
      accountName: "นาย ทดสอบ ระบบ",
      isActive: false,
    },
  ];

  
export const bankAccountsWithdraw: BankAccount[] = [
  {
    id: "1",
    bankName: "ธนาคารกสิกรไทย",
    bankCode: "KBANK",
    accountNumber: "1234567890",
    accountName: "นาย สมชาย ใจดี",
    isActive: true,
  },
  {
    id: "2", 
    bankName: "ธนาคารไทยพาณิชย์",
    bankCode: "SCB",
    accountNumber: "0987654321",
    accountName: "นาง สมหญิง ใจงาม",
    isActive: true,
  },
  {
    id: "3",
    bankName: "ธนาคารกรุงเทพ",
    bankCode: "BBL",
    accountNumber: "5555555555",
    accountName: "นาย ทดสอบ ระบบ",
    isActive: false,
  },

];
