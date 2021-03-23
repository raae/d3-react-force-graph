import {
  useState,
  createContext,
  useContext,
  useCallback,
  useRef,
} from "react";
import { Graph as D3Graph } from "./Graph";
import { useDimensions } from "./useDimentions";

// Create a graph context holding positions so that
// useSimulation does not need to know about the
// dom structure of links and nodes to change their position.

const GraphContext = createContext();
export const useGraphContext = () => useContext(GraphContext);

export const Graph = (props) => {
  const ref = useRef();
  const dimensions = useDimensions({ ref });

  const [positions, setPositions] = useState({});

  const handlePositionsChange = useCallback((newPositions) => {
    setPositions(newPositions);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "floralwhite",
      }}
      ref={ref}
    >
      <GraphContext.Provider value={positions}>
        <D3Graph
          {...props}
          {...dimensions}
          onPositionsChange={handlePositionsChange}
        />
      </GraphContext.Provider>
    </div>
  );
};
