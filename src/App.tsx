import { View } from "@vkontakte/vkui";
import { useState } from "react";

import { Task1 } from "./containers/Task1";
import { Task2 } from "./containers/Task2";

export const App = () => {
  const [activePanel, setActivePanel] = useState<string>("panel1");

  return (
    <View activePanel={activePanel}>
      <Task1 id="panel1" setActivePanel={setActivePanel} />
      <Task2 id="panel2" setActivePanel={setActivePanel} />
    </View>
  );
};
