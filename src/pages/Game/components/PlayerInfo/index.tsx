import React from "react";

import "./index.less";

export interface PlayerInfoProps {
    type: "black" | "white";
    name: string;
    position?: "left" | "right";
}

export default (props: PlayerInfoProps) => {
    const { type, name, position = "left" } = props;
    return (
        <div className={`chess-player ${position}`}>
            <i className={`piece-type ${type}`}></i>
            <span className="player-name">{name}</span>
        </div>
    );
};
