import {
  Panel,
  PanelHeader,
  Group,
  CellButton,
  View,
  Input,
  FormItem,
  Button,
  Spinner,
  Text,
} from "@vkontakte/vkui";
import { useRef, useState } from "react";
import { useData } from "./api/hooks/useData";

export const App = () => {
  const [activePanel, setActivePanel] = useState<string>("panel1");

  const textInputRef = useRef<HTMLInputElement>(null);

  const { error, load, getData } = useData();

  const submitForm = () => {
    getData().then((fact) => {
      if (fact) {
        setCursorPlaceByText(fact);
      }
    });
  };

  const setCursorPlaceByText = (text: string) => {
    if (textInputRef && textInputRef.current) {
      let firstWordLength = text?.split(" ")[0].length;

      textInputRef.current.value = text;

      setTimeout(() => {
        textInputRef.current?.setSelectionRange(
          firstWordLength,
          firstWordLength
        );
        textInputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <View activePanel={activePanel}>
      <Panel id="panel1">
        <PanelHeader style={{ marginBottom: 0 }}>Panel 1</PanelHeader>
        <Group>
          <FormItem htmlFor="example" top="Введите что нибудь">
            <Input
              id="example"
              type="text"
              placeholder="..."
              getRef={textInputRef}
              disabled={load}
              onChange={() => {}}
            />
          </FormItem>
          {error && <Text>{error}</Text>}
          <Button onClick={submitForm} disabled={load} style={{ margin: 16 }}>
            {load ? (
              <Spinner size="small" style={{ color: "#fff" }} />
            ) : (
              "Click"
            )}
          </Button>
          <CellButton onClick={() => setActivePanel("panel2")}>
            Go to panel 2
          </CellButton>
        </Group>
      </Panel>
    </View>
  );
};
