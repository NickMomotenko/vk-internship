import { View } from "@vkontakte/vkui";
import { useState } from "react";
import { Task1 } from "./containers/Task1";

export const App = () => {
  const [activePanel, setActivePanel] = useState<string>("panel1");

  return (
    <View activePanel={activePanel}>
      <Task1 id="panel1" setActivePanel={setActivePanel} />
    </View>
  );
};
