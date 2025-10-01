let tasks = [];
let task = {
  title,
  description,
  isCompleted,
  creadtedDate,
  completedDate
};
let completedTaskCount = 0;

function showTask() {
  if(task === "") {
    console.log("Задача отсутствует")
  } else {
    console.log(`Задача: ${task}`)
  }
}

function setTask(taskDescription) {
  if(task === "") {
    task = taskDescription;
  } else {
    console.log("Не могу добавить задачу, завершите или удалите предыдущую")
  }
}

function completeTask() {
  task = "";
  completedTaskCount++;
}

function deleteTask(taskDescription) {
  task = "";
}
