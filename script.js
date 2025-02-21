const inputElement = document.querySelector('.js-todo-input');
const addElement = document.querySelector('.js-addbtn');
const containerElement = document.querySelector('.container');
const dateInputElement = document.querySelector('.js-todo-date');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    dateInputElement.value = today;
}
setTodayDate();

function renderTasks() {
    let tasksHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const { input, date } = tasks[i];
        const html = `
            <div class="tasks-list">
                <span class="task-input">${input}</span>
                <span class="task-date">${date}</span>
                <button class="deletebtn" onclick="deleteTask(${i})">X</button>
            </div>`;
        tasksHTML += html;
    }
    containerElement.innerHTML = tasksHTML;
}

function addtask() {
    const input = inputElement.value.trim();
    const date = dateInputElement.value;

    if (input === '' || date === '') {
        alert("Please enter a task and a date!");
        return;
    }

    tasks.push({ input, date });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    inputElement.value = ""; 
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function keydown(event) {
    if (event.key === "Enter") {
        addtask();
    }
}
renderTasks();


