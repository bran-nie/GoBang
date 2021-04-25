import { PieceInfo } from "../components/Board";

// 棋子可以查找的方向
enum DirectionType {
    Top = "top",
    TopRight = "topRight",
    Right = "right",
    RightBottom = "rightBottom",
    Bottom = "bottom",
    BottomLeft = "bottomLeft",
    Left = "left",
    LeftTop = "leftTop",
}
// // 棋子的查找方向规则
interface Direction {
    type: DirectionType;
    rule: number;
    limited?: number[];
}

const judgmentWinner = (pieces: PieceInfo[], index: number): boolean => {
    const MAX_CONTINUOUS = 5; // 棋子最大连续数量
    const directions: Direction[] = [
        {
            type: DirectionType.Top,
            rule: -15,
        },
        {
            type: DirectionType.TopRight,
            rule: -14,
        },
        {
            type: DirectionType.Right,
            rule: 1,
        },
        {
            type: DirectionType.RightBottom,
            rule: 16,
        },
        {
            type: DirectionType.Bottom,
            rule: 15,
        },
        {
            type: DirectionType.BottomLeft,
            rule: 14,
        },
        {
            type: DirectionType.Left,
            rule: -1,
        },
        {
            type: DirectionType.LeftTop,
            rule: -16,
        },
    ];

    /**
     *
     * @param pieces 棋盘信息
     * @param pieceType 棋子类型
     * @param direction 查找方向及规则
     * @param index 当前棋子在棋盘中下标值
     * @param prevRow 前一个棋子所在的行数
     * @param count 匹配到的次数
     * @returns  boolean
     */
    const def = (
        pieces: PieceInfo[],
        pieceType: PieceInfo["type"],
        direction: Direction,
        index: number,
        prevRow: number | undefined,
        count: number
    ): boolean => {
        // debugger;
        // 上下查找时，超出棋盘范围，则终止。这个也是任何方向查找的前提。
        if (index < 0 || index > 224) {
            return count === MAX_CONTINUOUS;
        }

        // 当前棋子的信息。
        const curPiece = pieces[index];
        const curRow = curPiece.position?.row as number;

        // 如果类型不同，则终止查找
        if (curPiece.type !== pieceType) {
            return count === MAX_CONTINUOUS;
        }

        // 如果存在上一个棋子的查找，则需要判断是否出界

        if (prevRow) {
            // 左右查找时，不在同一行，则终止
            if (
                (direction.type === DirectionType.Left ||
                    direction.type === DirectionType.Right) &&
                prevRow !== curRow
            ) {
                return count === MAX_CONTINUOUS;
            }

            // 左倾斜查找时，相隔行大于1，则终止
            if (
                (direction.type === DirectionType.LeftTop ||
                    direction.type === DirectionType.RightBottom) &&
                Math.abs(curRow - prevRow) > 1
            ) {
                return count === MAX_CONTINUOUS;
            }
            // 右倾斜查找时，在同一行，则终止
            if (
                (direction.type === DirectionType.TopRight ||
                    direction.type === DirectionType.BottomLeft) &&
                prevRow === curRow
            ) {
                return count === MAX_CONTINUOUS;
            }
        }
        count++;
        if (count === MAX_CONTINUOUS) {
            return true;
        }
        return def(
            pieces,
            pieceType,
            direction,
            index + direction.rule,
            curRow,
            count
        );
    };

    const { type } = pieces[index];
    const r = directions.some((direction) => {
        return def(pieces, type, direction, index, undefined, 0);
    });
    return r;
};

export default judgmentWinner;
