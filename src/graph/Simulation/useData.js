import { useRef, useState, useEffect, useCallback } from "react";
import { isEqual } from "lodash";

export const useData = (data, { onPositionsChange }) => {
  console.log("useData: Run", data.nodes.length);

  const dataRef = useRef({ nodes: [], links: [] });
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [threshold, setThreshold] = useState(1);

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

    console.log(
      "useData: New data is different",
      dataRef.current.nodes.length,
      data.nodes.length
    );

    if (dataRef.current.nodes.length === 0) {
      setThreshold(1);
    } else {
      setThreshold(0.4);
    }

    dataRef.current = data;

    // Preserve nodes that are already d3 objects
    setNodes((currentNodes) => {
      return data.nodes.map((node) => {
        const current = currentNodes.find((c) => c.id === node.id);
        return current || Object.create(node);
      });
    });

    // Preserve links that are already d3 objects
    setLinks((currentLinks) => {
      return data.links.map((link) => {
        const current = currentLinks.find((c) => c.id === link.id);
        return current || Object.create(link);
      });
    });
  }, [data, setNodes, setLinks, setThreshold]);

  return {
    nodes,
    links,
    threshold,
    updatePositions,
  };
};
