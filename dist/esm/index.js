import React, { useCallback, useEffect, useRef, useState } from "react";
import useResizeObserver from "./hooks/useResizeObserver";
import "./styles/scrollbar.css";
export const ScrollbarSide = {
    left: "left",
    right: "right",
};
const prefix = "sleek-scroll";
function SleekScrollbar({ children, side = ScrollbarSide.right, thumbMinHeight = 20 }) {
    // Refs for DOM elements
    const trackRef = useRef(null);
    const thumbRef = useRef(null);
    const contentContainerRef = useRef(null);
    const contentRef = useRef(null);
    // State to manage scrollbar properties
    const [shouldHideScrollbar, setShouldHideScrollbar] = useState(false);
    const [thumbHeight, setThumbHeight] = useState(thumbMinHeight);
    // Custom hook to observe size changes in content and container
    useResizeObserver(contentRef, () => measureContent());
    useResizeObserver(contentContainerRef, () => measureContent());
    // Measure content size on initial render
    useEffect(() => {
        measureContent();
    }, []);
    // Handle content scroll to update thumb position
    const handleScrollContent = useCallback(() => {
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
    const handleMouseDown = useCallback((e) => {
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
    const handleTouchStart = useCallback((e) => {
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
    return (React.createElement("div", { className: `${prefix}__wrapper` },
        React.createElement("div", { className: `${prefix}__content`, ref: contentContainerRef, onScroll: handleScrollContent },
            React.createElement("div", { ref: contentRef }, children)),
        React.createElement("div", { className: `${prefix}__bar ${shouldHideScrollbar ? `${prefix}__bar--hidden` : ""} ${prefix}__bar--${side}` },
            React.createElement("div", { className: `${prefix}__track`, ref: trackRef, onClick: (e) => handleClickTrack(e.nativeEvent) }),
            React.createElement("div", { className: `${prefix}__thumb`, ref: thumbRef, onMouseDown: (e) => handleMouseDown(e.nativeEvent), onTouchStart: (e) => handleTouchStart(e.nativeEvent) }))));
}
export default SleekScrollbar;
