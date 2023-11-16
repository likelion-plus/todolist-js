import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import defaultInstance from '@/axios';
import Button from '@/component/Button';
import 'styles/Regist.css';
import 'styles/Detail.css';
import toast from 'react-hot-toast';

export default function Regist() {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const goBackArrow = () => {
    navigate(-1);
  };

  function handleTitle(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setBtnDisabled(true);
      setTitle('');
      return;
    }

    if (e.target.value !== '') {
      setTitle(e.target.value);
    }

    if (content !== '') {
      setBtnDisabled(false);
    }
  }

  function handleContent(e: ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value === '') {
      setBtnDisabled(true);
      setContent('');
      return;
    }

    if (e.target.value !== '') {
      setContent(e.target.value);
    }

    if (title !== '') {
      setBtnDisabled(false);
    }
  }

  async function handleRegist() {
    await defaultInstance.post(`/todolist`, {
      title,
      content,
      done: false,
    });
    toast.success('등록되었습니다.');
    navigate('/');
  }

  return (
    <>
      <main className="registMain">
        <section className="registSection">
          <article className="arrow">
            <button type="button" onClick={goBackArrow} className="backArrow">
              <img src="/Arrow.svg" alt="뒤로 가기" />
            </button>
          </article>
          <article className="text">
            <input
              type="text"
              name="title"
              id="registTitle"
              className="titleRegist"
              placeholder="할 일을 입력해주세요."
              defaultValue={title}
              onChange={handleTitle}
              required
            />
            <textarea
              name="content"
              id="registContent"
              className="contentRegist"
              defaultValue={content}
              onChange={handleContent}
              placeholder="내용을 입력해주세요."
              required
            />
          </article>
          <article className="btnWrap">
            <Button
              id="registerBtn"
              disabled={btnDisabled}
              onClick={handleRegist}
            >
              등록하기
            </Button>
          </article>
        </section>
      </main>
    </>
  );
}
