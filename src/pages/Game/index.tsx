import React, { useState } from "react";
import "./index.less";

import Board, { BoardProps, PieceInfo } from "./components/Board";

const BOARD_LEN = 15;
const TAG_PIECE = [48, 56, 112, 168, 176];

export default () => {
    const [pieces, setPieces] = useState<PieceInfo[]>(
        Array(BOARD_LEN * BOARD_LEN).fill({ type: "" })
    );
    const [isBlackNext, setIsBlackNext] = useState<boolean>(true);

    const boardConfig: BoardProps = {
        rowLen: BOARD_LEN,
        colLen: BOARD_LEN,
        handleSquareOnClick: (val) => {
            console.log("click", val);

            // console.log(pieces);

            console.log(pieces[val]);
            if (pieces[val].type === "") {
                const copyPieces = pieces.slice();
                const piece: PieceInfo = {
                    type: isBlackNext ? "black" : "white",
                };
                copyPieces[val] = piece;

                setIsBlackNext(!isBlackNext);
                setPieces(copyPieces);
            }
        },
        pieces,
        tagPiece: TAG_PIECE,
    };
    return (
        <div className="container">
            <Board {...boardConfig} />
        </div>
    );
};
