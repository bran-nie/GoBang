import React from "react";
import { PieceInfo } from "../Board/index";

import "./index.less";

export interface WinnerInfo {
    type: PieceInfo["type"];
    name: string;
}

export interface GameInfoProps {
    isBlackPlayer: boolean;
    winner: WinnerInfo | undefined;
    initGame: () => void;
}
export default (props: GameInfoProps) => {
    const { isBlackPlayer, winner, initGame } = props;
    return (
        <section className="game-info" style={{ textAlign: "center" }}>
            <span className="current-player">
                当前执棋：{isBlackPlayer ? "黑棋" : "白棋"}
            </span>
            {winner && (
                <>
                    <span className="winner">
                        恭喜 {winner.name} 执{isBlackPlayer ? "黑棋" : "白棋"}
                        取得胜利～
                    </span>

                    <button onClick={initGame}>再来一局</button>
                </>
            )}
        </section>
    );
};
