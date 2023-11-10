import 'styles/Home.css';
import defaultInstance from '@/axios';
import { AxiosResponse } from 'axios';

export default function Home() {
  const getData = async () => {
    try {
      const response: AxiosResponse = await defaultInstance.get(`/todolist`);
      console.log(response.data?.items);
      return response.data?.items;
    } catch (e) {
      console.error(e);
    }
  };

  getData();

  return <></>;
}
