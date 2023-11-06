// 할일 등록
import './register.css';
import Footer from '../../layout/Footer';

const TodoRegist = function () {
  document.querySelector('body').setAttribute('class', 'registerBody');

  const page = document.createElement('section');
  page.setAttribute('id', 'page');
  page.setAttribute('class', 'registerSection');

  const contentSection = document.createElement('section');
  contentSection.setAttribute('class', 'contentSection');

  const backBtnDiv = document.createElement('div');
  const backBtn = document.createElement('button');
  const arrowImg = document.createElement('img');
  arrowImg.setAttribute('src', './img/Arrow.svg');
  arrowImg.setAttribute('alt', '뒤로 가기');
  backBtn.setAttribute('class', 'backArrow');

  backBtn.addEventListener('click', function () {
    window.history.back();
  });

  backBtnDiv.appendChild(backBtn);
  backBtn.appendChild(arrowImg);

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

  [titleInput, contentInput].map((input) => {
    input.addEventListener('input', function () {
      if (titleInput.value !== '' && contentInput.value !== '')
        registerBtn.classList.add('register-active');
      else if (titleInput.value === '' || contentInput.value === '') {
        registerBtn.classList.remove('register-active');
      }
    });
  });

  registerBtn.addEventListener('click', async function () {
    if (titleInput.value === '' || contentInput.value === '') {
      alert('할 일과 내용을 입력해주세요');
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
    location.href = '/';
  });

  contentSection.appendChild(backBtnDiv);
  contentSection.appendChild(content);
  contentSection.appendChild(btnDiv);
  btnDiv.appendChild(registerBtn);
  page.appendChild(contentSection);
  page.appendChild(Footer());

  return page;
};

export default TodoRegist;
