const Model = (() => {
    const url = 'https://jsonplaceholder.typicode.com';
    const path = 'todos';

    const getApi = () => fetch([url, path].join('/')).then((response) => response.json());

    const addApi = (todo) => fetch([url, path].join('/'), {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json()).then((json) => console.log(json));

    const deleteApi = (id) => fetch([url, path, id].join('/'), {
        method: 'DELETE',
    });

    class Todo {
        constructor(title, id) {
            this.userId = 20;
            this.title = title;
            this.completed = false;
            this.id = id;
        }
    }

    return {
        getApi,
        addApi,
        deleteApi,
        Todo
    };
})();

const View = (() => {
    const itemList = document.querySelector(".todolist__item-container");
    const addBtn = document.querySelector(".todolist__input-button");
    const inputValue = document.querySelector(".todolist__input");

    const populateTodos = (element) => {
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
    };

    const addTodoElements = (id) => {
        const item = document.createElement("li");
        const itemSpan = document.createElement("span");
        itemSpan.textContent = inputValue.value;
        const itemButton = document.createElement("button");
        itemButton.setAttribute('id', id);
        itemButton.classList.add('delete-btn');
        itemButton.textContent = "X";
        item.appendChild(itemSpan);
        item.appendChild(itemButton);
        itemList.appendChild(item);
        //itemList.prepend(item);
    }

    return {
        populateTodos,
        itemList,
        addBtn,
        inputValue,
        addTodoElements
    }
})();

const Controller = ((model, view) => {
    let id = 201;

    const init = () => {
        model.getApi().then(data => {
            data.forEach(element => {
                view.populateTodos(element);
            });
        });
    };

    const deleteTodo = () => {
        view.itemList.addEventListener('click', event => {
            if (event.target.id !== '') {
                let node = document.getElementById(event.target.id);
                node.parentNode.parentNode.removeChild(node.parentNode);
                model.deleteApi(event.target.id);
            };
        });
    };

    const addTodo = () => {
        view.addBtn.addEventListener('click', () => {
            view.addTodoElements(id);
            const todo = new model.Todo(view.inputValue.value, id);
            id += 1;
            model.addApi(todo);
        });
    };

    const bootstrap = () => {
        init();
        deleteTodo();
        addTodo();
    };

    return {
        bootstrap
    };

})(Model, View);

Controller.bootstrap();

