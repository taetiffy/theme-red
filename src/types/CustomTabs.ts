export interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

export interface CustomTabsProps {
    tabs: Tab[];
    defaultTab?: string;
    className?: string;
    tabButtonClass?: string;
    activeTabClass?: string;
    inactiveTabClass?: string;
}
