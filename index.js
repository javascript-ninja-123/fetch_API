//DOM
const ulList = document.querySelector('ul');
const button = document.querySelector('button');
const addNewPost = document.querySelector('.newPost');
const formDiv = document.querySelector('.formDiv');
const submitButton = document.querySelector('.submitButton');
const blogForm = document.querySelector('.blogForm')

//AJAX
const URL = 'http://reduxblog.herokuapp.com/api/posts';
const API_KEY ='?key=sung1234567';


//fetch get
const fetchData = async() => {
  let response = await fetch(`${URL}${API_KEY}`);
  return await response.json();
}

const postAPI = async() => {
  let title = document.querySelector('.title').value;
  let content = document.querySelector('.content').value;
  let categories = document.querySelector('.categories').value;
  let newForm = {
    title,
    categories,
    content
  }
  let myHeaders = new Headers({
    'Content-Type':'application/json'
  })

  let response = await fetch(`${URL}${API_KEY}`, {
    method:'POST',
    body:JSON.stringify(newForm),
    headers:myHeaders
  })
}

const DeleteAPI = async(id) => {
  return await fetch(`${URL}/${id}/${API_KEY}`, {
    method:'DELETE'
  })
  .then(() => {
    location.reload();
  })
}

//render DOM
const renderDOM = () => {
  fetchData()
  .then(data => {
    return data.map(post => {
      let li = `<li>${post.title} -- ${post.content}
      <button onClick='DeleteAPI(${post.id})'>Delete</button>
      </li>`
      ulList.insertAdjacentHTML('beforeend',li)
    })
  })
}

const renderFORM = () => {
  let form = `
      <form class='blogForm'>
        <input type='text' placeholder='title' name='title' class='title'/>
        <input type='text' placeholder='categories'/ name='categories' class='categories'/>
        <input type='text' placeholder='content'/ name='content' class='content'/>
      </form>
        <button  onClick='postAPI()'>Submit</button>
  `
  formDiv.insertAdjacentHTML('beforeend',form);
}
//stream
const buttonStream$ = Rx.Observable.fromEvent(button,'click')
.switchMap(() => {
  return renderDOM()
})

const addNewStream$ = Rx.Observable.fromEvent(addNewPost,'click')
.switchMap(() => {
  return renderFORM();
})


//not working
// if(submitButton){
//   const submitStream$ = Rx.Observable.fromEvent(submitButton,'click')
//   .map(e => e.preventDefault())
//   .map(() => {
//     return {
//       title:document.querySelector('.title').value,
//       content:document.querySelector('.content').value
//     }
//   })
//   .subscribe(
//     x => {
//       console.log('worked')
//     },
//     err => console.warn(err)
//   )
// }



//subscribe
buttonStream$
.subscribe(
  x => {console.log('succeed')},
  err => console.warn(err)
)

addNewStream$
.subscribe(
  x=> {console.log('suuceed')},
  err => console.warn(err)
)
