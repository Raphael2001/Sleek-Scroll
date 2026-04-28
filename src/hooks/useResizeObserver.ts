import { RefObject, useEffect, useRef } from "react";

function useResizeObserver(
  ref: RefObject<HTMLElement>,
  onSizeChange: () => void
) {
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
