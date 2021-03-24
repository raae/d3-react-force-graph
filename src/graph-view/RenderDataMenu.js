const RenderDataMenu = ({ isExclude, onExcludeToggle }) => {
  return (
    <aside>
      <h2>Remove</h2>
      <p></p>
      <p>
        <input
          id="exclude"
          type="checkbox"
          onChange={onExcludeToggle}
          checked={isExclude}
        />{" "}
        <label htmlFor="exclude">Remove some nodes</label>
      </p>
    </aside>
  );
};

export default RenderDataMenu;
