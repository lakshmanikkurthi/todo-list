document.addEventListener('DOMContentLoaded',()=>
{
  const elements = JSON.parse(localStorage.getItem('tasks'))
  if(elements){
    elements.forEach(ele=>{
      tasks.push(ele)
      updateStatus()
      updateTaskList()
    })
  }
})

let tasks = [];
const addTask = () => {
  const task = document.getElementById("taskInput");
  const text = task.value;
  if (text) {
    tasks.push({ text: text, completed: false });
    task.value = "";
    updateTaskList();
  }
};

const updateTaskList = () => {
  const tasklist = document.getElementById("taskList");
  tasklist.innerHTML = ""; // Clear the current list

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    // Create the task HTML with proper attribute interpolation
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkBox" id="checkbox" ${
            task.completed ? "checked" : ""
          } onchange="toggleTaskComplete(${index})">
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <i class="fa-solid fa-trash" onClick="deleteTask(${index})"></i>
          <i class="fa-solid fa-pen-to-square" onClick="editTask(${index})"></i>
        </div>
      </div>
    `;

    tasklist.appendChild(listItem); // Append the new item to the list
    updateStatus();
    saveTasks()
  });
};

document.getElementById("newList").addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList(); // Re-render the list to reflect the updated state
  updateStatus();
  saveTasks()
};

// Assuming you have deleteTask and editTask functions
const deleteTask = (index) => {
  tasks.splice(index, 1); // Remove the task
  updateTaskList();
  updateStatus();
  saveTasks()
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTaskList();
  updateStatus();
  saveTasks()
};

const updateStatus = () => {
  const completetask = tasks.filter((task) => task.completed).length;
  
  const totalTasks = tasks.length;

  const progress = totalTasks > 0 ? (completetask / totalTasks) * 100 : 0;
  const num = document.getElementById("numbers");
  num.textContent = totalTasks > 0 ? completetask + "/" + totalTasks : "0/0";

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`; // Corrected this line
  if (totalTasks && completetask === totalTasks){
    blankconfeti()
  }
};
updateStatus();


const saveTasks = ()=>{
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

const blankconfeti = ()=>{
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}