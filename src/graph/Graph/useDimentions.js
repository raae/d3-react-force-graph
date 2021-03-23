import { useEffect, useState } from "react";

export const useDimensions = (props) => {
  const { ref } = props;

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, [ref]);

  return { ref, width, height };
};
