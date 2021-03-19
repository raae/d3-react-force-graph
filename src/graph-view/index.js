import { useEffect, useState } from "react";

import Graph from "../graph";
import { getData } from "../data";
import { GraphLink, GraphNode } from "../graph-items";
import { mapValues } from "lodash";

const GraphView = () => {
  console.log("GraphView: Render");

  const [data, setData] = useState(getData());
  const [values, setValues] = useState({
    Woman2: false,
    Simplice: true,
    Toussaint: false,
  });

  const excludeIds = Object.keys(values).filter((key) => values[key]);

  const handleChange = (name) => (event) => {
    setValues((current) => {
      return { ...current, [name]: !current[name] };
    });
  };

  const handleChangeAll = (checked) => () => {
    setValues((current) => {
      return mapValues(current, () => checked);
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const links = data.links.filter(
    ({ source, target }) =>
      !excludeIds.includes(source) && !excludeIds.includes(target)
  );

  const nodes = data.nodes.filter(({ id }) => !excludeIds.includes(id));

  return (
    <>
      <aside>
        <h2>Remove</h2>
        <p></p>
        <p>
          <button onClick={handleChangeAll(true)}>Remove all</button>{" "}
          <button onClick={handleChangeAll(false)}>Add all</button>
        </p>
        {Object.keys(values).map((key) => (
          <p key={key}>
            <input
              type="checkbox"
              id={key}
              onChange={handleChange(key)}
              checked={values[key]}
            />
            <label htmlFor={key}>{key}</label>
          </p>
        ))}
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
