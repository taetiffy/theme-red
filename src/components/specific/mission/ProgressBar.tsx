import React, { useCallback } from 'react';
import { Progress } from "@heroui/react";
import { useShareStore } from '@/stores/share';

const calculateProgress = (mission: any, type: string) => {

    const { state: { rank } } = useShareStore()

    const calculatePercentage = (now: number, end: number): number => {
        if (!end || end === 0) return 0;
        return Math.min(Math.floor((now / end) * 100), 100);
    };

    const levelCondition = mission.checkconditions.level;
    const betAmountCondition = mission.checkconditions.betAmount;
    const betEpochCondition = mission.checkconditions.betEpoch;
    const playEpochCondition = mission.checkconditions.playEpoch;
    const playGameCondition = mission.checkconditions.playGame;
    const depositCondition = mission.checkconditions.deposit;
    const depositAmountCondition = mission.checkconditions.depositeStack;

    const progressData = {
        level: {
            cal: levelCondition ? calculatePercentage(levelCondition.now || 0, levelCondition.end || 0) : 0,
            now: levelCondition?.now || 0,
            end: levelCondition?.end || 0,
        },
        betAmount: {
            cal: betAmountCondition ? calculatePercentage(betAmountCondition.now || 0, betAmountCondition.end || 0) : 0,
            now: betAmountCondition?.now || 0,
            end: betAmountCondition?.end || 0,
        },
        betEpoch: {
            cal: betEpochCondition ? calculatePercentage(betEpochCondition.now || 0, betEpochCondition.end || 0) : 0,
            now: betEpochCondition?.now || 0,
            end: betEpochCondition?.end || 0,
        },
        playEpoch: {
            cal: playEpochCondition ? calculatePercentage(playEpochCondition.now || 0, playEpochCondition.end || 0) : 0,
            now: playEpochCondition?.now || 0,
            end: playEpochCondition?.end || 0,
        },
        playGame: {
            cal: playGameCondition ? calculatePercentage(playGameCondition.now || 0, playGameCondition.end || 0) : 0,
            now: playGameCondition?.now || 0,
            end: playGameCondition?.end || 0,
        },
        deposit: {
            cal: depositCondition ? calculatePercentage(depositCondition.now || 0, depositCondition.end || 0) : 0,
            now: depositCondition?.now || 0,
            end: depositCondition?.end || 0,
        },
        depositAmount: {
            cal: depositAmountCondition ? calculatePercentage(depositAmountCondition.now || 0, depositAmountCondition.end || 0) : 0,
            now: depositAmountCondition?.now || 0,
            end: depositAmountCondition?.end || 0,
        },
    };

    return progressData[type as keyof typeof progressData] || { cal: 0, now: 0, end: 0 };
};

interface ProgressBarProps {
    data: any;
}

export function ProgressBar({ data }: ProgressBarProps) {

    const LavelSize = { label: 'w-[200px]' };

    const ContainLimitLevel = useCallback(() => {
        if (data.minlevel === 0) {
            if (data.rankId !== 'non-rank' && data.rankId !== '') {
                return (
                    <div className="flex flex-col gap-1">
                        <span>Rank: {data.rank.name ?? "null"}</span>
                    </div>
                )
            } else {
                return (
                    <span>ไม่จำกัดเลเวลและ rank</span>
                )
            }
        } else {
            return (
                <div className="flex flex-col gap-1">
                    <Progress
                        classNames={LavelSize}
                        label={`เลเวลขั้นต่ำที่สามารถทำภารกิจได้: LV.${data.level}`}
                        value={calculateProgress(data, 'level').cal}
                        valueLabel={`${calculateProgress(data, 'level').now} / ${calculateProgress(data, 'level').end}`}
                        className="max-w-full"
                        color="primary"
                        showValueLabel={true}
                    />
                </div>
            )
        }

    }, [data.minlevel])

    const ContainBetAmount = useCallback(() => {
        if (data === undefined) return null
        if (data.betAmount > 0) {
            return <div className="flex flex-col gap-1">
                <Progress
                    classNames={LavelSize}
                    label={`ยอดเดิมพันรวม ${data.betAmount}`}
                    value={calculateProgress(data, 'betAmount').cal}
                    maxValue={1000}
                    valueLabel={`${calculateProgress(data, 'betAmount').now} / ${calculateProgress(data, 'betAmount').end}`}
                    className="max-w-full"
                    color="warning"
                    showValueLabel={true}
                />
            </div>
        }
        return null
    }, [data.betAmount])

    const ContainbetEpoch = useCallback(() => {
        if (data.betEpoch > 0) {
            return (
                <div className="flex flex-col gap-1">
                    <Progress
                        classNames={LavelSize}
                        label={`จำนวนครั้งเดิมพันรวม ${data.betEpoch} ครั้ง`}
                        value={calculateProgress(data, 'betEpoch').cal}
                        valueLabel={`${calculateProgress(data, 'betEpoch').now} / ${calculateProgress(data, 'betEpoch').end}`}
                        className="max-w-full"
                        color="secondary"
                        showValueLabel={true}
                    />
                </div>
            );
        }
        return null
    }, [data.betEpoch])

    const ContainPlayEpoch = useCallback(() => {
        if (data.playEpoch > 0) {
            return (
                <div className="flex flex-col gap-1">
                    <Progress
                        classNames={LavelSize}
                        label={`จำนวนเกมที่เล่น ${Number(data.playEpoch).toString()} เกม`}
                        value={calculateProgress(data, 'playEpoch').cal}
                        valueLabel={`${calculateProgress(data, 'playEpoch').now} / ${calculateProgress(data, 'playEpoch').end}`}
                        className="max-w-full"
                        color="danger"
                        showValueLabel={true}
                    />
                </div>
            );
        }
        return null
    }, [data.playEpoch]);

    const ContainDepositAmount = useCallback(() => {
        if (data.depositAmount.depositDate > 0) {
            return (
                <div className="flex flex-col gap-1">
                    <Progress
                        classNames={LavelSize}
                        label={`ยอดการฝากต่อวันถึง${' '}
                        ${data.depositAmount.value}${' '}
                        บาทต่อเนื่องจนครบ${' '}
                        ${data.depositAmount.depositDate} วัน`}
                        value={calculateProgress(data, 'depositAmount').cal}
                        valueLabel={`${calculateProgress(data, 'depositAmount').now} / ${calculateProgress(data, 'depositAmount').end}`}
                        className="max-w-full"
                        color="success"
                        showValueLabel={true}
                    />
                </div>
            );
        }
        return null
    }, [data.playEpoch, data.depositAmount.depositDate]);

    const ContainPlayGame = useCallback(() => {
        if (Number(data.playGame.amount) > 0 && data.playGame.gameId.length > 0) {
            return (
                <div className="flex flex-col gap-1">
                    <Progress
                        classNames={LavelSize}
                        label={`เล่นเกมส์ ${data?.checkconditions?.games?.games !== "" ? `${data?.checkconditions?.games?.games} ค่าย ${data?.checkconditions?.games?.provider}` : `ค่าย ${data?.checkconditions?.games?.provider}`} ให้ครบ ${data?.playGame?.amount} ครั้ง`}
                        value={calculateProgress(data, 'playGame').cal}
                        valueLabel={`${calculateProgress(data, 'playGame').now} / ${calculateProgress(data, 'playGame').end}`}
                        className="max-w-full"
                        color="primary"
                        showValueLabel={true}
                    />
                </div>
            );
        }

        return null
    }, [data.playGame.amount, data.playGame.gameId.length]);

    const ContainDeposit = useCallback(() => {
        if (data.deposit > 0) {
            return (
                <div className="flex flex-col gap-1">
                    <Progress
                        classNames={LavelSize}
                        label={`ฝากให้ครบ ${data.deposit} บาท`}
                        value={calculateProgress(data, 'deposit').cal}
                        valueLabel={`${calculateProgress(data, 'deposit').now} / ${calculateProgress(data, 'deposit').end}`}
                        className="max-w-full"
                        color="warning"
                        showValueLabel={true}
                    />
                </div>
            );
        }
        return null
    }, [data.deposit]);

    return (
        <div className="flex flex-col gap-2 text-(--text-color)">
            <ContainLimitLevel />
            <ContainBetAmount />
            <ContainbetEpoch />
            <ContainPlayEpoch />
            <ContainDepositAmount />
            <ContainPlayGame />
            <ContainDeposit />
        </div>
    );
}
