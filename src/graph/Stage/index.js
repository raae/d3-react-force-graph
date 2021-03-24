import { useEffect, useRef, useState, useContext, createContext } from "react";

const Context = createContext(null);

const Stage = ({ width, height, children }) => {
  const svgRef = useRef(null);
  const [svgElement, setSvgElement] = useState(null);
  useEffect(() => setSvgElement(svgRef.current), []);

  const value = { svgElement, width, height };

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
    >
      <Context.Provider value={value}>{children}</Context.Provider>
    </svg>
  );
};

const useStage = () => {
  return useContext(Context);
};

export { Stage, useStage };
