import React, { useState } from "react";
import "./index.less";

import GameInfo, {
    GameInfoProps,
    WinnerInfo,
} from "./components/GameInfo/index";
import PlayerInfo from "./components/PlayerInfo/index";
import Board, {
    BoardProps,
    PieceInfo,
    PiecePosition,
} from "./components/Board/index";
import judgmentWinner from "./judgment";

const BOARD_LEN = 15;
const TAG_PIECE = [48, 56, 112, 168, 176];

export default () => {
    const [pieces, setPieces] = useState<PieceInfo[]>(
        Array(BOARD_LEN * BOARD_LEN).fill({ type: undefined })
    );
    const [isBlackNext, setIsBlackNext] = useState<boolean>(true);
    const [result, setResult] = useState<WinnerInfo | undefined>(undefined);

    const initGame = () => {
        // 初始化棋盘
        setPieces(Array(BOARD_LEN * BOARD_LEN).fill({ type: undefined }));
        // 初始化黑棋先手
        setIsBlackNext(true);
        // 初始化对局结果
        setResult(undefined);
    };

    const boardConfig: BoardProps = {
        rowLen: BOARD_LEN,
        colLen: BOARD_LEN,
        handleSquareOnClick: (val: number, position: PiecePosition) => {
            console.log("click", val);
            console.log(pieces[val]);

            // 如果点击的位置已有棋子，或者对局已经结束，则不能落棋，亦不做结果判定
            if (pieces[val].type || result) return;

            const curType = isBlackNext ? "black" : "white";

            const copyPieces = pieces.slice();
            const piece: PieceInfo = {
                type: curType,
                index: val,
                position,
            };
            copyPieces[val] = piece;

            setPieces(copyPieces);

            // 每次落棋，做结果判定。
            const isWinner = judgmentWinner(copyPieces, val);
            console.log(isWinner);

            if (isWinner) {
                setResult({
                    type: curType,
                    name: "Bran",
                });
            } else {
                setIsBlackNext(!isBlackNext);
            }
        },
        pieces,
        tagPiece: TAG_PIECE,
    };

    const gameInfoConfig: GameInfoProps = {
        isBlackPlayer: isBlackNext,
        winner: result,
        initGame,
    };
    return (
        <div className="container">
            <GameInfo {...gameInfoConfig} />
            <PlayerInfo type="black" name="电脑" />
            <Board {...boardConfig} />
            <PlayerInfo type="white" name="Bran" position="right" />
        </div>
    );
};
