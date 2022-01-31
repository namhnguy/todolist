const GetTodosFromApi = () => {
    const itemList = document.querySelector(".todolist__item-container");
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then(data => {
            data.forEach(element => {
                const item = document.createElement("li");
                const itemSpan = document.createElement("span");
                itemSpan.textContent = element.title;
                const itemButton = document.createElement("button");
                itemButton.setAttribute('id', element.id);
                itemButton.classList.add('delete-btn');
                itemButton.textContent = "X";
                item.appendChild(itemSpan);
                item.appendChild(itemButton);
                itemList.appendChild(item);
            })
        })
}

const DeleteTodosFromApi = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
    });
}

const AddTodosApi = (todo) => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

const deleteBtn = document.querySelector(".todolist__item-container");
deleteBtn.addEventListener('click', event => {
    if (event.target.id !== '') {
        let node = document.getElementById(event.target.id);
        node.parentNode.parentNode.removeChild(node.parentNode);
        DeleteTodosFromApi(event.target.id);
    }
})

let id = 201;
const addBtn = document.querySelector(".todolist__input-button");
const inputValue = document.querySelector(".todolist__input");
addBtn.addEventListener('click', () => {
    const itemList = document.querySelector(".todolist__item-container");
    const item = document.createElement("li");
    const itemSpan = document.createElement("span");
    itemSpan.textContent = inputValue.value;
    const itemButton = document.createElement("button");
    itemButton.setAttribute('id', id);
    let todo = {
        userId: 1,
        id: id,
        title: inputValue.value,
        completed: false
    }
    id += 1;
    itemButton.classList.add('delete-btn');
    itemButton.textContent = "X";
    item.appendChild(itemSpan);
    item.appendChild(itemButton);
    itemList.appendChild(item);
    //itemList.prepend(item);
    AddTodosApi(todo);
})

GetTodosFromApi();