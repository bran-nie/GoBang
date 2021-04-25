import { PieceInfo } from "./components/Board";

const MAX_CONTINUOUS = 5; // 棋子最大连续数量

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
// 棋子可以查找的方向
enum DirectionTypeRule {
    Top = -15,
    TopRight = -14,
    Right = 1,
    RightBottom = 16,
    Bottom = 15,
    BottomLeft = 14,
    Left = -1,
    LeftTop = -16,
}
// // 棋子的查找方向规则
interface Direction {
    type: DirectionType;
    rule: DirectionTypeRule;
}

/**
 * 判定此次棋子是否越界。
 * @param directionType 判定方向
 * @param curRow 当前棋子所在行
 * @param prevRow 前一次判定棋子所在行
 * @returns 改判定方向上，棋子是否越界
 */
const checkOutOfBounds = (
    directionType: DirectionType,
    curRow: number,
    prevRow: number
): boolean => {
    let isOut = false;
    switch (directionType) {
        // 左右连续判定，两次棋子不在同一行，则越出棋盘。
        case DirectionType.Left:
        case DirectionType.Right:
            isOut = curRow !== prevRow;
            break;
        // 左倾斜连续判定，两次棋子行数相同，则为越出棋盘
        case DirectionType.TopRight:
        case DirectionType.BottomLeft:
            isOut = curRow === prevRow;
            break;
        // 右倾斜连续判定，两次棋子行数差大于 1 行，则越出棋盘
        case DirectionType.LeftTop:
        case DirectionType.RightBottom:
            isOut = Math.abs(curRow - prevRow) > 1;
            break;
        case DirectionType.Top:
        case DirectionType.Bottom:
            isOut = curRow === prevRow;
            break;
    }
    return isOut;
};

/**
 *
 * @param pieces 棋盘信息
 * @param pieceType 棋子类型
 * @param direction 查找方向及规则
 * @param index 当前棋子在棋盘中下标值
 * @param prevRow 前一个棋子所在的行数
 * @param pieceCount 匹配到的次数
 * @returns  boolean
 */
const defSearch = (
    pieces: PieceInfo[],
    pieceType: PieceInfo["type"],
    direction: Direction,
    index: number,
    prevRow: number,
    pieceCount: number
): number => {
    // debugger;
    // 上下查找时，超出棋盘范围，则终止。这个也是任何方向查找的前提。
    if (index < 0 || index > 224) {
        return pieceCount;
    }

    // 当前棋子的信息。
    const curPiece = pieces[index];

    // 如果类型不同，则终止查找
    if (curPiece.type !== pieceType) {
        return pieceCount;
    }
    const curRow = curPiece.position?.row as number;

    // 如果存在上一个棋子的查找，则需要判断是否出界
    const isOut = checkOutOfBounds(direction.type, curRow, prevRow);
    if (isOut) {
        return pieceCount;
    }
    pieceCount++;
    if (pieceCount === MAX_CONTINUOUS) {
        return pieceCount;
    }
    return defSearch(
        pieces,
        pieceType,
        direction,
        index + direction.rule,
        curRow,
        pieceCount
    );
};

/**
 * 判定棋子所属方是否胜利
 *
 * @param pieces 棋盘数据
 * @param pieceIndex 开始判定的棋子在棋盘中的位置
 * @returns boolean 该棋子所属方是否胜利
 */
const judgmentWinner = (pieces: PieceInfo[], pieceIndex: number): boolean => {
    /**
     * 水波算法(自己瞎起的名字，不过应该有专有的名字吧 0.0)
     * waveDirections 数据依赖
     * 为何叫水波算法呢，因为我们把棋盘看成一个池塘，落棋如丢石子，那么，当你丢下一个石头，它是不是就会激起一层涟漪(咦，
     * 故，当我们在棋盘上面落棋后，就要判定它的符合规则的方向上面，是否满足五连子。
     * 在上面定义了规则方向[DirectionType]有：上下左右，以及两个斜边。
     * 那么，就要同时判定上下，左右，左斜边，右斜边。
     */
    const waveDirections: Direction[][] = [
        [
            {
                type: DirectionType.Top,
                rule: DirectionTypeRule.Top,
            },
            {
                type: DirectionType.Bottom,
                rule: DirectionTypeRule.Bottom,
            },
        ],
        [
            {
                type: DirectionType.Left,
                rule: DirectionTypeRule.Left,
            },
            {
                type: DirectionType.Right,
                rule: DirectionTypeRule.Right,
            },
        ],
        [
            {
                type: DirectionType.TopRight,
                rule: DirectionTypeRule.TopRight,
            },
            {
                type: DirectionType.BottomLeft,
                rule: DirectionTypeRule.BottomLeft,
            },
        ],
        [
            {
                type: DirectionType.RightBottom,
                rule: DirectionTypeRule.RightBottom,
            },
            {
                type: DirectionType.LeftTop,
                rule: DirectionTypeRule.LeftTop,
            },
        ],
    ];

    const { type, position } = pieces[pieceIndex];

    const waveResult = waveDirections.some((waveDirection) => {
        // 使用 reduce 得到一个规则方向上的棋子数量
        const pieceCount = waveDirection.reduce((pieceCount, curDirection) => {
            const nextIndex = pieceIndex + curDirection.rule;
            const pieceRow = position?.row as number;
            const c = defSearch(
                pieces,
                type,
                curDirection,
                nextIndex,
                pieceRow,
                0
            );
            return pieceCount + c;
        }, 1);

        return pieceCount >= MAX_CONTINUOUS;
    });

    return waveResult;
};

export default judgmentWinner;
