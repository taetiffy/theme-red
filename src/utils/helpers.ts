import { bankLists } from "@/variables/BankSelect";

export function checkLeapYear(year: number): boolean {
    // https://th.wikipedia.org/wiki/ปีอธิกสุรทิน
    // If this year is a leap year February has 29 days.
    return ((0 == year % 4) && (0 != year % 100) || (0 == year % 400))
}

export function getNumberOfDays(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
}

export function formatTimeZone(date: number | Date, timeZone: 'Asia/Bangkok'): string {
    const formatter = new Intl.DateTimeFormat('en-US', { timeZone: timeZone });
    return formatter.format(date)
}

export function findBankWithCode(code: string) {
    return bankLists.find((ba) => ba.code === code);
}
