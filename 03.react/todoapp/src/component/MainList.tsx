import defaultInstance from '@/axios';
import { AxiosResponse } from 'axios';

import { ListItem } from '@/component';
import { useEffect, useState } from 'react';
const getData = async () => {
  try {
    const response: AxiosResponse = await defaultInstance.get(`/todolist`);
    return response.data?.items;
  } catch (e) {
    console.error(e);
  }
};

export const MainList = ({ selected }: { selected: string }) => {
  const [list, setList] = useState([]);
  //API
  const todo = selected === '📝 Todo';
  const done = selected === '✅ Done';

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      setList(res);
      return;
    };
    fetchData();
  }, []);
  return (
    <>
      <ul className="list-container">
        {list &&
          !todo &&
          !done &&
          list
            .sort(
              (a: TodoListMain, b: TodoListMain) =>
                +new Date(b.updatedAt) - +new Date(a.updatedAt)
            )
            .map((item: TodoListMain) => (
              <ListItem
                key={item._id}
                _id={item._id}
                title={item.title}
                updatedAt={item.updatedAt}
                done={item.done}
              />
            ))}
        {list &&
          todo &&
          list
            .sort(
              (a: TodoListMain, b: TodoListMain) =>
                +new Date(b.updatedAt) - +new Date(a.updatedAt)
            )
            .filter((item: TodoListMain) => !item.done)
            .map((item: TodoListMain) => (
              <ListItem
                key={item._id}
                _id={item._id}
                title={item.title}
                updatedAt={item.updatedAt}
                done={item.done}
              />
            ))}
        {list &&
          done &&
          list
            .sort(
              (a: TodoListMain, b: TodoListMain) =>
                +new Date(b.updatedAt) - +new Date(a.updatedAt)
            )
            .filter((item: TodoListMain) => item.done)
            .map((item: TodoListMain) => (
              <ListItem
                key={item._id}
                _id={item._id}
                title={item.title}
                updatedAt={item.updatedAt}
                done={item.done}
              />
            ))}
      </ul>
    </>
  );
};
