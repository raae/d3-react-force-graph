import { useState, createContext, useContext, useCallback } from "react";
import { Graph as D3Graph } from "./Graph";

// Create a graph context holding positions so that
// useSimulation does not need to know about the
// dom structure of links and nodes to change their position.

const GraphContext = createContext();
export const useGraphContext = () => useContext(GraphContext);

export const Graph = (props) => {
  const [positions, setPositions] = useState({});

  const handlePositionsChange = useCallback((newPositions) => {
    setPositions(newPositions);
  }, []);

  return (
    <GraphContext.Provider value={positions}>
      <D3Graph {...props} onPositionsChange={handlePositionsChange} />
    </GraphContext.Provider>
  );
};
