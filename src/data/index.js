import data from "./data.json";

export const getData = () => {
  return {
    links: data.links.map((link) => {
      return {
        ...link,
        id: `${link.source}-${link.target}`,
      };
    }),
    nodes: data.nodes.map((node) => {
      return {
        ...node,
      };
    }),
  };
};
