import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import defaultInstance from '@/axios';
export const ListItem = ({ _id, updatedAt, title, done }: TodoListMain) => {
  const [isDone, setIsDone] = useState(false);
  const handleCheck = async () => {
    setIsDone(!isDone);
    // API
    await defaultInstance.patch(`/todolist/${_id}`, {
      done: !isDone,
    });
  };

  // USEEFFECT
  useEffect(() => {
    setIsDone(done);
  }, []);
  return (
    <>
      <li>
        <Link to={`info/${_id}`} className={`list-item ${done ? 'done' : ''}`}>
          <div>
            <input
              className="list-item__check"
              type="checkbox"
              id={String(_id)}
              checked={isDone}
              onChange={handleCheck}
            />
            <label className="list-item__title">{title}</label>
          </div>
          <p className="list-item__date">{updatedAt.slice(0, 11)}</p>
        </Link>
      </li>
    </>
  );
};
