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
import { checkValueByOnlyLetters } from "../../helpers/helpers";

type Task2Props = {
  setActivePanel: (value: string) => void;
  id: string;
};

export const Task2: React.FC<Task2Props> = ({ setActivePanel, id }) => {
  const [usersData, setUsersData] = useState<{
    [key: string]: number;
  }>({});

  const [currentUser, setCurrentUser] = useState({});

  const { value, error, handleChange } = useInput({
    cb: ({ query }) => {
      debouncedCallback({
        url: "https://api.agify.io",
        query: query,
      });
    },
    rules: [checkValueByOnlyLetters],
  });

  const getData = async ({ url, query }: { url: string; query: string }) => {
    if ((query && usersData[query]) || query.length === 0) return;

    let res = await fetch(`${url}?name=${query}`);

    let { name, age } = await res.json();

    if (age && name) {
      setUsersData((prevState) => {
        return { ...prevState, [name]: age };
      });

      setCurrentUser({ [name]: age });
    }
  };

  const handleSumbit = () => {
    stopTimer();

    getData({ url: "https://api.agify.io", query: value });
  };

  const renderCurrentUser = () => {
    if (!Object.entries(currentUser).length) return;

    let [name, age]: [string, number | any] = Object.entries(currentUser)[0];

    if (name && age) {
      return (
        <Text>
          {name && name} {age && age}
        </Text>
      );
    }
  };

  const { debouncedCallback, stopTimer } = useDebounce(getData, 3000);

  return (
    <Panel id={id}>
      <PanelHeader style={{ marginBottom: 0 }}>Задание #2</PanelHeader>
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
        {currentUser && renderCurrentUser()}
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
