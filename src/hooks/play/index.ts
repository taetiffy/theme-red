import { useState, useEffect } from "react";
import { useFetchData } from "../useFetchData";
import { playgame } from "@/services/play";

export const usePlayGame = (product_id: string, game_code: string) => {
    
    const [gameUrl, setGameUrl] = useState<string | null>(null);

    const { data: game_response } = useFetchData(playgame, product_id, game_code);

    useEffect(() => {
        if (game_response) {
            setGameUrl(game_response.url);
        }
    }, [game_response]);

    return { gameUrl };
}
