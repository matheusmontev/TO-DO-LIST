const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

// Carregar tarefas do LocalStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

// Salvar tarefas no LocalStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li span").forEach((span) => {
        tasks.push(span.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Criar elemento de tarefa
function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="editButton" onclick="editTask(this)">Editar</button>
        <button class="deleteButton" onclick="deleteTask(this)">Remover</button>
    `;
    return li;
}

// Adicionar tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
        taskInput.value = "";
        saveTasks();
    }
}

// Editar tarefa
function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
        saveTasks();
    }
}

// Remover tarefa
function deleteTask(button) {
    const li = button.parentElement;
    taskList.removeChild(li);
    saveTasks();
}

// Inicializar a aplicação
loadTasks();
