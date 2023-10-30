// 할일 등록
import Footer from '../../layout/Footer.js';

const TodoRegist = function () {
  document.querySelector('body').setAttribute('class', 'registerBody');
  document.querySelector('body').appendChild(Footer());
  const page = document.createElement('section');
  page.setAttribute('id', 'page');
  page.setAttribute('class', 'registerSection');

  const content = document.createElement('article');
  content.setAttribute('class', 'registerArticle');

  const titleInput = document.createElement('input');
  const contentInput = document.createElement('textarea');

  content.appendChild(titleInput);
  content.appendChild(contentInput);
  titleInput.setAttribute('class', 'textInput');
  titleInput.setAttribute('placeholder', '할 일을 입력해주세요');
  contentInput.setAttribute('class', 'textInput');
  contentInput.setAttribute('placeholder', '내용을 입력해주세요');

  const btnDiv = document.createElement('div');
  btnDiv.setAttribute('class', 'btnDiv');
  const registerBtn = document.createElement('button');
  registerBtn.setAttribute('class', 'registerBtn');
  const registerBtnText = document.createTextNode(`등록하기`);
  registerBtn.appendChild(registerBtnText);
  registerBtn.addEventListener('click', async function () {
    if (titleInput.value === '' || contentInput.value === '') {
      alert('제목이나 내용을 입력해주세요');
      return;
    }
    await axios
      .post('http://localhost:33088/api/todolist', {
        title: titleInput.value,
        content: contentInput.value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    location.href = 'http://localhost:3000';
  });

  page.appendChild(content);
  page.appendChild(btnDiv);
  btnDiv.appendChild(registerBtn);

  return page;
};

export default TodoRegist;
