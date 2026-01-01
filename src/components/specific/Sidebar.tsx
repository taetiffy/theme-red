"use client";
import React, { lazy, Suspense, useEffect } from "react";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useNavigation } from "@/utils/navigate/link";
import { usePathname } from "next/navigation";
//heroui
import { Button, Spinner } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/accordion";

//icon
import { IoChatboxEllipses } from "react-icons/io5";
import { FaLine } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { PiHandDeposit } from "react-icons/pi";
import { CgMenuGridO } from "react-icons/cg";
import { useModal } from "@/hooks/useModal";
import { NavigateSideBar } from "@/variables/sidebar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BTNCommon } from "../BTNCommon";
import { LevelBar } from "../../containers/LevelBar";
import { useMemberStore } from "@/stores/member";
import { useShareStore } from "@/stores/share";

export function Sidebar() {
	const { toGame } = useNavigation();
	const { isOpen, setOpen } = useSidebarStore();
	const { logout, isAuthenticated } = useMemberStore()
	const router = useRouter();
	const pathname = usePathname();
	const { state: { line, telegram } } = useShareStore()

	const handleLink = (href: string) => {
		if (isAuthenticated) {
			router.push(href);
		} else {
			toast.error("กรุณาเข้าสู่ระบบก่อนทำรายการ");
		}
	};

	const handleToGame = () => {
		if (isAuthenticated) {
			toGame()
		} else {
			toast.error("กรุณาเข้าสู่ระบบก่อนทำรายการ");
		}
	};

	const handleLogout = () => {
		try {
			logout()
			toast.success('ออกจากระบบสำเร็จ')
		}
		catch (err: unknown) {
			toast.success('ออกจากระบบผิดพลาด')
		}
	}

	const handleLine = () => {
		router.push(line.link);
	};

	const handleTelegram = () => {
		router.push(telegram.link);
	};

	const modals = useModal();

	const handleOpenModal = (name: string) => {
		const maps: Record<string, (() => void) | undefined> = {
			"checkIn": modals.checkIn.state.onOpen,
			"deposit": modals.deposit.state.onOpen,
			"withdraw": modals.withdraw.state.onOpen,
			"coupon": modals.coupon.state.onOpen,
			"reward": modals.gemReward.state.onOpen,
			"commission": modals.commission.state.onOpen,
			"creditFree": modals.creditFree.state.onOpen,
			"backpack": modals.backpack.state.onOpen,
			"cashback": modals.cashback.state.onOpen,
		}
		const toggle = maps[name] || undefined;
		if (toggle) toggle();
	};


	return (
		<>
			<div
				className={`bg-[#0e0d0d] *:text-(--text-color) z-50 flex flex-col ${isOpen ? `w-[220px] 2xl:w-[250px]` : `w-[80px]`
					} gap-2 transition-all p-2 duration-800 h-full`}
			>
				<div className="mb-5 rounded-xl mx-1">
					<div onClick={() => setOpen(true)} className={`w-full ${isAuthenticated ? 'flex' : 'hidden'} cursor-pointer`}>
					<LevelBar isOpen={isOpen} position="Sidebar" />
				</div>
				<div className=" flex flex-col gap-2">
					{/* <Button
						size="lg"
						className="w-full Btn2 text-base"
						isIconOnly={!isOpen}
						onPress={handleToGame}
					>
						{isOpen ? "เล่นเกม" : <IoGameController size={20} />}
					</Button> */}
					{isAuthenticated && (
						<Button
							size="md"
							className="w-full Btn2 text-base mt-2"
							isIconOnly={!isOpen}
							onPress={handleLogout}
						>
							{isOpen ? "ออกจากระบบ" : <i className="fa-solid fa-left-from-bracket"></i>}
						</Button>
					)}
				</div>
				</div>
				<div className="dark overflow-auto">
					<Accordion
						selectionMode="multiple"
						defaultExpandedKeys={["1", "2", "3"]}
						fullWidth
						className="!px-0 [&_hr]:hidden"
					>
						<AccordionItem
							textValue="1"
							key="1"
							className="mb-2"
							startContent={
								<RiMoneyDollarCircleFill className="text-(--text-color)" size={30} />
							}
							title={isOpen ? "การเงิน" : ""}
							classNames={{
								indicator: isOpen ? "flex" : "hidden",
								heading: "px-4 Btn_sidebar_bgColor rounded-lg mb-2",
								content: "py-0",
								title: 'text-(--text-color)'
							}}
						>
							<div className="*:text-(--text-color) gap-2 flex flex-col">
								<BTNCommon isLight needAuthen={true} onPress={modals.deposit.state.onOpen} size="lg" className="w-full" isIconOnly={!isOpen}>
									{isOpen ? (
										<a
											className="flex text-sm w-full items-center gap-2"
										>
											<i className="fa-solid fa-money-from-bracket text-base"></i>
											<span>ฝากเงิน</span>
										</a>
									) : (
										<i className="fa-solid fa-money-from-bracket text-base"></i>
									)}
								</BTNCommon>
								<BTNCommon needAuthen={true} onPress={modals.withdraw.state.onOpen} size="lg" className="w-full" isLight isIconOnly={!isOpen}>
									{isOpen ? (
										<a
											className="flex text-sm w-full items-center gap-2"
										>
											<PiHandDeposit size={20} />
											<span>ถอนเงิน</span>
										</a>
									) : (
										<PiHandDeposit size={20} />
									)}
								</BTNCommon>
							</div>
						</AccordionItem>
						<AccordionItem
							textValue="2"
							key="2"
							className="mb-2"
							startContent={<CgMenuGridO className="text-(--text-color)" size={30} />}
							title={isOpen ? "เมนูหลัก" : ""}
							classNames={{
								indicator: isOpen ? "flex" : "hidden",
								heading: "px-4 Btn_sidebar_bgColor rounded-lg mb-2",
								content: "py-0",
								title: 'text-(--text-color)'
							}}
						>
							<div className="*:text-(--text-color) gap-2 flex flex-col">
								{NavigateSideBar.map((items, index) => (
									<BTNCommon
										needAuthen={items.needAuthen}
										size="lg"
										key={index}
										isLight
										onPress={() => {
											if (items.modal === null) {
												handleLink(items.link);
											}
											else {
												handleOpenModal(items.modal)
											}
										}}
										Disable={items.link === 'awd' ? true : false}
										className={`w-full ${pathname === items.link ? `Btn1` : ``
											}`}
										isIconOnly={!isOpen}
									>
										{isOpen ? (
											<div className="flex w-full  items-center gap-2">
												<i className={`${items.icon} text-lg`}></i>
												<span className="text-sm">{items.title}</span>
											</div>
										) : (
											<i className={`${items.icon}  text-lg`}></i>
										)}
									</BTNCommon>
								))}
							</div>
						</AccordionItem>
						{
							line.status === true || telegram.status === true ?
								<AccordionItem
									textValue="3"
									key="3"
									className="mb-2"
									startContent={
										<IoChatboxEllipses className="" size={30} />
									}
									title={isOpen ? "ติดต่อเรา" : ""}
									classNames={{
										indicator: isOpen ? "flex" : "hidden",
										heading: "px-4 Btn_sidebar_bgColor rounded-lg mb-2",
										content: "py-0",
										title: 'text-(--text-color)'
									}}
								>
									<div className="*:text-(--text-color) gap-2 flex flex-col">

										{
											line.status && <Button
												size="lg"
												className="w-full"
												isIconOnly={!isOpen}
												onPress={handleLine}
												variant="light"
											>
												{isOpen ? (
													<div className="flex w-full items-center gap-2">
														<FaLine className="text-green-500" size={30} />
														<span className="text-(--text-color)">Line</span>
													</div>
												) : (
													<FaLine className="text-green-500" size={30} />
												)}
											</Button>
										}

										{
											telegram.status && <Button
												size="lg"
												className="w-full"
												isIconOnly={!isOpen}
												onPress={handleTelegram}
												variant="light"
											>
												{isOpen ? (
													<div className="flex w-full items-center gap-2">
														<FaTelegram className="text-blue-400" size={30} />
														<span>เทเลเกรม</span>
													</div>
												) : (
													<FaTelegram className="text-blue-400" size={30} />
												)}
											</Button>
										}

									</div>
								</AccordionItem>
								: null
						}
					</Accordion>
				</div>
			</div>
		</>
	);
}
