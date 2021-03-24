import { useEffect, useState } from "react";

import { Graph } from "../graph";

import { GraphLink, GraphNode } from "../graph-items";
import RenderDataMenu from "./RenderDataMenu";

const EXCLUDE_IDS = ["Woman2", "Simplice", "Toussaint"];

const GraphView = ({ data }) => {
  console.log("GraphView: Render");

  const [cleanedData, setCleanedData] = useState();

  const [isExclude, setIsExclude] = useState(
    Math.random() > 0.5 ? true : false
  );

  useEffect(() => {
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

    setCleanedData({ nodes, links });
  }, [data, isExclude]);

  return (
    <>
      <RenderDataMenu
        isExclude={isExclude}
        onExcludeToggle={() => setIsExclude((current) => !current)}
      />
      <div style={{ height: "50vh", background: "yellow" }}>
        {cleanedData && (
          <Graph data={cleanedData}>
            {cleanedData.links.map((link) => (
              <GraphLink key={link.id} {...link} />
            ))}
            {cleanedData.nodes.map((node) => (
              <GraphNode key={node.id} {...node} />
            ))}
          </Graph>
        )}
      </div>
    </>
  );
};

export default GraphView;
