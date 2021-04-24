import React from "react";

import "./Board.less";

export interface PieceInfo {
    type: "white" | "black" | "";
}

interface SquareProps {
    value: number;
    onClick: (val: number) => void;
    piece: PieceInfo;
    tagPiece: number[];
}
const Square = (props: SquareProps) => {
    const { value, onClick, piece, tagPiece } = props;

    return (
        <span data-value={value} className="board-square">
            <div
                className={`piece ${tagPiece.includes(value) ? "tag" : ""} ${
                    piece.type
                }`}
                onClick={() => onClick(value)}
            ></div>
        </span>
    );
};

export interface BoardProps {
    rowLen: number;
    colLen: number;
    handleSquareOnClick: (val: number) => void;
    pieces: PieceInfo[];
    tagPiece: number[];
}

export default (props: BoardProps) => {
    const { rowLen, colLen, handleSquareOnClick, pieces, tagPiece } = props;

    const rows = Array(rowLen).fill("");
    const cols = Array(rowLen).fill("");

    const renderBoardRow = (row: number) => {
        return (
            <div className="board-row" key={row}>
                {cols.map((_, col) => {
                    const currentIndex = row * colLen + col;
                    return (
                        <Square
                            value={currentIndex}
                            piece={pieces[currentIndex]}
                            onClick={handleSquareOnClick}
                            tagPiece={tagPiece}
                            key={col}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="board-container">
            {rows.map((_, row) => {
                return renderBoardRow(row);
            })}
        </div>
    );
};
