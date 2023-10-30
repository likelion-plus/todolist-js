import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import TodoRegist from '../regist/TodoRegist.js';
import TodoInfo from '../info/TodoInfo.js';

const defaultInstance = axios.create({
  baseURL: 'http://localhost:33088/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const TodoList = async function(){
  const frag = document.createDocumentFragment();
  const page = document.createElement('div');
  page.setAttribute('id', 'page');
  
  const content = document.createElement('div');
  content.setAttribute('id', 'content');
  
  let response;
  
  try{
    response = await defaultInstance.get(`/todolist`);
    
    response.data?.items.forEach(item => {
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
      
      btnDetail.addEventListener('click', async function(event){
        if(event.target.type === 'button'){
          const infoPage = await TodoInfo({_id: item._id});
          document.querySelector('#page').replaceWith(infoPage);
        }
      });
  
      btnDetail.append(checkbox, label);
      frag.appendChild(btnDetail);
    });
    
    content.appendChild(frag);
        
    const btnRegist = document.createElement('button');
    btnRegist.textContent='등록';

    btnRegist.addEventListener("click", () => {
       const registPage=TodoRegist();
       document.querySelector("#page").replaceWith(registPage);
     });

    content.appendChild(btnRegist);
  }catch(err){
     console.error(err); // Console에서 에러 확인 가능
     const error=document.createTextNode("일시적인 오류 발생");
     content.appendChild(error);
   }
   
   page.appendChild(Header("TODO App 목록 조회"));
   page.appendChild(content);
   page.appendChild(Footer());
   
   return page;
};

export default TodoList;