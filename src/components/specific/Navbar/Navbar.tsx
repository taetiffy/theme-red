"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
// heroui
import { Image, Button } from "@heroui/react";
import { Tabs, Tab } from "@heroui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { CircularProgress } from "@heroui/progress";
// icon
import { IoIosArrowForward } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Divide as Hamburger } from "hamburger-react";
// store
import { useSidebarStore } from "@/stores/sidebarStore";
import { useLoginStore } from "@/stores/login";
// other
import { useNavigation } from "@/utils/navigate/link";
import { Minibar } from "./Minibar";
import { MoneyBar } from "@/containers/MoneyBar";
import { motion } from "framer-motion";
import { BonusSwitch } from "../../BonusSwitch";
import { LevelBar } from "@/containers/LevelBar";
import { useModal } from "@/hooks/useModal";

import styles from "@/styles/nav.module.css";
import { useMemberStore } from "@/stores/member";
import { fetchPatchBonusService } from "@/services/bonus";
import { useBonus } from "@/hooks/bonus";
import { useShareStore } from "@/stores/share";
import { NavbarMobilePopover } from "./navbar-mobile-popover";
import { toast } from "sonner";
import { NavbarNotificationPopover } from "./navbar-notification-popover";
import { useRouter } from "next/navigation";
import { isLightColor } from "@/utils/lightColor";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

/* ยูทิลเล็กๆ แทน clsx */
const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

export function Navbar() {
    const router = useRouter()
    const { toggleSideBar, isOpen } = useSidebarStore();
    const { isAuthenticated, member, setMember } = useMemberStore();
    const [isOpenHam, setOpenHam] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<string>("home");
    const { toHome, toGame } = useNavigation();
    const pathname = usePathname();
    const { signin, signup } = useModal();
    const { handlePatchBonus } = useBonus();
    const { state: shareStore } = useShareStore();
    const [color1, setColor1] = useState('');

    useEffect(() => {
        const navbarColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--navbar-color')
            .trim();
        setColor1(navbarColor);
    }, []);

    const handleToHome = () => {
      router.push('/')
    }
    useEffect(() => {
        if (pathname === "/category" || pathname.startsWith("/category/")) {
            setSelectedTab("category");
        } else {
            setSelectedTab("home");
        }
    }, [pathname]);

    const handleTabChange = (key: string) => {
        setSelectedTab(key);
        if (key === "home") {
            toHome();
        } else if (key === "category") {
            toGame();
            // if(isAuthenticated){
            //   toGame();
            // }
            // else{
            //   toast.error("กรุณาเข้าสู่ระบบก่อนทำรายการ");
            // }
        }
    };

    const isLight = isLightColor(color1)

    return (
        <>
        <div className="absolute z-50 xl:top-[50px] top-[60px] left-[0px] w-full md:w-[calc(100%)] lg:w-[calc(100%)]">
                    <img src="/image/banner_top.webp" className="w-full" alt="" />
                </div>
            {/* <RegisterModal isOpen={Register.isOpen} onClose={Register.closeModal} /> */}
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cx(
                    styles.navbar,
                    isAuthenticated ? styles.navbarLoggedIn : styles.navbarLoggedOut,
                )}
            >
                
                <div
                    className={cx(
                        styles.navbarInner,
                        isAuthenticated && styles.navbarInnerLoggedIn,
                    )}
                >
                    <div
                        className={cx(
                            styles.leftGroup,
                            isAuthenticated && styles.leftGroupLoggedIn,
                        )}
                    >
{!isAuthenticated ? (
  <Popover
    placement="bottom-end"
    offset={18}
    isOpen={isOpenHam}
    onOpenChange={(open) => setOpenHam(open)}
  >
    <PopoverTrigger>
      <Button
        isIconOnly
        className={cx(
          styles.hamButton,
          isOpenHam ? "Btn1" : styles.hamInactive,
        )}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Hamburger
            toggled={isOpenHam}
            size={18}
            color="white"
            toggle={() => {}}
          />
        </div>
      </Button>
    </PopoverTrigger>

    <PopoverContent className={styles.popoverContent}>
      <Listbox aria-label="Guest menu" variant="flat">
        <ListboxItem
          key="login"
          startContent={<FiLogIn size={26} />}
          href="/login"
          className={cx(styles.listItem, "dark")}
        >
          เข้าสู่ระบบ
        </ListboxItem>

        <ListboxItem
          key="register"
          startContent={<FiUserPlus size={26} />}
          href="/register"
          className={cx(styles.listItem, "dark")}
        >
          สมัครสมาชิก
        </ListboxItem>
      </Listbox>
    </PopoverContent>
  </Popover>
) : (
  <NavbarMobilePopover />
)}


                        <div className=" cursor-pointer" onClick={handleToHome}>
                            {shareStore.web_logo && (
                                <Image
                                    className={` object-contain w-[120px] h-12 md:h-15 md:w-[150px]`}
                                    alt="logo"
                                    // src={shareStore.web_logo}
                                    src="https://ezcasino.us/build/web/ezl-ez-casino/img/logo.png?v=10"
                                />
                            )}
                        </div>

                        {isAuthenticated && (
                            <>
                                <div className={styles.onlySmVisible}>

                                </div>
                                <div className={`absolute -top-1 right-0 flex sm:hidden gap-2 items-center`}>
                                    <div className={'w-30'}>
                                      <LevelBar position="Line" isDrawer />
                                    </div>

                                    {/* <NavbarNotificationPopover /> */}

                                    {/* <NavbarMobilePopover /> */}
                                </div>
                            </>
                        )}

                        <Button
                            isIconOnly
                            radius="full"
                            onPress={toggleSideBar}
                            className={cx(styles.arrowBtn, styles.onlyLgFlex)}
                        >
                            <div className={cx(styles.arrowRotator, isOpen && styles.arrowRotated)}>
                                <IoIosArrowForward size={20} />
                            </div>
                        </Button>

                        <div className={`hidden lg:flex`}>
                            <Tabs
                                size="lg"
                                radius="lg"
                                selectedKey={selectedTab}
                                onSelectionChange={(key) => handleTabChange(key as string)}
                                classNames={{
                                    cursor: "Btn2",
                                    tabContent: styles.tabContent,
                                    tabList: `text-base *:text-white ${isLight ? 'mini_navbar_bgColor_light':'mini_navbar_bgColor_dark'}`,
                                }}
                                className="dark"
                                aria-label="Page"
                            >
                                <Tab key="home" className="px-8 text-base" title="หน้าหลัก"></Tab>
                                <Tab key="category" className="px-8 text-base" title="เล่นเกม"></Tab>
                            </Tabs>
                        </div>
                    </div>

                    <div className="flex">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <div></div>
                                <div className={styles.hiddenOnSmDown}>
                                    <BonusSwitch
                                        value={member ? member.bonus_status : false}
                                        onPress={() =>
                                            handlePatchBonus((d) => setMember({ bonus_status: d }))
                                        }
                                    />
                                </div>
                                <div className={'flex gap-2 sm:hidden'}>
                                  <div className={`flex-8`}>
                                    <MoneyBar cols={2} gold diamond />
                                  </div>
                                  <div className={`flex-2 flex items-center`}>
                                    <div className={'hidden sm:flex'}>
                                      <MoneyBar cols={1} diamond />
                                    </div>
                                    <div className={'flex sm:hidden'}>
                                      <BonusSwitch
                                          value={member ? member.bonus_status : false}
                                          onPress={() =>
                                              handlePatchBonus((d) => setMember({ bonus_status: d }))
                                          }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className={`hidden sm:flex`}>
                                  <MoneyBar cols={2} gold diamond />
                                </div>
                                <div className={` sm:flex hidden `}>
                                    <LevelBar position="Circle" />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.authRight}>
                                <Button
                                    onPress={signin.state.onOpen}
                                    size="sm"
                                    className="Btn1 text-xs md:text-base"
                                >
                                    เข้าสู่ระบบ
                                </Button>
                                <Button
                                    onPress={signup.state.onOpen}
                                    size="sm"
                                    className="Btn2 text-xs md:text-base"
                                >
                                    สมัครสมาชิก
                                </Button>
                                

                                
                            </div>
                        )}
                    </div>
                    <Minibar />
                    {/*{isAuthenticated &&}*/}
                </div>
            </motion.div>
        </>
    );
}
