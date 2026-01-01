import { getNotificationService, readNotificationService } from "@/services/notification";
import { useFetchData } from "../useFetchData";
import { useCallback } from "react";

export const useNotificaion = () => {
    const { data, refresh } = useFetchData(getNotificationService);

    const handleReadNotification = useCallback(async () => {
        await readNotificationService()

        refresh()
    }, []);

    

    return { notifications: data || [], handleReadNotification };
};
