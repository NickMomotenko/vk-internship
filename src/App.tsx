import { Panel, PanelHeader, Group, CellButton, View } from "@vkontakte/vkui";
import { useState } from "react";

export const App = () => {
  const [activePanel, setActivePanel] = useState("panel1");

  return (
    <View activePanel={activePanel}>
      <Panel id="panel1">
        <PanelHeader>Panel 1</PanelHeader>
        <Group>
          <div style={{ height: 200 }} />
          <CellButton onClick={() => setActivePanel("panel2")}>
            Go to panel 2
          </CellButton>
          <div style={{ height: 600 }} />
        </Group>
      </Panel>
    </View>
  );
};
