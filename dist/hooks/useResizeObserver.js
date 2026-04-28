"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useResizeObserver(ref, onSizeChange) {
    const onSizeChangeRef = (0, react_1.useRef)(onSizeChange);
    (0, react_1.useEffect)(() => {
        onSizeChangeRef.current = onSizeChange;
    });
    (0, react_1.useEffect)(() => {
        const ro = new ResizeObserver(() => {
            onSizeChangeRef.current();
        });
        if (ref.current) {
            ro.observe(ref.current);
            return () => ro.disconnect();
        }
    }, [ref]);
}
exports.default = useResizeObserver;
