"use client"

import { fetchWithToken } from "@/utils/fetchUtils"
import { buildAuthorizeHeader } from "../cookies"
import { getClientBaseUrl } from "@/utils/url/client"

export const playgame = async (productId: string, gameCode: string) => {
    const response = await fetchWithToken(
        getClientBaseUrl(),
        `/game/start`,
        {
            method: "POST",
            headers: await buildAuthorizeHeader(),
            body: JSON.stringify({
                productId: productId,
                gameCode: gameCode,
            }),
        }
    )

    if (response.ok) {
        return await response.json()
    }

    throw new Error("Failed to start game");
}
