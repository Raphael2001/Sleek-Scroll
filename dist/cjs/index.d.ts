import React from "react";
import "../styles/scrollbar.css";
export declare const ScrollbarSide: {
    readonly left: "left";
    readonly right: "right";
};
type Side = (typeof ScrollbarSide)[keyof typeof ScrollbarSide];
type Props = {
    children: React.ReactElement;
    side?: Side;
    thumbMinHeight?: number;
};
declare function SleekScrollbar({ children, side, thumbMinHeight }: Props): React.JSX.Element;
export default SleekScrollbar;
