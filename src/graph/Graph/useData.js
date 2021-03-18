import { useRef, useEffect } from "react";

const useData = (data) => {
  const nodesRef = useRef([]);
  const linksRef = useRef([]);

  useEffect(() => {
    console.log("Update nodes/links");

    nodesRef.current = data.nodes.map((d) => Object.create(d));
    linksRef.current = data.links.map((d) => Object.create(d));
  }, [data]);

  return {
    nodes: nodesRef.current,
    links: linksRef.current,
  };
};

export { useData };
