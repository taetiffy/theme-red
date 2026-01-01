import { Card, CardBody, Button } from "@heroui/react";
import { TruemoneyWalletHook, TruemoneyWalletHookProps } from "@/types/transaction";
import { useCallback } from "react";
import { IoCopy } from "react-icons/io5";
import { copyToClipboard } from "@/hooks/copyToCB";
import Image from "next/image";
import { findBankWithCode } from "@/utils/helpers";

const TrueMoneyWalletCard = ({ data }: {data: Array<TruemoneyWalletHook>})=>{
    return(
        <>
            {
                data.map((item, idx)=>{
                    return(
                        <TrueMoneyWallet account_num={item.number} name={item.name} key={idx} ></TrueMoneyWallet>
                    )

                })
            }
            <div className="text-xs text-red-500 flex justify-center">*โอนเงินเข้าบัญชีนี้เท่านั้น! ระบบจะเติมเครดิตโดยอัติโนมัติ</div>
        </>
    );
}

const TrueMoneyWallet = ({ account_num, name}: TruemoneyWalletHookProps)=>{
    const bank = findBankWithCode("999");
    if (!bank) return
    return (
            <div className={`p-6 my-2 rounded-2xl bg-linear-to-br ${bank.gradient} text-white shadow-lg flex flex-col justify-between`}>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <img
                            src={bank.image}
                            alt="bank logo"
                            className="w-10 h-10 object-contain"
                        />
                        <div>
                            <h3 className="font-bold text-lg">{bank.name}</h3>
                            <p className="text-sm opacity-90">{name}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button className="w-10 h-10 bg-white/20 rounded-full" onPress={()=>copyToClipboard(account_num)} isIconOnly={true}><IoCopy/></Button>
                    </div>
                </div>
                <div className="my-4">
                    <p className="text-3xl font-bold tracking-wider">
                        {account_num}
                    </p>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-10 rounded-full -z-10"></div>
                <div className="absolute top-6 right-6 w-8 h-8 bg-white bg-opacity-5 rounded-full -z-10"></div>
            </div>
    )
}

export default TrueMoneyWalletCard;