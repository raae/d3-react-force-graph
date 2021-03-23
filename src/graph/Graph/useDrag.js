import * as d3 from "d3";

export const useDrag = (props) => {
  const { svgRef, nodes, updatePositions } = props;
  console.log("useDrag: Run", nodes.length);

  if (svgRef.current) {
    syncWithDom(svgRef.current, { nodes, updatePositions });
  }

  return {
    svgRef,
  };
};

const syncWithDom = (svgEl, { nodes, updatePositions }) => {
  console.log("useSimulation: Sync with DOM");

  const svgDomNode = d3.select(svgEl);

  const d3NodeSelection = svgDomNode
    .selectAll('[data-graph-type="node"]')
    .data(nodes, function (d) {
      return (d && d.id) || d3.select(this).attr("data-graph-id");
    });

  const d3Drag = d3.drag().on("start drag end", (event) => {
    const { dx, dy, subject } = event;
    const { id } = subject;

    let draggingIds = [id];

    draggingIds.map((draggingId) => {
      const node = nodes.find((node) => node.id === draggingId);

      if (node) {
        node.x = node.x + dx;
        node.y = node.y + dy;
        node.fx = node.x;
        node.fy = node.y;
      }

      return node;
    });

    updatePositions();
  });

  d3NodeSelection.call(d3Drag);
};
