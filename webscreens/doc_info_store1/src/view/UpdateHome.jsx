import React, { useState } from "react";
import Home from "./Home";

const autoToolsUpdateValues = (values) => {
  const [myDataJson, setMyDataJson] = useState(values.myDataJson);
  return <Home />;
};
export default autoToolsUpdateValues;
