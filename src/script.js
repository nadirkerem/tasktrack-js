const newTaskToggleButton = document.getElementById('new-task-toggle-button');
const newTaskSection = document.querySelector('.add-new-task');
const newTaskForm = document.querySelector('.add-new-task-form');
const currentCategory = document.querySelector('#filter-category');
const currentStatus = document.querySelector('#filter-status');
const taskList = document.querySelector('.task-list');

const newTaskName = newTaskForm.elements['task-name'];
const newTaskDueDate = newTaskForm.elements['task-due-date'];
const newTaskCategory = newTaskForm.elements['task-category'];

newTaskToggleButton.addEventListener('click', () => {
  newTaskSection.classList.toggle('hidden');
});

newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addNewTask();
});

currentCategory.addEventListener('change', getTasks);
currentStatus.addEventListener('change', getTasks);

const exampleTasks = [
  {
    name: 'Task Name 1',
    dueDate: new Date()
      .toLocaleDateString('en-US', {
        timeZone: 'UTC',
      })
      .split('T')[0],
    category: 'work',
    status: 'pending',
  },
  {
    name: 'Task Name 2',
    dueDate: new Date()
      .toLocaleDateString('en-US', {
        timeZone: 'UTC',
      })
      .split('T')[0],
    category: 'personal',
    status: 'pending',
  },
  {
    name: 'Task Name 3',
    dueDate: new Date()
      .toLocaleDateString('en-US', {
        timeZone: 'UTC',
      })
      .split('T')[0],
    category: 'others',
    status: 'pending',
  },
];

getTasks();

function addNewTask() {
  let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (existingTasks.find((task) => task.name === newTaskName.value)) {
    alert('Task already exists');
    return;
  }

  if (newTaskName.value === '' || newTaskDueDate.value === '') {
    alert('Please fill in all fields');
    return;
  }

  if (newTaskCategory.value === '') {
    alert('Please select a category');
    return;
  }

  if (newTaskDueDate.value < new Date().toISOString().split('T')[0]) {
    alert('Due date cannot be in the past');
    return;
  }

  const task = {
    name: newTaskName.value,
    dueDate: new Date(newTaskDueDate.value).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    }),
    category: newTaskCategory.value,
    status: 'pending',
  };

  console.log(task);

  existingTasks = [...existingTasks, task];

  localStorage.setItem('tasks', JSON.stringify(existingTasks));

  newTaskForm.reset();

  getTasks();
}

function getTasks() {
  const existingTasks = JSON.parse(localStorage.getItem('tasks'));

  if (existingTasks.length === 0) {
    localStorage.setItem('tasks', JSON.stringify(exampleTasks));
  }

  const filteredTasks = existingTasks
    .filter(
      (task) =>
        currentCategory.value === 'all' ||
        task.category === currentCategory.value
    )
    .filter(
      (task) =>
        currentStatus.value === 'all' || task.status === currentStatus.value
    );

  const fragment = new DocumentFragment();

  filteredTasks.forEach((task, index) => {
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('data-id', index);
    const taskName = document.createElement('p');
    const taskDueDate = document.createElement('p');
    const taskCategory = document.createElement('p');
    const taskCompleteButton = document.createElement('button');
    const taskDeleteButton = document.createElement('button');

    taskContainer.classList.add('task-container');
    taskName.classList.add('task-name');
    taskDueDate.classList.add('task-due-date');
    taskCategory.classList.add('task-category');
    taskCompleteButton.classList.add('task-complete-button');
    taskDeleteButton.classList.add('task-delete-button');

    taskName.textContent =
      task.name.length > 30 ? task.name.slice(0, 30) + '...' : task.name;
    task.status === 'done' && taskName.classList.add('done');
    taskDueDate.textContent = task.dueDate;
    taskCategory.textContent = task.category.toUpperCase();
    taskCompleteButton.innerHTML = `<i class="fa-solid fa-${
      task.status === 'done' ? 'x' : 'check'
    }"></i>`;
    taskDeleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    taskContainer.appendChild(taskName);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(taskCategory);
    taskContainer.appendChild(taskCompleteButton);
    taskContainer.appendChild(taskDeleteButton);

    fragment.appendChild(taskContainer);
  });

  taskList.innerHTML = '';
  taskList.appendChild(fragment);

  const taskCompleteButtons = document.querySelectorAll(
    '.task-complete-button'
  );

  const taskDeleteButtons = document.querySelectorAll('.task-delete-button');

  taskCompleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      completeTask(event);
    });
  });

  taskDeleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteTask(event);
    });
  });
}

function completeTask(event) {
  let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const taskName = event.target
    .closest('.task-container')
    .querySelector('.task-name').textContent;

  const task = existingTasks.find((task) => task.name === taskName);

  task.status = task.status === 'done' ? 'pending' : 'done';

  localStorage.setItem('tasks', JSON.stringify(existingTasks));

  getTasks();
}

function deleteTask(event) {
  let existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const taskName =
    event.target.parentNode.parentNode.querySelector('.task-name').textContent;

  // Ask for confirmation before deleting the task
  const userConfirmed = window.confirm(
    `Are you sure you want to delete the task: "${taskName}"?`
  );

  if (userConfirmed) {
    const newTasks = existingTasks.filter((task) => task.name !== taskName);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    getTasks();
  }
}
