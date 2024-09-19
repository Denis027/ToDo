//Находим элементы на странице
const addToDoForm = document.querySelector("#addToDoForm");
const addBtn = document.querySelector("#submitBtn");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

//Добавляем задачу
addToDoForm.addEventListener("submit", addTask);

//Удаляем задачу
tasksList.addEventListener("click", deleteTask);

//Задача выполнена
tasksList.addEventListener("click", doneTask);

//Функции
function addTask(event) {
  //Отключаем перезагрузку страницы
  event.preventDefault();

  //Берем значиние из input
  const taskText = taskInput.value;

  //Создаем разметку новой задачи
  const taskHTML = `<li class="tasksListItem" id="listItem">
                     <span>${taskText}</span>
                     <div id="taskBtnWrap">
                      <button data-action="done" id="taskBtnСhange">Готово</button>
                      <button data-action="delete" id="taskBtnDelete">Удалить</button>
                     </div>
                   </li>`;

  //Добавляем новую задачу
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
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".tasksListItem");
    parentNode.remove();
  }

  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".tasksListItem");
    parentNode.classList.add("done");
  }
}
