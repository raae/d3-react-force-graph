import { useRef, useState, useEffect } from "react";
import { isEqual } from "lodash";

const useData = (data) => {
  console.log("useData: Run", data.nodes.length);

  const dataRef = useRef();
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

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
  };
};

export { useData };
