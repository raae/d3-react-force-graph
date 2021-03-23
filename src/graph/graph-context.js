import { createContext, useState, useContext, useCallback } from "react";

const GraphStateContext = createContext();
const GraphUpdaterContext = createContext();

const GraphProvider = ({ children }) => {
  const [state, setState] = useState({
    positions: {},
    brushedIds: [],
  });

  return (
    <GraphStateContext.Provider value={state}>
      <GraphUpdaterContext.Provider value={setState}>
        {children}
      </GraphUpdaterContext.Provider>
    </GraphStateContext.Provider>
  );
};

const useGraphState = () => {
  const state = useContext(GraphStateContext);
  if (typeof state === "undefined") {
    throw new Error("useGraphState must be used within a GraphProvider");
  }
  return state;
};

const useGraphUpdater = () => {
  const setState = useContext(GraphUpdaterContext);
  if (typeof setState === "undefined") {
    throw new Error("useGraphUpdater must be used within a GraphProvider");
  }

  const setPositions = useCallback(
    (positions) => {
      setState((state) => ({ ...state, positions }));
    },
    [setState]
  );

  const setBrushedIds = useCallback(
    (brushedIds) => {
      setState((state) => ({ ...state, brushedIds }));
    },
    [setState]
  );

  return { setPositions, setBrushedIds };
};

export { GraphProvider, useGraphState, useGraphUpdater };
