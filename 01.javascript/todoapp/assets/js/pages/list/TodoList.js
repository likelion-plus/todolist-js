import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';

const defaultInstance = axios.create({
  baseURL: 'http://localhost:33088/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getData = async () => {
  try {
    const response = await defaultInstance.get(`/todolist`);
    return response.data?.items;
  } catch (e) {
    console.error(e);
  }
};

let menu = 'Todo';
const displayCategory = (parent) => {
  const ul = document.createElement('ul');
  ul.classList.add('category-list');

  const liAll = document.createElement('li');
  liAll.classList.add('category-item');
  liAll.textContent = '📋 All';

  const liTodo = document.createElement('li');
  liTodo.classList.add('category-item');
  liTodo.textContent = '📝 Todo';

  const liDone = document.createElement('li');
  liDone.classList.add('category-item');
  liDone.textContent = '✅ Done';

  [liAll, liTodo, liDone].forEach((li) => {
    if (li.textContent.includes(menu)) {
      li.classList.add('active');
    }

    li.addEventListener('click', (e) => {
      menu = e.target.textContent;

      [liAll, liTodo, liDone].forEach((i) => i.classList.remove('active'));
      e.target.classList.add('active');

      displayList();
    });
  });

  ul.append(liAll, liTodo, liDone);
  parent.append(ul);
};

const displayList = async (parent) => {
  const frag = document.createDocumentFragment();
  const dataAll = await getData();

  let data;
  if (menu.includes('Todo')) {
    data = dataAll.filter((i) => !i.done);
  } else if (menu.includes('Done')) {
    data = dataAll.filter((i) => i.done);
  } else {
    data = dataAll;
  }

  data?.forEach((item) => {
    const li = document.createElement('li');
    const todoInfoLink = document.createElement('a');
    todoInfoLink.setAttribute('href', `info?_id=${item._id}`);
    todoInfoLink.classList.add('list-item');

    const div = document.createElement('div');

    const checkbox = document.createElement('input');
    checkbox.classList.add('list-item__check');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', item._id);

    checkbox.addEventListener('change', async function () {
      await defaultInstance.patch(`/todolist/${item._id}`, {
        done: this.checked,
      });
      displayList();
    });

    const label = document.createElement('label');
    label.classList.add('list-item__title');
    label.textContent = item.title;

    todoInfoLink.addEventListener('click', function (event) {
      if (event.target.type !== 'checkbox') {
        event.preventDefault();
        linkTo(todoInfoLink.getAttribute('href'));
      }
    });

    if (item.done) {
      todoInfoLink.classList.add('done');
      checkbox.setAttribute('checked', 'true');
    }

    div.append(checkbox, label);

    const date = document.createElement('p');
    date.setAttribute('class', 'list-item__date');
    date.textContent = item.updatedAt.slice(0, 11);

    todoInfoLink.append(div, date);
    li.appendChild(todoInfoLink);
    frag.appendChild(li);
  });

  if (parent) parent.appendChild(frag);
  else {
    const listContainer = document.querySelector('.list-container');
    listContainer.textContent = '';
    listContainer.appendChild(frag);
  }
};

const TodoList = async function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const content = document.createElement('div');
  content.setAttribute('id', 'content');

  try {
    displayCategory(content);

    const listContainer = document.createElement('ul');
    listContainer.setAttribute('class', 'list-container');
    displayList(listContainer);

    content.appendChild(listContainer);

    const btnRegist = document.createElement('button');
    btnRegist.classList.add('enrollment');
    btnRegist.textContent = '';

    btnRegist.addEventListener('click', () => {
      linkTo('regist');
    });

    content.appendChild(btnRegist);
  } catch (err) {
    console.error(err); // Console에서 에러 확인 가능
    const error = document.createTextNode('일시적인 오류 발생');
    content.appendChild(error);
  }

  page.appendChild(content);
  page.appendChild(Footer());

  return page;
};

export default TodoList;
