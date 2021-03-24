import { useEffect, useState } from "react";

import { getData } from "./data";

import GraphView from "./graph-view";

function App() {
  const [data, setData] = useState({ links: [], nodes: [] });

  // To be able to check if everything works with
  // changing data I have added the option ot add/remove
  // three nodes where one even has a fixed position.

  useEffect(() => {
    // to make sure we handle new (but potentially "equal" data).
    setTimeout(() => {
      setData(getData());
    }, 1000);

    const id = setInterval(() => {
      setData(getData());
    }, 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <header>
        <h1>D3 React Force Layout</h1>
      </header>
      <main>
        <GraphView data={data} />
      </main>
    </>
  );
}

export default App;
