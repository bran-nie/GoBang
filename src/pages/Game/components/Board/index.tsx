import React from "react";

import "./index.less";

export interface PiecePosition {
    row: number;
    col: number;
}
export interface PieceInfo {
    type: "white" | "black" | undefined;
    index?: number;
    position?: PiecePosition;
}

interface SquareProps {
    value: number;
    onClick: (val: number, position: PiecePosition) => void;
    piece: PieceInfo;
    tagPiece: number[];
    position: {
        row: number;
        col: number;
    };
}
const Square = (props: SquareProps) => {
    const { value, onClick, piece, tagPiece, position } = props;

    return (
        <span
            data-value={value}
            className="board-square"
            style={{ pointerEvents: piece.type ? "none" : "auto" }}
        >
            <div
                className={`piece ${tagPiece.includes(value) ? "tag" : ""} ${
                    piece.type
                }`}
                onClick={() => onClick(value, position)}
            ></div>
        </span>
    );
};

export interface BoardProps {
    rowLen: number;
    colLen: number;
    handleSquareOnClick: (val: number, position: PiecePosition) => void;
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
                            position={{ row, col }}
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
