export interface ISetting {
    banner: Banner;
    website: Website;
    exchange: Exchange;
    bank_deposit_setting: BankDepositSetting;
    gateway_deposit_setting: GatewayDepositSetting;
    bank_withdraw_setting: BankWithdrawSetting;
    gateway_withdraw_setting: GatewayWithdrawSetting;
    method_of_withdraw: MethodOfWithdraw;
    menu: Menu;
    announce_commission: string;
    rank: Rank;
    gameStat: GameStat;
    specialIcon: SpecialIcon;
    affiliateBanner: AffiliateBanner;
    user: User;
}


interface Contact {
    line: {
        link: string;
        value: string;
        status: boolean;
    };
    line_bot: string;
    telegram: {
        link: string;
        value: string;
        status: boolean;
    };
}

interface ColorShades {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
    color7: string;
    color8: string;
}

interface General {
    img: string;
    title: string;
    bg_img: string;
    keyword: string;
    web_play: string;
    description: string;
    announcement: string;
    color_shades: ColorShades;
    link_landing: string;
    google_tag_manager: string;
}

export interface ISettingHost {
    id: string;
    name: string;
    data: {
        contact: Contact;
        general: General;
    }
}

export interface ISettingSOS {
    id: string;
    name: string;
    data: {
        to: string;
        status: boolean;
    }
}

interface Banner {
    id: string;
    name: string;
    data: Data;
    createdAt: string;
    updatedAt: string;
}

interface Data {
    imgs: string[];
    mini: Mini;
}

interface Mini {
    img1: string;
    img2: string;
}

interface Website {
    id: string;
    name: string;
    data: Data2;
    createdAt: string;
    updatedAt: string;
}

interface Data2 {
    contact: Contact;
    general: General;
}

interface Contact {
    line: Line;
    line_bot: string;
    telegram: Telegram;
}

interface Line {
    link: string;
    value: string;
    status: boolean;
}

interface Telegram {
    link: string;
    value: string;
    status: boolean;
}

interface General {
    img: string;
    title: string;
    bg_img: string;
    keyword: string;
    web_play: string;
    description: string;
    announcement: string;
    color_shades: ColorShades;
    link_landing: string;
    google_tag_manager: string;
}

interface ColorShades {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
}

interface Exchange {
    id: string;
    name: string;
    data: Data3;
    createdAt: string;
    updatedAt: string;
}

interface Data3 {
    gem_to_credit_rate: number;
}

interface BankDepositSetting {
    id: string;
    name: string;
    data: Data4;
    createdAt: string;
    updatedAt: string;
}

interface Data4 {
    max: number;
    min: number;
    use: boolean;
}

interface GatewayDepositSetting {
    id: string;
    name: string;
    data: Data5;
    createdAt: string;
    updatedAt: string;
}

interface Data5 {
    max: number;
    min: number;
    use: boolean;
}

interface BankWithdrawSetting {
    id: string;
    name: string;
    data: Data6;
    createdAt: string;
    updatedAt: string;
}

interface Data6 {
    max: number;
    min: number;
    use: boolean;
    auto: Auto;
    limit: number;
}

interface Auto {
    manual: number;
    status: boolean;
}

interface GatewayWithdrawSetting {
    id: string;
    name: string;
    data: Data7;
    createdAt: string;
    updatedAt: string;
}

interface Data7 {
    max: number;
    min: number;
    use: boolean;
    auto: Auto2;
    limit: number;
}

interface Auto2 {
    manual: number;
    status: boolean;
}

interface MethodOfWithdraw {
    id: string;
    name: string;
    data: Data8;
    createdAt: string;
    updatedAt: string;
}

interface Data8 {
    type: "BANK" | "GATEWAY";
}

interface Menu {
    id: string;
    name: string;
    data: Data9;
    createdAt: string;
    updatedAt: string;
}

interface Data9 {
    menu: Menu2[];
    category: Category[];
}

interface Menu2 {
    id: string;
    src: string;
    sort: number;
    title: string;
    onOpen: string;
    disable: boolean;
}

interface Category {
    id: string;
    sort: number;
    src: string;
    title: string;
    title_en: string;
    href: string;
    disable: boolean;
}

interface Rank {
    id: string;
    name: string;
    data: Data10;
    createdAt: string;
    updatedAt: string;
}

interface Data10 {
    data: Daum[];
}

interface Daum {
    id: string;
    end: number;
    img: string;
    loss: number;
    name: string;
    sort: number;
    start: number;
    lossSlot: number;
    commission: number;
    commissionSlot: number;
}

interface GameStat {
    id: string;
    name: string;
    data: Data11;
    createdAt: string;
    updatedAt: string;
}

interface Data11 {
    game_name: boolean;
    vender_name: boolean;
    jackpot_show: boolean;
    withdraw_show: boolean;
}

interface SpecialIcon {
    id: string;
    name: string;
    data: Data12;
    createdAt: string;
    updatedAt: string;
}

interface Data12 {
    rank: string;
    quest: string;
    hitGame: string;
    newGame: string;
    backpack: string;
    jackpotGame: string;
}

interface AffiliateBanner {
    id: string;
    name: string;
    data: Data13;
    createdAt: string;
    updatedAt: string;
}

interface Data13 {
    imgs: string[];
}

interface User {
    id: string;
    name: string;
    data: Data14;
    createdAt: string;
    updatedAt: string;
}

interface Data14 {
    userBankName: boolean;
    allIn: boolean;
    payment: string;
    quickDeposit: boolean;
    slipsDeposit: boolean;
    integerDeposit: boolean;
    integerWithdraw: boolean;
}
