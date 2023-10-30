// 할일 등록
import Footer from '../../layout/Footer.js';
import fetchData from '../../axios/baseAxios.js';

const TodoInfo = async function () {
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');

  const page = document.createElement('section');
  page.setAttribute('id', 'page-01');

  const { data } = await axios({
    method: 'get',
    url: `http://localhost:33088/api/todolist/${_id}`,
  });

  const detailInfo = data.item;
  const arrowBtn = document.createElement('button');
  const content = document.createElement('article');
  const time = document.createElement('p');
  const heading = document.createElement('h2');
  const paragraph = document.createElement('p');
  const img = document.createElement('img');
  const div = document.createElement('div');
  const btnWrap = document.createElement('div');

  time.classList.add('time');
  arrowBtn.classList.add('back-arrow');
  div.classList.add('input-box');
  content.classList.add('detail-article');
  btnWrap.classList.add('btn-wrap');

  const headingInput = document.createElement('input');
  headingInput.value = detailInfo.title;
  const paragraphText = document.createElement('textarea');
  paragraphText.value = detailInfo.content;

  const updateText = document.createTextNode(
    `${detailInfo.updatedAt.split(' ')[0]}`
  );
  const titleText = document.createTextNode(`${detailInfo.title}`);
  const contentText = document.createTextNode(`${detailInfo.content}`);
  time.appendChild(updateText);
  // heading.appendChild(titleText);
  // paragraph.appendChild(contentText);

  const deleteBtn = document.createElement('button');
  const deleteBtnText = document.createTextNode(`삭제하기`);
  deleteBtn.appendChild(deleteBtnText);
  deleteBtn.addEventListener('click', async function () {
    await axios.delete(`http://localhost:33088/api/todolist/${_id}`);
    location.href = 'http://localhost:3000';
  });

  const modifyBtn = document.createElement('button');
  const modifyBtnText = document.createTextNode(`수정하기`);
  modifyBtn.appendChild(modifyBtnText);
  modifyBtn.addEventListener('click', async function () {
    await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
      title: headingInput.value,
      content: paragraphText.value,
    });
    location.href = 'http://localhost:3000';
  });

  content.appendChild(arrowBtn);
  arrowBtn.appendChild(img);
  content.appendChild(time);
  content.appendChild(div);
  div.appendChild(headingInput);
  div.appendChild(paragraphText);
  content.appendChild(heading);
  content.appendChild(paragraph);
  content.appendChild(deleteBtn);
  content.appendChild(modifyBtn);

  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
