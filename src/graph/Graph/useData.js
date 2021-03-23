import { useRef, useState, useEffect, useCallback } from "react";
import { isEqual } from "lodash";

export const useData = ({ data, onPositionsChange }) => {
  console.log("useData: Run", data.nodes.length);

  const dataRef = useRef();
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const updatePositions = useCallback(() => {
    const positions = nodes.reduce((acc, { id, x, y }) => {
      acc[id] = { x, y };
      return acc;
    }, {});

    onPositionsChange(positions);
  }, [onPositionsChange, nodes]);

  useEffect(() => {
    console.log("useData: New data", data.nodes.length);

    if (isEqual(dataRef.current, data)) return;

    console.log("useData: New data is different", data.nodes.length);
    dataRef.current = data;

    setNodes((currentNodes) => {
      return data.nodes.map((node) => {
        const current = currentNodes.find((c) => c.id === node.id);
        return current || Object.create(node);
      });
    });

    setLinks((currentLinks) => {
      return data.links.map((link) => {
        const current = currentLinks.find((c) => c.id === link.id);
        return current || Object.create(link);
      });
    });
  }, [data, setNodes, setLinks]);

  return {
    nodes,
    links,
    updatePositions,
  };
};
