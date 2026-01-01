import { cx } from "@/utils/utils";
import {
    Button,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Avatar
} from "@heroui/react";
import Hamburger from "hamburger-react";
import styles from "@/styles/nav.module.css";
import { IoChatboxEllipses, IoLogOut } from "react-icons/io5";
import { useCallback, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { FaFileCircleExclamation, FaLock } from "react-icons/fa6";
import { useMemberStore } from "@/stores/member";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { useShareStore } from "@/stores/share";

export function NavbarMobilePopover() {
    const [isOpenHam, setOpenHam] = useState<boolean>(false);

    const router = useRouter();
    const { logout, member } = useMemberStore();
    const { resetPass } = useModal();
    const { state: { line, telegram } } = useShareStore()
    const handleLine = () => {
        router.push(line.link);
    };

    const handleLogout = useCallback(() => {
        try {
            logout();

            toast.success("ออกจากระบบสำเร็จ");
        } catch (err: unknown) {
            toast.success("ออกจากระบบผิดพลาด");
        }
    }, []);

    const handleResetPassword = useCallback(() => {
        if (resetPass.state.onOpen) {
            setOpenHam(false);

            resetPass.state.onOpen();
        }
    }, []);

    return (
        <Popover
            placement="bottom-end"
            offset={18}
            isOpen={isOpenHam}
            classNames={{content:'p-[4px]'}}
            onOpenChange={() => {
                setOpenHam(!isOpenHam);
            }}
        >
            <PopoverTrigger>
                <Button
                    isIconOnly
                    className={`${cx(styles.hamButton, isOpenHam ? "Btn1" : styles.hamInactive)}`}
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
                            size={22}
                            color="white"
                            toggle={() => {
                                setOpenHam(!isOpenHam);
                            }}
                        />
                    </div>
                </Button>
            </PopoverTrigger>

            <PopoverContent className={styles.popoverContent}>
              <div className={' text-(--text-color) flex w-full gap-2'}>
                <Avatar />
                <div>
                  <span>{member?.username}</span>
                </div>
              </div>
              <Listbox aria-label="Listbox menu with descriptions" className={` *:text-(--text-color)`} variant="flat">
                    <ListboxItem
                        key="home"
                        startContent={<img className="w-5" src="/icons/Hamburger/home.svg"/>}
                        className={`${cx(styles.listItem, "dark")}`}
                        onClick={() => router.push("/")}
                    >
                        หน้าหลัก
                    </ListboxItem>

                    <ListboxItem
                        key="profile"
                        startContent={<img className="w-5" src="/icons/Hamburger/profile.svg"/>}
                        className={cx(styles.listItem, "dark")}
                        onClick={() => router.push("/profile")}
                    >
                        ข้อมูลผู้ใช้
                    </ListboxItem>

                    <ListboxItem
                        key="profile-history"
                        startContent={<img className="w-5" src="/icons/Hamburger/history.svg"/>}
                        className={cx(styles.listItem, "dark")}
                        onClick={() => router.push("/profile#history")}
                    >
                        ประวัติการใช้งาน
                    </ListboxItem>

                    <ListboxItem
                        key="contact"
                        startContent={<img className="w-5" src="/icons/Hamburger/contact.svg"/>}
                        className={cx(styles.listItem, "dark")}
                        onPress={handleLine}
                    >
                        ติดต่อพนักงาน
                    </ListboxItem>

                    <ListboxItem
                        key="reset-password"
                        startContent={<img className="w-5" src="/icons/Hamburger/lock.svg"/>}
                        className={cx(styles.listItem, "dark")}
                        onClick={handleResetPassword}
                    >
                        เปลี่ยนรหัสผ่าน
                    </ListboxItem>

                    <ListboxItem
                        key="user-manual"
                        startContent={<img className="w-5" src="/icons/Hamburger/book.svg"/>}
                        className={cx(styles.listItem, "dark")}
                    >
                        คู่มือการใช้งาน
                    </ListboxItem>

                    <ListboxItem
                        key="logout"
                        startContent={<img className="w-5" src="/icons/Hamburger/door.svg"/>}
                        className={cx(styles.listItem, "dark")}
                        onClick={handleLogout}
                    >
                        ออกจากระบบ
                    </ListboxItem>
                </Listbox>
            </PopoverContent>
        </Popover>
    );
}
