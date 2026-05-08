import { useEffect, useRef } from "react";
function useResizeObserver(ref, onSizeChange) {
    const onSizeChangeRef = useRef(onSizeChange);
    useEffect(() => {
        onSizeChangeRef.current = onSizeChange;
    });
    useEffect(() => {
        const ro = new ResizeObserver(() => {
            onSizeChangeRef.current();
        });
        if (ref.current) {
            ro.observe(ref.current);
            return () => ro.disconnect();
        }
    }, [ref]);
}
export default useResizeObserver;
