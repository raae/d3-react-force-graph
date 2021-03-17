import Graph from "../graph";
import { getData } from "../data";

const GraphView = () => {
  const data = getData();
  return <Graph data={data} />;
};

export default GraphView;
