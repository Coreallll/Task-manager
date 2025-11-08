let tasks = [];
const convertDate = data => String(data).padStart(2, "0");
const date = new Date();

let completedTasks = []
let completedTaskCount = 0;

function showTasks() {
  if(tasks.length === 0) {
    console.log("Задачи отсутствуют");
    return;
  }

  tasks.forEach(task => {
    console.log(`
    Задача: "${task.title}", 
    Описание: ${task.description}, 
    Done: ${task.isCompleted}, 
    Дата начала: ${task.createdDate}, 
    Дата окончания: ${task.completedDate}`)
  });
}

function setTask(taskTitle, taskDescription) {
  if(taskTitle === "") {
    console.log('Заполните название задачи!');
    return;
  }
  const newTask = {
    title: taskTitle.trim(),
    description: taskDescription.trim(),
    isCompleted: false,
    createdDate: `${convertDate(date.getDate())}.${convertDate(date.getMonth() + 1)}.${date.getFullYear()}`,
    completedDate: 'В разработке',
  };

  tasks.push(newTask);
  console.log(`Добавлена новая задача "${newTask.title}"`);
}

function completeTask(index) {
  const taskDone = tasks[index];
  let date = new Date();

  if (index < 0 || index >= tasks.length) {
    console.log("Некорректный индекс, попробуйте выбрать другой");
    return;
  }

  if(taskDone.isCompleted === true) {
    console.log(`Задача "${taskDone.title}" уже выполнена, выберите другую задачу.`)
    return;
  }

  taskDone.isCompleted = true;
  taskDone.completedDate = `${convertDate(date.getDate())}.${convertDate(date.getMonth() + 1)}.${date.getFullYear()}`;
  completedTasks.push(taskDone);
  completedTaskCount++;

  console.log(`Задача "${taskDone.title}" выполнена!`);

  return completedTasks;
}

function deleteTask(index) {
  if (index < 0 || index >= tasks.length) {
    console.log("Некорректный индекс, попробуйте выбрать другой");
    return;
  }

  const chosenTask = tasks[index];
  let ok = confirm(`Задача "${chosenTask.title}" ещё не выполнена. Удалить?`);

  if(!ok) {
    console.log("Удаление отменено");
    return;
  }

  const deletedTask = tasks.splice(index, 1);

  console.log(`Задача "${chosenTask.title}" была удалена.`)

  return tasks;
}

function clearTasks() {
  tasks.length = 0;
}

function getTasksDescriptions() {
  return tasks.map(task => task.description);
}

function getLongTasks() {
  return tasks.filter(task => task.title.length > 10 || task.description.length > 10);
}

function isValidDateFormat(dateStr) {
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!regex.test(dateStr)) return false;

  const [day, month, year] = dateStr.split('.').map(Number);

  const date = new Date(year, month - 1, day);
  if ( date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return false;
  }

  return true;
}

function compareFormatDate(date) {
  if(typeof date !== 'string') return null;
  const [day, month, year] = date.split('.').map(Number);
  return year * 10000 + month * 100 + day;
}

function getTasksByDateRange(startDate, endDate, isCompleted) {

  if(startDate && !isValidDateFormat(startDate)) {
    console.log('Некорректный формат начальной даты. Укажите формат ДД.ММ.ГГГГ')
    return []
  }
  if(endDate && !isValidDateFormat(endDate)) {
    console.log('Некорректный формат конечной даты. Укажите формат ДД.ММ.ГГГГ')
    return []
  }

  const createdCompare = compareFormatDate(startDate);
  const completedCompare = compareFormatDate(endDate);

  return tasks.filter(task => {
    if (startDate && compareFormatDate(task.createdDate) < createdCompare) return false;
    if (endDate && (!isValidDateFormat(task.completedDate) || compareFormatDate(task.completedDate) > completedCompare)) return false;

    if(isCompleted === true) return task.isCompleted === true;
    if(isCompleted === false) return task.isCompleted === false;

    return true
  });
}

function clearShortTasks() {
  return tasks.filter(task => task.title.length >= 5);
}

function refreshTitle(index, newTitle) {
  if(!tasks.length) {
    console.log("Список задач пуст");
    return;
  }
  const refreshedTitle = tasks[index].title = newTitle;

  return tasks;
}



// setTask('Доделать таскменеджер', 'Реализовать, применяя полученные знания');
// setTask('Сходить в аптеку', 'Одеться тепло, на улице дождь');
// setTask('Пи пи', 'Пу пу');
// setTask('Сильно захардворкать', 'Не помереть');
// setTask('Фыв', 'Фув');
// refreshTitle(1, "Постирать одежду")
// console.log(deleteTask(3))
// completeTask(1);
// showTasks()
// console.log(getTasksDescriptions())
// console.log(getLongTasks())
// console.log(getTasksByDateRange(null, null, false));
// console.log(clearShortTasks())
