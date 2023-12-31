//상세 페이지
import './info.css';
import axios from 'axios';
import Footer from '../../layout/Footer';
import defaultInstance from './../../axios';

const getData = async function () {
  try {
    const params = new URLSearchParams(location.search);
    const _id = params.get('_id');
    const getUrl = `http://localhost:33088/api/todolist/${_id}`;
    const { data } = await axios.get<TodoResponse>(getUrl);
    return data;
  } catch (e) {
    console.error(e);
  }
};

const TodoInfo = async function () {
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');

  const page = document.createElement('section');
  page.setAttribute('id', 'page');
  page.classList.add('page-01');

  const data = await getData();

  const detailInfo = data!.item;
  const arrowBtn = document.createElement('button');
  const content = document.createElement('article');
  const time = document.createElement('p');
  const paragraph = document.createElement('p');
  const img = document.createElement('img');
  const div = document.createElement('div');
  const topDiv = document.createElement('div');
  const toggle = document.createElement('div');
  const btnWrap = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const span = document.createElement('span');

  time.classList.add('time');
  arrowBtn.classList.add('back-arrow');
  div.classList.add('input-box');
  content.classList.add('detail-article');
  btnWrap.classList.add('btn-wrap');
  topDiv.classList.add('topDiv');
  toggle.classList.add('topDiv');

  const headingInput = document.createElement('input');
  headingInput.value = detailInfo.title;
  const paragraphText = document.createElement('textarea');
  paragraphText.value = detailInfo.content;

  headingInput.addEventListener('input', checkModification);
  paragraphText.addEventListener('input', checkModification);

  arrowBtn.addEventListener('click', () => {
    window.history.back();
  });

  const updateText = document.createTextNode(
    `${detailInfo.updatedAt.split(' ')[0]}`
  );

  time.appendChild(updateText);

  const deleteBtn = document.createElement('button');
  const deleteBtnText = document.createTextNode(`삭제하기`);
  deleteBtn.setAttribute('id', 'remove');
  deleteBtn.appendChild(deleteBtnText);
  deleteBtn.addEventListener('click', async function () {
    const confirmDelete = confirm('삭제하시겠습니까?');
    if (confirmDelete) {
      await defaultInstance.delete(`/todolist/${_id}`);
      alert('삭제되었습니다.');
      location.href = '/';
    }
  });

  const modifyBtn = document.createElement('button');
  const modifyBtnText = document.createTextNode(`수정하기`);
  modifyBtn.setAttribute('id', 'change');
  modifyBtn.appendChild(modifyBtnText);
  modifyBtn.disabled = true;

  function checkModification() {
    const isTitleChanged = headingInput.value !== detailInfo.title;
    const isContentChanged = paragraphText.value !== detailInfo.content;

    if (isTitleChanged || isContentChanged) {
      modifyBtn.disabled = false;
    } else {
      modifyBtn.disabled = true;
    }
  }

  modifyBtn.addEventListener('click', async function () {
    await defaultInstance.patch(`/todolist/${_id}`, {
      title: headingInput.value,
      content: paragraphText.value,
    });
    alert('수정되었습니다.');
    location.href = '/';
  });

  input.addEventListener('change', async function () {
    const isChecked = this.checked;
    await defaultInstance.patch(`/todolist/${_id}`, {
      done: isChecked,
    });
  });

  input.setAttribute('type', 'checkbox');
  input.setAttribute('id', 'toggle');
  input.hidden = true;
  label.setAttribute('for', 'toggle');
  label.className = 'toggleSwitch';
  span.className = 'toggleButton';

  if (detailInfo.done) {
    input.setAttribute('checked', 'true');
  }

  content.appendChild(topDiv);
  content.appendChild(toggle);
  topDiv.appendChild(arrowBtn);
  toggle.appendChild(time);
  toggle.appendChild(input);
  toggle.appendChild(label);
  label.appendChild(span);
  arrowBtn.appendChild(img);
  div.appendChild(headingInput);
  div.appendChild(paragraphText);
  content.appendChild(paragraph);
  content.appendChild(div);

  content.appendChild(btnWrap);
  btnWrap.appendChild(modifyBtn);
  btnWrap.appendChild(deleteBtn);

  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
