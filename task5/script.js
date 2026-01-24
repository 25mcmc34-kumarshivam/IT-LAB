// JavaScript Array to store tasks
let tasks = [];

function addTask() {
    const taskText = document.getElementById('taskInput').value;
    const dueDate = document.getElementById('dateInput').value;

    if (taskText === "" || dueDate === "") {
        alert("Shivam, please enter both a task and a due date!");
        return;
    }

    // Create Task Object
    const newTask = {
        id: Date.now(),
        text: taskText,
        date: new Date(dueDate), // Using Date Object
        completed: false
    };

    tasks.push(newTask);
    sortTasks(); // Sort tasks by date immediately
    renderTasks();
    
    // Clear inputs
    document.getElementById('taskInput').value = "";
    document.getElementById('dateInput').value = "";
}

// Sorting tasks based on Due Date (Task Requirement)
function sortTasks() {
    tasks.sort((a, b) => a.date - b.date);
}

function toggleComplete(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// DOM Manipulation to update UI (Task Requirement)
function renderTasks(filter = 'all') {
    const list = document.getElementById('taskList');
    list.innerHTML = "";

    let filteredTasks = tasks;
    if (filter === 'pending') filteredTasks = tasks.filter(t => !t.completed);
    if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        
        // Formatting the Date for display
        const dateString = task.date.toDateString();

        li.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
                <span class="${task.completed ? 'done' : ''}">${task.text}</span>
                <br><span class="due-date">Due: ${dateString}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">✖</button>
        `;
        list.appendChild(li);
    });
}