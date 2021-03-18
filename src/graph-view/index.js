import { useEffect, useState } from "react";

import Graph from "../graph";
import { getData } from "../data";
import { GraphLink, GraphNode } from "../graph-items";

const GraphView = () => {
  const [data, setData] = useState(getData());

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <Graph data={data}>
      {data.links.map((link) => (
        <GraphLink key={link.id} {...link} />
      ))}
      {data.nodes.map((node) => (
        <GraphNode key={node.id} {...node} />
      ))}
    </Graph>
  );
};

export default GraphView;
