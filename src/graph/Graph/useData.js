import { useRef, useEffect } from "react";

const useData = (data) => {
  const nodesRef = useRef([]);
  const linksRef = useRef([]);

  useEffect(() => {
    console.log("Update nodes/links");

    nodesRef.current = data.nodes.map((node) => {
      const current = nodesRef.current.find((c) => c.id === node.id);
      return current || node;
    });
    linksRef.current = data.links.map((link) => {
      const current = nodesRef.current.find((c) => c.id === link.id);
      return current || link;
    });
  }, [data]);

  return {
    nodes: nodesRef.current,
    links: linksRef.current,
  };
};

export { useData };
