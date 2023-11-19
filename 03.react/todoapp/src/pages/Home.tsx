import 'styles/Home.css';
import defaultInstance from '@/axios';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { CategoryMenu, MainList } from '@/component/index.tsx';
import { useNavigate } from 'react-router-dom';
import { useTodoStore } from './../store/useTodoStore';

const getData = async () => {
  try {
    const response: AxiosResponse = await defaultInstance.get(`/todolist`);
    return response.data?.items;
  } catch (e) {
    console.error(e);
  }
};

export default function Home() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState<string>('📝 Todo');
  const { edit } = useTodoStore();

  useEffect(() => {
    const fetchData = async () => {
      const getList = await getData();

      setList(
        getList.toSorted(
          (a: TodoListMain, b: TodoListMain) =>
            +new Date(b.updatedAt) - +new Date(a.updatedAt)
        )
      );
    };
    fetchData();
  }, [edit]);

  return (
    <>
      <div id="page">
        <div id="content">
          <CategoryMenu selected={selected} setSelected={setSelected} />
          <MainList selected={selected} list={list} setList={setList} />
          <button
            className="enrollment"
            onClick={() => navigate('/regist')}
          ></button>
        </div>
      </div>
    </>
  );
}
