import Graph from "../graph";
import { getData } from "../data";
import { GraphLink, GraphNode } from "../graph-items";

const GraphView = () => {
  const data = getData();
  console.log(data);
  return (
    <Graph data={data}>
      <g id="links">
        {data.links.map((link) => (
          <GraphLink key={link.id} {...link} />
        ))}
      </g>
      <g id="nodes">
        {data.nodes.map((node) => (
          <GraphNode key={node.id} {...node} />
        ))}
      </g>
    </Graph>
  );
};

export default GraphView;
