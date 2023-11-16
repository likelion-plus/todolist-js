import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AxiosResponse } from 'axios';
import defaultInstance from '@/axios';
import Button from '@/component/Button';
import 'styles/Detail.css';
import { toast } from 'react-hot-toast';

const initialData = {
  title: '',
  done: false,
  content: '',
  createdAt: '',
  updateAt: '',
};

export default function Detail() {
  const { _id } = useParams();
  const [title, setTitle] = useState(initialData.title);
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [done, setDone] = useState(initialData.done);
  const [content, setContent] = useState(initialData.content);
  const [date, setDate] = useState(initialData.updateAt);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response: AxiosResponse = await defaultInstance.get(
        `/todolist/${_id}`
      );

      return response.data?.item;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const TodoInfo = async function () {
      const { title, done, content, updatedAt } = await getData();

      setTitle(title);
      setOriginalTitle(title);
      setContent(content);
      setOriginalContent(content);
      setDate(updatedAt);
      setDone(done);
    };
    TodoInfo();
  }, [getData]);

  function checkModifyTitle(e: ChangeEvent<HTMLInputElement>) {
    const content = document.querySelector('#content')?.textContent;
    if (originalTitle === e.target.value && content === originalContent) {
      setBtnDisabled(true);
    } else if (e.target.value !== undefined && title !== e.target.value) {
      setTitle(e.target.value);
      setBtnDisabled(false);
    }
  }

  function checkModifyContent(e: ChangeEvent<HTMLTextAreaElement>) {
    const title = document.querySelector('#title')?.value;
    if (originalContent === e.target.value && title === originalTitle) {
      setBtnDisabled(true);
    } else if (e.target.value !== undefined && content !== e.target.value) {
      setContent(e.target.value);
      setBtnDisabled(false);
    }
  }

  async function handleModifyBtn() {
    await defaultInstance.patch(`/todolist/${_id}`, {
      title,
      content,
    });
    toast.success('수정되었습니다.');
    navigate('/');
  }

  async function handleDeleteBtn() {
    const confirmDelete = confirm('삭제하시겠습니까?');
    if (confirmDelete) {
      await defaultInstance.delete(`/todolist/${_id}`);
      toast.error('삭제되었습니다.');
      navigate('/');
    }
  }

  const goBackArrow = () => {
    navigate(-1);
  };

  const isChecked = async () => {
    setDone(!done);
    await defaultInstance.patch(`/todolist/${_id}`, {
      done: !done,
    });
  };

  return (
    <>
      <main className="detailMain">
        <section className="detailSection">
          <article className="arrow">
            <button type="button" onClick={goBackArrow} className="backArrow">
              <img src="/Arrow.svg" alt="뒤로 가기" />
            </button>
          </article>
          <article className="dateCheck">
            <p className="updatedDate">{date.split(' ')[0]}</p>
            <input
              type="checkbox"
              onChange={() => isChecked()}
              checked={done}
              id="toggle"
              hidden
            />
            <label htmlFor="toggle" className="toggleSwitch">
              <span className="toggleButton"></span>
            </label>
          </article>
          <article className="text">
            <input
              type="text"
              name="title"
              id="title"
              className="titleInput"
              defaultValue={title}
              onChange={checkModifyTitle}
            />
            <textarea
              name="content"
              id="content"
              className="contentInput"
              defaultValue={content}
              onChange={checkModifyContent}
            />
          </article>
          <article className="btnWrap">
            <Button
              id="change"
              disabled={btnDisabled}
              onClick={handleModifyBtn}
            >
              수정하기
            </Button>
            <Button id="remove" onClick={handleDeleteBtn}>
              삭제하기
            </Button>
          </article>
        </section>
      </main>
    </>
  );
}
