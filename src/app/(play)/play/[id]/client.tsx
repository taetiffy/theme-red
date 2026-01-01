"use client";
import { PlayBar } from "@/components/specific/play/PlayBar";
import withAuth from "@/components/withAuth";
import { buildAuthorizeHeader } from "@/services/cookies";
import { BasicObjectEncoder } from "@/utils/crypto";
import { fetchWithToken } from "@/utils/fetchUtils";
import { getClientBaseUrl } from "@/utils/url/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from '@heroui/react'
import { StartGame } from "@/types/games";

function Client() {
    const param = useParams();
    const [open, IsOpen] = useState(true);
    const [gameUrl, setGameUrl] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    if (!param || !param.id) {
        return <div className="text-white">Invalid game ID</div>;
    }

    const fetchdata = async () => {
        try {
            setLoading(true);
            setError("");

            const { productId, gameCode } = BasicObjectEncoder.decodeBase64FromUrl<StartGame>(`${param.id}`);

            const headers = await buildAuthorizeHeader();
            const data = await fetchWithToken(
                getClientBaseUrl(),
                `/game/start`,
                {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({
                        productId: productId,
                        gameCode: gameCode,
                    }),
                }
            );

            const response = await data.json();
            setGameUrl(response.url);
        } catch (err) {
            setError("Failed to load game. Please try again.");
            console.error("Error loading game:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div className="text-white w-screen h-screen relative flex items-end">
            <PlayBar open={open} IsOpen={() => IsOpen(!open)} />

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4"></div>
                        <p className="text-lg">Loading game...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                    <div className="text-center">
                        <p className="text-red-500 text-lg mb-4">{error}</p>
                        <Button
                            onPress={fetchdata}
                            className="Btn1"
                        >
                            ลองใหม่
                        </Button>
                    </div>
                </div>
            )}

            {!loading && !error && gameUrl && (
                <iframe
                    src={gameUrl}
                    className={`w-full ${open ? 'h-full' : 'h-[calc(100vh-80px)] md:h-[calc(100vh-50px)]'}`}
                ></iframe>
            )}
        </div>
    );
}

export default withAuth(Client);
