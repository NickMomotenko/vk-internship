import {
  Button,
  CellButton,
  FormItem,
  Group,
  Input,
  Panel,
  PanelHeader,
  Text,
} from "@vkontakte/vkui";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useInput } from "../../hooks/useInput";

type Task2Props = {
  setActivePanel: (value: string) => void;
  id: string;
};

export const Task2: React.FC<Task2Props> = ({ setActivePanel, id }) => {
  const [usersData, setUsersData] = useState<{
    [key: string]: number;
  }>({});

  const { value, error, handleChange } = useInput({
    cb: ({ query }) => {
      debouncedCallback({
        url: "https://api.agify.io",
        query: query,
      });
    },
  });

  const getData = async ({ url, query }: { url: string; query: string }) => {
    if ((query && usersData[query]) || query.length === 0) return;

    let res = await fetch(`${url}?name=${query}`);

    let { name, age } = await res.json();

    if (age) {
      setUsersData((prevState) => {
        return { ...prevState, [name]: age };
      });
    }
  };

  const handleSumbit = () => {
    stopTimer();

    getData({ url: "https://api.agify.io", query: value });
  };

  const { debouncedCallback, stopTimer } = useDebounce(getData, 3000);

  return (
    <Panel id={id}>
      <PanelHeader style={{ marginBottom: 0 }}>Panel 2</PanelHeader>
      <Group>
        <FormItem htmlFor="example" top="Введите что нибудь">
          <Input
            id="example"
            type="text"
            placeholder="..."
            value={value}
            onChange={handleChange}
          />
        </FormItem>
        {error && <Text>Введены не только буквы</Text>}
        <Button onClick={handleSumbit} style={{ margin: 16 }}>
          Sumbit
        </Button>
        <CellButton onClick={() => setActivePanel("panel1")}>
          Go to panel 1
        </CellButton>
      </Group>
    </Panel>
  );
};
