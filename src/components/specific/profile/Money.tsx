"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Chip,
  Image,
} from "@heroui/react";
import { OnStartAnimate } from "@/components/OnStartAnimate";
import { useMemberStore } from "@/stores/member";
import { useShareStore } from "@/stores/share";
import { useBonus } from "@/hooks/bonus";
import { useModal } from "@/hooks/useModal";
import { formatWithOutCurrency } from "@/utils/format.utils";
import { useAffiliate } from "@/hooks/affiliate";

import { HiInformationCircle } from "react-icons/hi2";
import { FaWallet, FaGift, FaCoins, FaUser, FaArrowTrendDown } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";

type rankType = {
  name: string;
  sort: number;
  start: number;
  end: number;
  img: string;
  commission: number;
  commissionSlot: number;
  loss: number;
  lossSlot: number;
};

const DEFAULT: rankType = {
  name: "MEMBER",
  sort: 1,
  start: 0,
  end: 25,
  img: "/img/ranks/1.png",
  commission: 0,
  commissionSlot: 0,
  loss: 0,
  lossSlot: 0,
};

/** ✅ Header แบบเดียวกับ "โปรไฟล์สมาชิก" */
function ProfileLikeHeader({
  title,
  icon,
  right,
}: {
  title: string;
  icon: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="w-full px-4 py-3 bg-linear-to-r from-red-600/70 via-red-700/25 to-transparent">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/35 border border-white/10 backdrop-blur">
          <span className="text-yellow-300 text-sm">{icon}</span>
          <span className="text-sm font-semibold text-white tracking-wide">
            {title}
          </span>
          <HiInformationCircle className="text-white/70 text-lg" />
        </div>

        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
    </div>
  );
}

export function Money() {
  const { balance, rank, member, isAuthenticated } = useMemberStore();
  const { user_bonus } = useBonus();

  const {
    state: { rank: r },
  } = useShareStore();

  const { affiliateComs } = useAffiliate();
  const [ranking, setRank] = useState<rankType | undefined>();

  useEffect(() => {
    const ranks: rankType | undefined = r.find(
      (item: rankType) => item.start <= rank.level && item.end >= rank.level
    );

    if (ranks === undefined) {
      setRank(DEFAULT);
      return;
    }

    setRank(ranks);
  }, [member, isAuthenticated, r, rank.level]);

  return (
    <OnStartAnimate>
      <div className="grid grid-cols-6 gap-4">
        {/* mobile */}
        <div className="flex md:hidden col-span-6 flex-col sm:flex-row w-full gap-4">
          <div className="flex-2 order-2 flex flex-col gap-4">
            <MoneyNow value={balance.credit} />
            <Loss
              value={balance.returnLost}
              lossValue={balance.lossToDay}
              casinoRate={ranking?.loss || 0}
              slotRate={ranking?.lossSlot || 0}
            />
          </div>

          {user_bonus?.status && (
            <div className="flex-1 order-3">
              <PromotionCard
                img={user_bonus.bonus_img}
                name={user_bonus.name}
                desc={user_bonus.detail}
                status={user_bonus.status}
              />
            </div>
          )}
        </div>

        <AffCard value={affiliateComs?.commission || 0} />
        <BonusBag value={balance.bonus} />
        <Commission
          value={balance.returnCommission}
          value2={balance.comToDay}
          casinoRate={ranking?.commission || 0}
          slotRate={ranking?.commissionSlot || 0}
        />

        {/* desktop */}
        <div className="hidden md:flex col-span-6 flex-col sm:flex-row w-full gap-4">
          <MoneyNow value={balance.credit} />
          <Loss
            value={balance.returnLost}
            lossValue={balance.lossToDay}
            casinoRate={ranking?.loss || 0}
            slotRate={ranking?.lossSlot || 0}
          />
          {user_bonus?.status && (
            <PromotionCard
              img={user_bonus.bonus_img}
              name={user_bonus.name}
              desc={user_bonus.detail}
              status={user_bonus.status}
            />
          )}
        </div>
      </div>
    </OnStartAnimate>
  );
}

function AffCard({ value }: { value: number }) {
  const { handleClaimAffiliate } = useAffiliate();

  return (
    <Card className="h-full col-span-6 sm:col-span-3 md:col-span-2 CardBackground overflow-hidden">
      <CardHeader className="p-0">
        <ProfileLikeHeader
          title="แนะนำเพื่อน"
          icon={<FaUserFriends />}
          right={
            <Button
              isDisabled={!(value > 0)}
              onPress={handleClaimAffiliate}
              className="Btn2"
            >
              รับรายได้
            </Button>
          }
        />
      </CardHeader>

      <CardBody>
        <div className="flex items-center justify-between">
          <span className="text-2xl text-(--text-color)">
            ฿{formatWithOutCurrency(value)}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}

function PromotionCard({
  img,
  name,
  desc,
  status,
}: {
  img: string;
  name: string;
  desc: string;
  status: boolean;
}) {
  const { promotionDetail } = useModal();

  const openDetail = () => {
    promotionDetail.data.bonus_img = img;
    promotionDetail.data.detail = desc;
    promotionDetail.data.name = name;
    promotionDetail.data.status = status;
    promotionDetail.state.onOpen?.();
  };

  return (
    <Card className="w-full md:w-60 h-full md:h-[max-content] CardBackground overflow-hidden">
      <CardHeader className="p-0">
        <ProfileLikeHeader title="โปรโมชั่นที่รับอยู่" icon={<FaGift />} />
      </CardHeader>

      <CardBody className="flex flex-row sm:flex-col gap-2 w-full md:justify-center sm:items-center">
        <div className="w-40 sm:w-20 flex justify-center">
          <Image className="w-full object-contain" src={img} />
        </div>
        <div className="flex flex-col">
          <span className="sm:text-center text-xl text-white">
            {name}
          </span>
        </div>
      </CardBody>

      <CardFooter>
        <Button onPress={openDetail} className="w-full Btn2 z-40">
          ดูเพิ่มเติม
        </Button>
      </CardFooter>
    </Card>
  );
}

function BonusBag({ value }: { value: number }) {
  const { user_bonus, handleClearBonus } = useBonus();
  const { confirmpop } = useModal();

  confirmpop.setClosure((prev) => ({
    ...prev,
    confirm: handleClearBonus,
  }));

  const handleClick = ({ name }: { name: string }) => {
    confirmpop.setData({ name });
    confirmpop.state.onOpen?.();
  };

  return (
    <Card className="h-full col-span-6 sm:col-span-3 md:col-span-2 CardBackground overflow-hidden">
      <CardHeader className="p-0">
        <ProfileLikeHeader
          title="กระเป๋าโบนัส"
          icon={<FaGift />}
          right={
            <Button
              isDisabled={!user_bonus?.status}
              className="Btn2"
              onPress={() => handleClick({ name: "เคลียร์กระเป๋า" })}
            >
              เคลียร์กระเป๋า
            </Button>
          }
        />
      </CardHeader>

      <CardBody>
        <div className="flex items-center justify-between">
          <span className="text-2xl text-(--text-color)">
            ฿{formatWithOutCurrency(value)}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}

function Commission({
  value,
  value2,
  casinoRate,
  slotRate,
}: {
  value: number;
  value2: number;
  casinoRate: number;
  slotRate: number;
}) {
  const { handleClainCommission } = useAffiliate();

  return (
    <Card className="h-full col-span-6 sm:col-span-3 md:col-span-2 CardBackground overflow-hidden">
      <CardHeader className="p-0">
        <ProfileLikeHeader
          title="คอมมิชชั่น"
          icon={<FaCoins />}
          right={
            <div className="flex flex-col items-end gap-2">
              
              <Button
                isDisabled={!(value > 0)}
                onPress={handleClainCommission}
                className="Btn2"
              >
                รับคอมมิชชั่น
              </Button>
            </div>
          }
        />
      </CardHeader>

      <CardBody>
        <div className="flex items-center justify-between">
          <span className="text-2xl text-(--text-color)">
            ฿{formatWithOutCurrency(value)}
          </span>
        </div>

        <div className="flex gap-2 pt-3">
          <Chip size="sm" className="text-[10px] Btn2">
            Casino {casinoRate.toString()} %
          </Chip>
          <Chip size="sm" className="text-[10px] Btn2">
            Slot {slotRate.toString()} %
          </Chip>
          <Chip size="sm" className="Btn1">
                ยอดเล่นสะสมวันนี้ : {formatWithOutCurrency(value2)}
              </Chip>
        </div>
      </CardBody>
    </Card>
  );
}

function MoneyNow({ value }: { value: number }) {
  const { deposit, withdraw } = useModal();

  return (
    <Card className=" flex-1 h-[max-content] CardBackground overflow-hidden">
      <CardHeader className="p-0">
        <ProfileLikeHeader
          title="ยอดเงินคงเหลือ"
          icon={<FaWallet />}
          right={
            <div className="flex gap-2">
              <Button className="Btn1" onPress={deposit.state.onOpen}>
                ฝากเงิน
              </Button>
              <Button className="Btn2" onPress={withdraw.state.onOpen}>
                ถอนเงิน
              </Button>
            </div>
          }
        />
      </CardHeader>

      <CardBody className="flex flex-col gap-4">
        <div className="flex items-center justify-center">
          <span className="text-4xl text-(--text-color)">
            ฿{formatWithOutCurrency(value)}
          </span>
        </div>
      </CardBody>
    </Card>
  );
}

function Loss({
  value,
  lossValue,
  casinoRate,
  slotRate,
}: {
  value: number;
  lossValue: number;
  casinoRate: number;
  slotRate: number;
}) {
  const { handleClaimReturnLoss } = useAffiliate();

  return (
    <Card className="relative z-10  flex-1 h-[max-content] CardBackground overflow-hidden">
      <CardHeader className="p-0">
        <ProfileLikeHeader
          title={"คืนยอดเสีย"}
          icon={<FaArrowTrendDown />}
          right={
            <div className="flex items-end gap-2">
              
              <Button
                isDisabled={!(value > 0)}
                onPress={handleClaimReturnLoss}
                className="Btn2"
              >
                รับยอดเสีย
              </Button>
            </div>
          }
        />
      </CardHeader>

      <CardBody className="flex flex-col gap-4">
        <div className="flex items-center justify-center flex-col h-26 gap-2">
          <span className="text-4xl text-(--text-color)">
            ฿{formatWithOutCurrency(value)}
          </span>

          <div className="flex gap-2">
                <Chip size="sm" className="text-[10px] Btn2">
              Casino {casinoRate.toString()} %
            </Chip>
            <Chip size="sm" className="text-[10px] Btn2">
              Slot {slotRate.toString()} %
            </Chip>
            <Chip size="sm" className="Btn1">
                ยอดเล่นเสียวันนี้ : {formatWithOutCurrency(lossValue)}
              </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
