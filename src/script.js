document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('todoList');

    // Фильтрация по состоянию задачи
    const filterButtons = document.querySelectorAll('.filter__button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = button.getAttribute('data-filter');
            filterTasks(filterType);
        });
    });

    async function fetchTasks() {
        try {
            const response = await fetch('https://dummyjson.com/todos');
            const data = await response.json();
            const todos = data.todos;

            todos.forEach(todo => {
                const listItem = createTaskElement(todo.todo);
                todoList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            displayErrorMessage('Failed to fetch tasks. Please try again later.');
        }
    }

    function addTask() {
        const newTaskInput = document.getElementById('newTaskInput');
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const listItem = createTaskElement(taskText);
            todoList.appendChild(listItem);
            newTaskInput.value = '';
        } else {
            displayErrorMessage('Please enter a valid task!');
        }
    }

    document.querySelector('.list__button').addEventListener('click', addTask);

    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        const checkImage = document.createElement('img');
        checkImage.src = '/images/check.svg';
        checkImage.alt = 'Check Icon';

        const taskContent = document.createElement('div');
        taskContent.textContent = taskText;

        listItem.appendChild(checkImage);
        listItem.appendChild(taskContent);

        return listItem;
    }

    function displayErrorMessage(message) {
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.textContent = message;
        setTimeout(() => {
            errorMessageElement.textContent = '';
        }, 3000);
    }

    function filterTasks(filterType) {
        const tasks = todoList.querySelectorAll('li');

        tasks.forEach(task => {
            switch (filterType) {
                case 'completed':
                    if (task.classList.contains('completed')) {
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
                case 'not-completed':
                    if (!task.classList.contains('completed')) {
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
                default:
                    task.style.display = 'flex';
                    break;
            }
        });
    }

    todoList.addEventListener('click', function(event) {
        const targetElement = event.target;
        if (targetElement.tagName === 'LI' || targetElement.tagName === 'IMG' || targetElement.tagName === 'DIV') {
            const listItem = targetElement.closest('li');
            if (listItem) {
                toggleTaskCompletion(listItem);
            }
        }
    });

    function toggleTaskCompletion(listItem) {
        listItem.classList.toggle('completed');
        const beforeElement = listItem.querySelector('::before');
        if (listItem.classList.contains('completed')) {
            beforeElement.style.opacity = '1';
        } else {
            beforeElement.style.opacity = '0';
        }
    }

    fetchTasks();
});
