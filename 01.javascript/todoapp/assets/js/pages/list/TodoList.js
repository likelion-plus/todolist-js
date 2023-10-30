import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';

import { linkTo } from '../../Router.js';

const defaultInstance = axios.create({
  baseURL: 'http://localhost:33088/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getData = async () => {
  try{
    const response = await defaultInstance.get(`/todolist`);
    return response.data?.items;
  } catch(e) {
    console.error(e);
  }
}

let menu = 'All';
const displayCategory = (parent) => {
  const ul = document.createElement("ul");
  ul.classList.add("category-list");

  const liAll = document.createElement("li");
  liAll.classList.add("category-item", "active");
  liAll.textContent = "All";

  const liTodo = document.createElement("li");
  liTodo.classList.add("category-item");
  liTodo.textContent = "Todo";

  const liDone = document.createElement("li");
  liDone.classList.add("category-item");
  liDone.textContent = "Done";

  [liAll, liTodo, liDone].forEach((li) => {
    li.addEventListener('click' , (e) => {
      [liAll, liTodo, liDone].forEach((i) => i.classList.remove('active'));
      e.target.classList.add('active');
      menu = e.target.textContent;

      const listContainer = document.querySelector('.list-container');
      listContainer.textContent = '';
      displayList(listContainer);
    })
  })

  ul.append(liAll, liTodo, liDone);
  parent.append(ul);
};

const displayList = async (parent) => {
  const frag = document.createDocumentFragment();
  const dataAll = await getData();

  let data;
  if(menu === 'Todo') {
    data = dataAll.filter(i => !i.done)
  } else if(menu === 'Done') {
    data = dataAll.filter(i => i.done)
  } else {
    data = dataAll;
  }

  data?.forEach(item => {
    const btnDetail = document.createElement('button');
    btnDetail.classList.add('list'); 
    btnDetail.setAttribute('type', 'button');

    const checkbox = document.createElement('input');
    checkbox.classList.add('check')
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', item._id);
    if (item.done) {
      checkbox.setAttribute('checked', 'true');
    }

    checkbox.addEventListener('change', async function() {
      const isChecked = this.checked;
      console.log(isChecked);
      await defaultInstance.patch(`/todolist/${item._id}`, {
        "done": isChecked 
      })
    });

    const label = document.createElement('label');
    label.classList.add('ladel')
    label.setAttribute('for', item._id);
    label.textContent = item.title;

    btnDetail.addEventListener('click', async function (event) {
      if (event.target.type === 'button') {
        linkTo(todoInfoLink.getAttribute('href'));
      }
    });
    
    btnDetail.append(checkbox, label);
    frag.appendChild(btnDetail);
  });
    
  parent.appendChild(frag);
};

const TodoList = async function(){
  const page = document.createElement('div');
  page.setAttribute('id', 'page');
  
  const content = document.createElement('div');
  content.setAttribute('id', 'content');

  try{
    displayCategory(content);

    const listContainer = document.createElement('ul');
    listContainer.setAttribute('class', 'list-container');

    displayList(listContainer);

    content.appendChild(listContainer);
    
    const btnRegist = document.createElement('button');
    btnRegist.classList.add('enrollment');
    btnRegist.textContent='';

    btnRegist.addEventListener("click", () => {
      linkTo('regist');
     });

    content.appendChild(btnRegist);
  }catch(err){
     console.error(err); // Console에서 에러 확인 가능
     const error=document.createTextNode("일시적인 오류 발생");
     content.appendChild(error);
   }
   
  //  page.appendChild(Header("TODO App 목록 조회"));
   page.appendChild(content);
  //  page.appendChild(Footer());
   
   return page;
};

export default TodoList;
