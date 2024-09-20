const addToDoForm = document.querySelector("#addToDoForm");
const addBtn = document.querySelector("#submitBtn");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

addToDoForm.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

//Функции
function addTask(event) {
  //Отключаем перезагрузку страницы
  event.preventDefault();

  //Берем значиние из input
  const taskText = taskInput.value;

  const task = { id: Date.now(), title: taskInput.value, done: false };

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
  tasks.push(task);
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  //Очищаем input и переводим фокус на него
  taskInput.value = "";
  taskInput.focus();

  //Проверяем не пуст ли список
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const parentNode = event.target.closest(".tasksListItem");
  parentNode.remove();

  const id = Number(parentNode.id);

  tasks = tasks.filter((task) => task.id !== id);
  console.log(tasks);

  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".tasksListItem");
  parentNode.classList.toggle("done");

  const id = Number(parentNode.id);
  tasks.find((task) => {
    if (task.id === id) {
      task.done = !task.done;
    }
  });

  console.log(tasks);
}
