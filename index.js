let tasks = [];
const pad2 = n => String(n).padStart(2, "0");

let completedTasks = []
let completedTaskCount = 0;

function showTasks() {
  if(tasks.length < 1) {
    console.log("Задача отсутствует")
  } else {
    for(let task of tasks) {
      console.log(`Задача: "${task.title}", описание: ${task.description}, done: ${task.isCompleted}, дата начала: ${task.createdDate}`)
    }
  }
}

function setTask(taskDescription) {
  let date = new Date();
  const newTask = {
    title: taskDescription.trim(),
    description: '-',
    isCompleted: false,
    createdDate: `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()}`,
    completedDate: '',
  };
  if(newTask.title === "") {
    console.log('Заполните название задачи!')
  }
  tasks.push(newTask);
  console.log(`Добавлена новая задача "${newTask.title}"`);
}

function completeTask(index) {
  if (index < 0 || index >= tasks.length) {
    console.log("Некорректный индекс, попробуйте выбрать другой");
    return;
  }
  const taskDone = tasks[index];
  if(taskDone.isCompleted === true) {
    console.log(`Задача "${taskDone.title}" уже выполнена, выберите другую задачу.`)
    return;
  }

  let date = new Date();

  for(let i = index; i < tasks.length; i++) {
    tasks[i] = tasks[i + 1];
  }
  tasks.pop();
  taskDone.isCompleted = true;
  taskDone.completedDate = `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()}`;
  completedTasks.push(taskDone);
  completedTaskCount++;
  console.log(`Задача "${taskDone.title}" выполнена!`)
}

function deleteTask(index) {
  if (index < 0 || index >= tasks.length) {
    console.log("Некорректный индекс, попробуйте выбрать другой");
    return;
  }

  const deletedTask = tasks[index];
  let ok = confirm(`Задача "${deletedTask.title}" ещё не выполнена. Удалить?`);

  if(!ok) {
    console.log("Удаление отменено");
    return;
  }

  for(let i = index; i < tasks.length - 1; i++) {
    tasks[i] = tasks[i + 1];
  }
  tasks.pop();
  console.log(`Задача "${deletedTask.title}" была удалена.`)
}

function clearTasks() {
  tasks = [];
}

