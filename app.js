const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

let tasks = [];

form.addEventListener("submit", function(e) {
  e.preventDefault();
  addTask(input.value);
  input.value = "";
});

function addTask(text){

  const task = {
    id: Date.now(),
    text: text
  };

  tasks.push(task);

  renderTask(task);
  saveTasks();
}

function renderTask(task){

  const div = document.createElement("div");
  div.className = "task";
  div.dataset.id = task.id;

  div.innerHTML = `
    <span>${task.text}</span>
    <button class="delete">X</button>
  `;

  div.querySelector(".delete").addEventListener("click", function(){
    deleteTask(task.id);
  });

  list.appendChild(div);
}

function deleteTask(id){

  tasks = tasks.filter(task => task.id !== id);

  document.querySelector(`[data-id="${id}"]`).remove();

  saveTasks();
}

function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){

  const saved = localStorage.getItem("tasks");

  if(saved){

    tasks = JSON.parse(saved);

    tasks.forEach(task => {
      renderTask(task);
    });

  }
}

loadTasks();

/* BONUS: filtro de búsqueda */

document.getElementById("search").addEventListener("input", function(e){

  const value = e.target.value.toLowerCase();

  document.querySelectorAll(".task").forEach(task => {

    const text = task.innerText.toLowerCase();

    task.style.display = text.includes(value) ? "flex" : "none";

  });

});