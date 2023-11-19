import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import defaultInstance from '@/axios';
import { useTodoStore } from './../store/useTodoStore';

export const ListItem = ({ _id, updatedAt, title, done }: TodoListMain) => {
  const [isDone, setIsDone] = useState(done);
  const { edit, setEdit } = useTodoStore();

  const handleCheck = useCallback(async () => {
    setIsDone(!isDone);
    setEdit(!edit);

    await defaultInstance.patch(`/todolist/${_id}`, {
      done: !isDone,
    });
  }, [edit, _id, isDone, setEdit]);

  useEffect(() => {
    setIsDone(done);
  }, []);

  return (
    <>
      <li className={`list-item ${isDone ? 'done' : ''}`}>
        <input
          className={`list-item__check`}
          type="checkbox"
          id={String(_id)}
          checked={isDone}
          onChange={handleCheck}
        />
        <Link to={`info/${_id}`}>
          <label className="list-item__title">{title}</label>
          <p className="list-item__date">{updatedAt.slice(0, 11)}</p>
        </Link>
      </li>
    </>
  );
};
