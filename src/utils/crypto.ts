export class BasicObjectEncoder {
    // Support Browser Only
    static encode(data: any): string {
        // ex. {"name": "jo"}
        return encodeURIComponent(JSON.stringify(data));
    }

    // Support Browser Only
    static decode<T>(encoded: string): T {
        return JSON.parse(decodeURIComponent(encoded)) as T;
    }

    static encodeBase64ForUrl(data: any): string {
        data["ts"] = Date.now();
        return Buffer.from(JSON.stringify(data))
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, ""); // ลบ '=' ท้ายข้อความ
    }

    static decodeBase64FromUrl<T>(encoded: string): T {
        const base64 =
            encoded.replace(/-/g, "+").replace(/_/g, "/") +
            "=".repeat((4 - (encoded.length % 4)) % 4); // เติม '=' ที่ขาด
        return JSON.parse(Buffer.from(base64, "base64").toString());
    }
}
