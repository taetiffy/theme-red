"use client";
import React, { useMemo } from "react";
import { Card, CardBody, Button, Input, Image, Form } from "@heroui/react";
import { FaLine, FaFacebook, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiMessage2Fill } from "react-icons/ri";
import { BiSolidCopy } from "react-icons/bi";
import { toast } from "sonner";
import styles from "@/styles/affiliate.module.css";
import { useMemberStore } from "@/stores/member";
import { getRevenueShareService } from "@/services/affiliate";
import { useFetchData } from "@/hooks/useFetchData";


export function AffiliateHeader() {

    const { member } = useMemberStore();

    const { data, loading } = useFetchData(getRevenueShareService)

    const affiliateLink = useMemo(() => {
        const affiliateCode = member?.affiliateCode;
        const baseURL = typeof window === "undefined" ? "http://localhost:3000" : `${window.location.protocol}//${window.location.host}`;
        // return `${baseURL}/affiliate?ref=${affiliateCode}`;
        return `${baseURL}/affiliate?ref=${affiliateCode}`;
    }, [member]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(affiliateLink);

        toast.success("คัดลอกลิงก์สำเร็จ");
    };

    const handleShare = (platform: string) => {
        const text = "มาเล่นเกมส์ได้เงินกับเรา!";
        const url = affiliateLink;

        switch (platform) {
            case "line":
                window.open(
                    `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                        url,
                    )}&text=${encodeURIComponent(text)}`,
                );
                break;
            case "facebook":
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                );
                break;
            case "twitter":
                window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        url,
                    )}&text=${encodeURIComponent(text)}`,
                );
                break;
            case "email":
                window.open(
                    `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
                );
                break;
            case "sms":
                window.open(`sms:?body=${encodeURIComponent(text + " " + url)}`);
                break;
        }
    };

    function handleSubmitOne(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        // console.log(data);
    }

return (
  <div className="w-full">
    <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-4">
      <div className="md:w-[320px] w-full">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4 h-full">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-white">สแกนเพื่อสมัคร</div>
            <div className="text-[11px] text-white/60">
              Ref: {member?.affiliateCode ?? "-"}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="rounded-xl border border-white/10 bg-black/5 p-2">
              <Image
                className="rounded-lg object-cover"
                src="data:image/png;base64,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"
                alt=""
              />
            </div>
          </div>

          <div className="mt-3 text-xs text-white/70 text-center">
            ส่ง QR หรือคัดลอกลิงก์ด้านขวาไปให้เพื่อนสมัคร
          </div>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">ลิงก์แนะนำเพื่อน</div>

            <Button size="sm" className="Btn1" onPress={handleCopyLink}>
              คัดลอกลิงก์
            </Button>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <Input
              value={affiliateLink}
              readOnly
              classNames={{
                input: "text-white/90",
                inputWrapper:
                  "bg-black/5 border border-white/10 data-[hover=true]:bg-black/25",
              }}
            />
            <Button
              className="Btn1 sm:w-[140px] w-full"
              onPress={handleCopyLink}
              startContent={<BiSolidCopy />}
            >
              คัดลอก
            </Button>
          </div>

          <div className="mt-3 text-[11px] text-white/60">
            แชร์ลิงก์นี้เพื่อรับคอมมิชชั่นจากเพื่อนที่สมัครผ่านคุณ
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">
              แนะนำผ่านโซเชียลมีเดีย
            </div>
            <div className="text-[11px] text-white/60">แชร์ได้ทันที</div>
          </div>

          <div className="mt-3 flex gap-2">
            <Button
              isIconOnly
              className="bg-[#00c300]/5 border border-white/10"
              onPress={() => handleShare("line")}
            >
              <FaLine size={18} className="text-[#00c300]" />
            </Button>

            <Button
              isIconOnly
              className="bg-[#1877f2]/5 border border-white/10"
              onPress={() => handleShare("facebook")}
            >
              <FaFacebook size={18} className="text-[#1877f2]" />
            </Button>

            <Button
              isIconOnly
              className="bg-white/10 border border-white/10"
              onPress={() => handleShare("twitter")}
            >
              <FaXTwitter size={18} className="text-white" />
            </Button>

            <Button
              isIconOnly
              className="bg-amber-500/5 border border-white/10"
              onPress={() => handleShare("email")}
            >
              <FaEnvelope size={18} className="text-amber-300" />
            </Button>

            <Button
              isIconOnly
              className="bg-purple-500/5 border border-white/10"
              onPress={() => handleShare("sms")}
            >
              <RiMessage2Fill size={18} className="text-purple-300" />
            </Button>
          </div>
        </div>

        <Card className="bg-black/25 border border-white/10 rounded-2xl">
          <CardBody className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">รายได้จากการแนะนำเพื่อน</span>
              <span className="text-2xl font-bold text-red-600">
                {Number(data?.commission || 0).toLocaleString()}
              </span>
            </div>

            <Form onSubmit={handleSubmitOne} className="w-full mt-4">
              <Button type="submit" className="Btn2 w-full">
                ถอนเครดิต
              </Button>
            </Form>

            <div className="mt-3 text-[11px] text-white/55">
              * ระบบคำนวณรายได้ตามเงื่อนไขกิจกรรม
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  </div>
);

}
