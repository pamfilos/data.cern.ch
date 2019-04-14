import React from "react";
import { useDrag } from "react-dnd";

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  cursor: "move",
  marginBottom: "6px"
};

const Box = ({ data, children }) => {
  const [, drag] = useDrag({
    item: { type: "FIELD_TYPE", data }
  });
  return (
    <div ref={drag} style={style}>
      {children}
    </div>
  );
};

export default Box;
