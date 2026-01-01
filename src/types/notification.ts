export interface INotification {
    id: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
    memberId: string;
}


export interface NewsNotificationsPopup {
    id: string;
    type: string;
    status: boolean;
    news: {
        banner_img: string;
        popup_img: string;
        title: string;
        detail: string;
    }
}
