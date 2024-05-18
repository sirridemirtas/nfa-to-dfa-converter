import { useContext } from "react";

import { AppContext } from "../store/Context";
import { nfaToDfa } from "../lib/nfaToDfa";
import { FAGraph } from "./FAGraph";

export const DFAGraph = () => {
  const { state } = useContext(AppContext);

  return <FAGraph data={nfaToDfa(state)} title={"DFA Graph"} />;
};
