import { useEffect, useState } from "react";

import Graph from "../graph";
import { getData } from "../data";
import { GraphLink, GraphNode } from "../graph-items";

const EXCLUDE_IDS = ["Woman2", "Simplice", "Toussaint"];

const GraphView = () => {
  console.log("GraphView: Render");

  const [data, setData] = useState(getData());
  const [isExclude, setIsExclude] = useState(true);

  const handleToggleExclude = () => {
    setIsExclude((current) => !current);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const links = data.links.filter(({ source, target }) => {
    if (isExclude) {
      return !EXCLUDE_IDS.includes(source) && !EXCLUDE_IDS.includes(target);
    } else {
      return true;
    }
  });

  const nodes = data.nodes.filter(
    ({ id }) => !isExclude || !EXCLUDE_IDS.includes(id)
  );

  return (
    <>
      <aside>
        <h2>Remove</h2>
        <p></p>
        <p>
          <input
            id="exclude"
            type="checkbox"
            onChange={handleToggleExclude}
            checked={isExclude}
          />{" "}
          <label htmlFor="exclude">Remove some nodes</label>
        </p>
      </aside>
      <div style={{ height: "50vh" }}>
        <Graph data={{ nodes, links }}>
          {links.map((link) => (
            <GraphLink key={link.id} {...link} />
          ))}
          {nodes.map((node) => (
            <GraphNode key={node.id} {...node} />
          ))}
        </Graph>
      </div>
    </>
  );
};

export default GraphView;
