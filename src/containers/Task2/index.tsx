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
import { useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useInput } from "../../hooks/useInput";

type Task2Props = {
  setActivePanel: (value: string) => void;
  id: string;
};

export const Task2: React.FC<Task2Props> = ({ setActivePanel, id }) => {
  const [requests, setRequests] = useState<string[]>([]);

  const [currentUser, setCurrentUser] = useState({});

  const { value, error, handleChange } = useInput({
    cb: ({ query, error }) => {
      debouncedCallback({
        url: "https://api.agify.io",
        query: query,
        error: error,
      });
    },
  });

  const errorTextRef = useRef<HTMLDivElement>(null);

  const getData = async ({
    url,
    query,
    error,
  }: {
    url: string;
    query: string;
    error: boolean;
  }) => {
    if (error || !query) return;

    if (query) {
      if (!requests.includes(query)) {
        if (errorTextRef.current) errorTextRef.current.innerText = "";

        setRequests((prevState: any) => [...prevState, query]);
      } else {
        if (errorTextRef.current) {
          errorTextRef.current.innerText =
            "Такой запрос уже был, введи что-то другое";
        }

        return;
      }
    }

    try {
      let res = await fetch(`${url}?name=${query}`);

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      let { name, age } = await res.json();

      if (age && name) {
        setCurrentUser({ [name]: age });
      }
    } catch (err) {
      if (errorTextRef.current) {
        errorTextRef.current.innerText = "Ошибка сервера";
      }
    }
  };

  const handleSumbit = () => {
    stopTimer();

    getData({ url: "https://api.agify.io", query: value, error: error });
  };

  const renderCurrentUser = () => {
    if (!Object.entries(currentUser).length) return;

    let [name, age]: [string, number | any] = Object.entries(currentUser)[0];

    if (name && age) {
      return (
        <Text style={{ margin: 16 }}>
          Последний результат: {name && name} {age && age}
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
        {error && (
          <Text style={{ margin: 16 }}>Не используй русские буквы и цифры</Text>
        )}
        <Text getRootRef={errorTextRef} style={{ margin: 16 }}></Text>
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
