import { formatWithOutCurrency } from "@/utils/format.utils";

export function Barmoney({ value, isLight }: { value: number, isLight:boolean }) {
    return (
        <div className={`${isLight ? 'mini_navbar_bgColor_light': 'mini_navbar_bgColor_dark' } border border-white/5 rounded-lg p-4 mb-5 flex justify-between`}>
            <h1 className="text-(--text-color)">ยอดเงินคงเหลือ</h1>
            <h1 className="text-lg font-semibold text-red-800"> {formatWithOutCurrency(value)} ฿</h1>
        </div>
    )
}
