import { ListItem } from '@/component';
import { useState } from 'react';
import { useTodoStore } from './../store/useTodoStore';

export const MainList = ({ selected, list, setList }: { selected: string }) => {
  const todo = selected === '📝 Todo';
  const done = selected === '✅ Done';

  const [newSort, setNewSort] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [filterList, setFilterList] = useState([]);
  const { edit, setEdit } = useTodoStore();

  function handleSorting() {
    if (newSort) {
      setList(
        list.toSorted(
          (a: TodoListMain, b: TodoListMain) =>
            +new Date(a.updatedAt) - +new Date(b.updatedAt)
        )
      );
      setNewSort(false);
    } else {
      setList(
        list.toSorted(
          (a: TodoListMain, b: TodoListMain) =>
            +new Date(b.updatedAt) - +new Date(a.updatedAt)
        )
      );
      setNewSort(true);
    }
  }

  const getValue = (e) => {
    setUserInput(e.target.value);
    const trim = e.target.value.trim();
    if (userInput !== '') {
      const searched = list.filter((item) => {
        return item.title.includes(trim);
      });
      setFilterList(searched);
    }
  };

  return (
    <>
      <button className="sortBtn" type="button" onClick={() => handleSorting()}>
        {newSort ? '등록 순으로 보기' : '최신 순으로 보기'}
      </button>
      <input type="text" onChange={getValue} />
      <ul className="list-container">
        {userInput.length > 1 &&
          filterList.map((item: TodoListMain) => (
            <ListItem
              key={item._id}
              _id={item._id}
              title={item.title}
              updatedAt={item.updatedAt}
              done={item.done}
            />
          ))}
        {userInput.length <= 1 &&
          list &&
          !todo &&
          !done &&
          list.map((item: TodoListMain) => (
            <ListItem
              key={item._id}
              _id={item._id}
              title={item.title}
              updatedAt={item.updatedAt}
              done={item.done}
            />
          ))}
        {userInput.length <= 1 &&
          list &&
          todo &&
          list
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
        {userInput.length === 1 &&
          list &&
          done &&
          list
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
