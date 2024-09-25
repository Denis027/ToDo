const addToDoForm = document.querySelector("#addToDoForm");
const addBtn = document.querySelector("#submitBtn");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");

let tasks = [];

if (JSON.parse(localStorage.getItem("tasks"))) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTasks(task));
}

addToDoForm.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

//Функции
function addTask(event) {
  //Отключаем перезагрузку страницы
  event.preventDefault();

  const task = { id: Date.now(), title: taskInput.value, done: false };
  tasks.push(task);

  renderTasks(task);

  //Очищаем input и переводим фокус на него
  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();
  saveToLocalStorage();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const parentNode = event.target.closest(".tasksListItem");
  parentNode.remove();

  const id = Number(parentNode.id);

  tasks = tasks.filter((task) => task.id !== id);

  checkEmptyList();
  saveToLocalStorage();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".tasksListItem");
  parentNode.classList.toggle("done");

  const id = Number(parentNode.id);
  tasks.find((task) => (task.id === id ? (task.done = !task.done) : null));

  saveToLocalStorage();
}

function checkEmptyList() {
  const emptyList = document.querySelector("#emptyList");
  const emptyListHTML = `<li class="emptyList" id="emptyList">
                          <h2>Список дел пуст</h2>
                        </li>`;

  if (tasks.length === 0) {
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  } else {
    emptyList ? emptyList.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(task) {
  const clsCSS = task.done ? "tasksListItem done" : "tasksListItem";

  //Создаем разметку новой задачи
  const taskHTML = `<li id="${task.id}" class="${clsCSS}">
  <span>${task.title}</span>
  <div id="taskBtnWrap">
   <button data-action="done" id="taskBtnСhange">Готово</button>
   <button data-action="delete" id="taskBtnDelete">Удалить</button>
  </div>
</li>`;

  //Добавляем новую задачу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}

checkEmptyList();
