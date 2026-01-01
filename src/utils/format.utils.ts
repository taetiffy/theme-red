export const formatNumber = (number: number): string => {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + "B";
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    } else {
        return number.toString();
    }
}

export const formatDateTime = (date: Date): string => {
    date = new Date(date)
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


export const formatDateTimeShort = (datse: any): string => {
    const date = new Date(datse);
    const day = date.getDate();
    const monthNames = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear() + 543; // Convert to Thai year
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const thaiDate = `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}:${seconds}`;
    return thaiDate
}

export const formatString = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    }
    return text;
}

export const formatNumberTwo = (num?: number): string => {
    if (num === undefined) return "0.00";
    return parseFloat(num.toString()).toFixed(2);
}

export function formatCurrency(data: number, options: { locales?: string, currency?: string, minimumFractionDigits?: number, maximumFractionDigits?: number } = { locales: "th-TH", currency: "THB", minimumFractionDigits: 2, maximumFractionDigits: 2 }) {
    const precision = Math.pow(10, options.maximumFractionDigits || 2);
    const truncatedValue = Math.floor(data * precision) / precision;

    return new Intl.NumberFormat(options.locales, {
        style: "currency",
        currency: options.currency,
        minimumFractionDigits: options.minimumFractionDigits,
        maximumFractionDigits: options.maximumFractionDigits,
    }).format(truncatedValue);
}

export function formatWithOutCurrency(data: number, options: { locales?: string, minimumFractionDigits?: number, maximumFractionDigits?: number } = { locales: "th-TH", minimumFractionDigits: 2, maximumFractionDigits: 2 }) {
    const precision = Math.pow(10, options.maximumFractionDigits || 2);
    const truncatedValue = Math.floor(data * precision) / precision;

    return new Intl.NumberFormat(options.locales, {
        style: "decimal",
        minimumFractionDigits: options.minimumFractionDigits,
        maximumFractionDigits: options.maximumFractionDigits,
    }).format(truncatedValue);
}

export function formatZeroFloting(num: number) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export const formatDateTimeShortThai = (datse: any): string => {
    const date = new Date(datse);
    const day = date.getDate();
    const monthNames = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear() + 543; // Convert to Thai year
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const thaiDate = `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}:${seconds}`;
    return thaiDate
}