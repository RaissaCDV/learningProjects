import "./styles.css";
export const TextInput = ({ myOnChange, myHandleChange }) => {
  return (
    <input
      className="text-input"
      onChange={myOnChange}
      value={myHandleChange}
      type="search"
      placeholder="type your search"
    />
  );
};
