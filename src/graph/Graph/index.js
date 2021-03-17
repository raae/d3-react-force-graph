import { useRef } from "react";
import * as d3 from "d3";
import { useGraphDimensions } from "../utils";

const Graph = ({ data }) => {
  const { ref: containerRef, height, width } = useGraphDimensions();
  const ref = useRef();
  const simRef = useRef();

  // const links = data.links.map((d) => Object.create(d));
  // const nodes = data.nodes.map((d) => Object.create(d));
  const { links, nodes } = data;

  if (ref.current) {
    const stage = d3.select(ref.current);

    const link = stage
      .selectAll("line")
      .data(links)
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const node = stage
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 5)
      .attr("fill", "blue");
    // .call(drag(simulation));

    node.append("title").text((d) => d.id);

    const distance = Math.random() * 1000;
    if (simRef.current) {
      simRef.current
        .force(
          "link",
          d3
            .forceLink(links)
            .id((d) => d.id)
            .distance(distance)
        )
        .force("center", d3.forceCenter(width / 2, height / 2));

      console.log(simRef.current.alpha());

      if (simRef.current.alpha() < 0.3) {
        simRef.current.alpha(0.4);
      }
      simRef.current.restart();
    } else {
      simRef.current = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3
            .forceLink(links)
            .id((d) => d.id)
            .distance(distance)
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

      simRef.current.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      });

      simRef.current.on("end", () => {
        console.log("end");
      });
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "floralwhite",
      }}
      ref={containerRef}
    >
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          background: "yellow",
          overflow: "hidden",
        }}
        width={width}
        height={height}
      >
        <g ref={ref}></g>
      </svg>
    </div>
  );
};

export default Graph;
