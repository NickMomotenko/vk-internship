import { useRef } from "react";

import {
  Panel,
  PanelHeader,
  Group,
  FormItem,
  Input,
  Button,
  Spinner,
  CellButton,
  Text,
} from "@vkontakte/vkui";

import { useData } from "../../hooks/useData";
import { countNonLetterAtEnd } from "../../helpers/helpers";

type Task1Props = {
  setActivePanel: (value: string) => void;
  id: string;
};

export const Task1: React.FC<Task1Props> = ({ setActivePanel, id }) => {
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
      let word = text?.trim().split(" ")[0];

      let offsetСounter: number | undefined = countNonLetterAtEnd(word);

      let finalLength = !offsetСounter
        ? word.length
        : word.length - offsetСounter;

      textInputRef.current.value = text;

      setTimeout(() => {
        textInputRef.current?.setSelectionRange(finalLength, finalLength);
        textInputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader style={{ marginBottom: 0 }}>Задание #1</PanelHeader>
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
          {load ? <Spinner size="small" style={{ color: "#fff" }} /> : "Click"}
        </Button>
        <CellButton onClick={() => setActivePanel("panel2")}>
          Go to panel 2
        </CellButton>
      </Group>
    </Panel>
  );
};
