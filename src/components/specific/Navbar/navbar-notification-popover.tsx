import { cx } from "@/utils/utils";
import {
    Button,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@heroui/react";
import { useMemo, useState } from "react";
import styles from "@/styles/nav.module.css";
import { FaBell } from "react-icons/fa6";
import { useNotificaion } from "@/hooks/notification";

export const NavbarNotificationPopover = () => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const { notifications, handleReadNotification } = useNotificaion();

    const filterNotification = useMemo(
        () => notifications.filter((n) => !n.isRead),
        [notifications],
    );

    return (
        <Popover
            placement="bottom-end"
            offset={18}
            isOpen={isOpen}
            onOpenChange={() => {
                setOpen(!isOpen);
            }}
        >
            <PopoverTrigger>
                <Button
                    isIconOnly
                    className={cx(styles.hamButton, isOpen ? "Btn1" : styles.hamInactive)}
                >
                    <div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <FaBell size={18} />
                    </div>
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                {filterNotification.length > 0 ? (
                    <>
                        <div className="w-full flex items-center justify-between border-b px-2 py-2 border-divider">
                            <span className="text-sm font-semibold text-(--text-color)">
                                การแจ้งเตือน ({filterNotification.length})
                            </span>
                            <Button
                                size="sm"
                                variant="light"
                                onPress={handleReadNotification}
                                className="text-xs text-primary"
                            >
                                อ่านทั้งหมด
                            </Button>
                        </div>
                        <Listbox aria-label="Listbox menu with descriptions" variant="flat">
                            {filterNotification.map((n) => (
                                <ListboxItem
                                    key={n.id}
                                    className={cx("py-2 text-(--text-color) bg-gray-800", "dark")}
                                >
                                    {n.message}
                                </ListboxItem>
                            ))}
                        </Listbox>
                    </>
                ) : (
                    <div className="px-6 py-2 text-(--text-color)">ไม่มีรายการแจ้งเตือน</div>
                )}
            </PopoverContent>
        </Popover>
    );
};
