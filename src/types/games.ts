// start game encoder type
export type StartGame = {
    productId: string;
    gameCode: string;
    name: string;
}

export type GameType =
    | "egames"
    | "livecasino"
    | "sport"
    | "poker"
    | "trading"
    | "news"
    | "jackpots"
    | "populars";

export interface GameProviderApiResponse {
    data: GameProvider[] | GameProviderByType[];
}

export interface GameProvider {
    id: string;
    product_id: string;
    product_name: string;
    img: string;
    short_logo: string;
    status: string;
    view: number;
    popular: boolean;
    genre_popular: boolean;
    sortUpdate: string;
    category: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    game: any[];
}

export interface GameProviderByType {
    id: string;
    name: string;
    category: string;
    code: string;
    img_old: string;
    img_new: string | null;
    order: number;
    state: string;
    isNew: boolean;
    isJackpot: boolean;
    isHot: boolean;
    view: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    providerId: string;
    provider: {
        product_id: string;
        short_logo: string;
    };
}

export interface PopularProvider {
    id: string;
    product_id: string;
    product_name: string;
    img: string;
    short_logo: string;
    status: string;
    view: number;
    popular: boolean;
    genre_popular: boolean;
    sortUpdate: string;
    category: string;
    order: number;
    createdAt: string;
    updatedAt: string;
}

export interface SearchProviderCategoryApiResponse {
    data_total: number;
    data: CategoryProvider[];
}

export interface CategoryProvider {
    product_id: string;
    product_name: string;
    img: string;
    short_logo: string;
    view: number;
    status?: string;
}

export interface CategoryProviderPopuplar {
    categorie: string;
    products: Array<CategoryProvider>;
}

export interface top10Game {
    id: string;
    name: string;
    category: string;
    code: string;
    img_old: string;
    img_new: string | null;
    order: number;
    state: string;
    isNew: boolean;
    isJackpot: boolean;
    isHot: boolean;
    view: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    providerId: string;
    provider: {
        product_id: string;
        short_logo: string;
    };
}
