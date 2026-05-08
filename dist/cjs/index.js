"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollbarSide = void 0;
const react_1 = __importStar(require("react"));
const useResizeObserver_1 = __importDefault(require("./hooks/useResizeObserver"));
require("../styles/scrollbar.css");
exports.ScrollbarSide = {
    left: "left",
    right: "right",
};
const prefix = "sleek-scroll";
function SleekScrollbar({ children, side = exports.ScrollbarSide.right, thumbMinHeight = 20 }) {
    // Refs for DOM elements
    const trackRef = (0, react_1.useRef)(null);
    const thumbRef = (0, react_1.useRef)(null);
    const contentContainerRef = (0, react_1.useRef)(null);
    const contentRef = (0, react_1.useRef)(null);
    // State to manage scrollbar properties
    const [shouldHideScrollbar, setShouldHideScrollbar] = (0, react_1.useState)(false);
    const [thumbHeight, setThumbHeight] = (0, react_1.useState)(thumbMinHeight);
    // Custom hook to observe size changes in content and container
    (0, useResizeObserver_1.default)(contentRef, () => measureContent());
    (0, useResizeObserver_1.default)(contentContainerRef, () => measureContent());
    // Measure content size on initial render
    (0, react_1.useEffect)(() => {
        measureContent();
    }, []);
    // Handle content scroll to update thumb position
    const handleScrollContent = (0, react_1.useCallback)(() => {
        const thumbEle = thumbRef.current;
        const contentEle = contentContainerRef.current;
        if (!thumbEle || !contentEle)
            return;
        const scrollableHeight = contentEle.scrollHeight - contentEle.clientHeight;
        if (scrollableHeight <= 0)
            return;
        const scrollRatio = contentEle.scrollTop / scrollableHeight;
        // Map the 0-1 scroll ratio to the available travel distance of the thumb
        const top = scrollRatio * (100 - thumbHeight);
        thumbEle.style.top = `${top}%`;
    }, [thumbHeight]);
    // Handle click on the scrollbar track to jump to the clicked position
    const handleClickTrack = (e) => {
        const trackEle = trackRef.current;
        const contentEle = contentContainerRef.current;
        if (!trackEle || !contentEle)
            return;
        const bound = trackEle.getBoundingClientRect();
        const clickPosRatio = (e.clientY - bound.top) / bound.height;
        // We want to center the thumb on the click position
        const thumbHeightRatio = thumbHeight / 100;
        const scrollRatio = (clickPosRatio - thumbHeightRatio / 2) / (1 - thumbHeightRatio);
        const clampedRatio = Math.max(0, Math.min(1, scrollRatio));
        contentEle.scrollTop = clampedRatio * (contentEle.scrollHeight - contentEle.clientHeight);
    };
    // Measure the content size and adjust scrollbar visibility and thumb size
    function measureContent() {
        const thumbEle = thumbRef.current;
        const contentEle = contentContainerRef.current;
        if (!thumbEle || !contentEle)
            return;
        const scrollRatio = contentEle.clientHeight / contentEle.scrollHeight;
        if (scrollRatio < 1) {
            setShouldHideScrollbar(false);
            const newThumbHeight = Math.max(scrollRatio * 100, thumbMinHeight);
            setThumbHeight(newThumbHeight);
            thumbEle.style.height = `${newThumbHeight}%`;
            // Update position immediately to reflect new height
            const scrollableHeight = contentEle.scrollHeight - contentEle.clientHeight;
            if (scrollableHeight > 0) {
                const currentScrollRatio = contentEle.scrollTop / scrollableHeight;
                thumbEle.style.top = `${currentScrollRatio * (100 - newThumbHeight)}%`;
            }
        }
        else {
            setShouldHideScrollbar(true);
        }
    }
    // Handle mouse drag on the scrollbar thumb
    const handleMouseDown = (0, react_1.useCallback)((e) => {
        const ele = thumbRef.current;
        const trackEle = trackRef.current;
        const contentEle = contentContainerRef.current;
        if (!ele || !contentEle || !trackEle)
            return;
        const startPos = {
            top: contentEle.scrollTop,
            y: e.clientY,
        };
        // Move the thumb and scroll content as the mouse moves
        const handleMouseMove = (e) => {
            const dy = e.clientY - startPos.y;
            const trackHeight = trackEle.clientHeight;
            const scrollableHeight = contentEle.scrollHeight - contentEle.clientHeight;
            // The distance the thumb can actually move in pixels
            const thumbTravel = trackHeight * (1 - thumbHeight / 100);
            if (thumbTravel <= 0)
                return;
            contentEle.scrollTop = startPos.top + (dy / thumbTravel) * scrollableHeight;
            updateCursor(ele);
        };
        // Clean up event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            resetCursor(ele);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    }, [thumbHeight]);
    // Handle touch drag on the scrollbar thumb
    const handleTouchStart = (0, react_1.useCallback)((e) => {
        const ele = thumbRef.current;
        const trackEle = trackRef.current;
        const contentEle = contentContainerRef.current;
        if (!ele || !contentEle || !trackEle)
            return;
        const touch = e.touches[0];
        const startPos = {
            top: contentEle.scrollTop,
            y: touch.clientY,
        };
        // Move the thumb and scroll content as the touch moves
        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            const dy = touch.clientY - startPos.y;
            const trackHeight = trackEle.clientHeight;
            const scrollableHeight = contentEle.scrollHeight - contentEle.clientHeight;
            const thumbTravel = trackHeight * (1 - thumbHeight / 100);
            if (thumbTravel <= 0)
                return;
            contentEle.scrollTop = startPos.top + (dy / thumbTravel) * scrollableHeight;
            updateCursor(ele);
        };
        // Clean up event listeners on touch end
        const handleTouchEnd = () => {
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
            resetCursor(ele);
        };
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleTouchEnd);
    }, [thumbHeight]);
    // Update the cursor style to prevent text selection during drag
    const updateCursor = (ele) => {
        ele.style.userSelect = "none";
        document.body.style.userSelect = "none";
    };
    // Reset the cursor style after drag ends
    const resetCursor = (ele) => {
        ele.style.userSelect = "";
        document.body.style.userSelect = "";
    };
    return (react_1.default.createElement("div", { className: `${prefix}__wrapper` },
        react_1.default.createElement("div", { className: `${prefix}__content`, ref: contentContainerRef, onScroll: handleScrollContent },
            react_1.default.createElement("div", { ref: contentRef }, children)),
        react_1.default.createElement("div", { className: `${prefix}__bar ${shouldHideScrollbar ? `${prefix}__bar--hidden` : ""} ${prefix}__bar--${side}` },
            react_1.default.createElement("div", { className: `${prefix}__track`, ref: trackRef, onClick: (e) => handleClickTrack(e.nativeEvent) }),
            react_1.default.createElement("div", { className: `${prefix}__thumb`, ref: thumbRef, onMouseDown: (e) => handleMouseDown(e.nativeEvent), onTouchStart: (e) => handleTouchStart(e.nativeEvent) }))));
}
exports.default = SleekScrollbar;
