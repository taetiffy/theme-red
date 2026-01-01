export interface ImageProps {
    uri: string;
    offsetX?: number;
    offsetY?: number;
    sizeMultiplier?: number;
    landscape?: boolean;
}

export interface StyleType {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number | string;
    fontStyle?: string;
}

export interface WheelConfig {
    option: string;
    image: ImageProps;
    style: StyleType;
    optionSize: number;
}

export interface SpinConfig {
    id: string;
    name: string;
    color1: string;
    color2: string;
    banner_img: string;
    start_img: string;
    createdAt: string;
    updatedAt: string;
}